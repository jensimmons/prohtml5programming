"use strict";

APRI.IED = {
  'localStorageSupport': false,
  'templates': {
    'editorContainerTemplate': '<div class="editor-trigger">\n' +
          '<a href="#inline-code-example" class="show-inline-editor button">Open editor</a>\n' +
          '<a href="#close-inline-code-example" class="close-inline-editor button">Close editor</a>\n' +
        '</div>\n\n' +
      '<div class="inline-codeview-container" style="width: 100%; float: left; padding-top: 1.5em; "></div>',
    'editorTemplate': '<div id="code-view-source">\n\n' +
        '<div class="code-editor-container">\n' +
          '<iframe id="preview"></iframe>\n' +
          '</div>\n\n' + 
          '<div class="code-mirror-container">\n' +
            '<div class="code-mirror-scroll-wrap">\n' +
              '<textarea id="code" name="code">\n' +
              '</textarea>\n' +
            '</div>\n' +  
          '</div>\n' +
        '<div class="control-bar">\n' +
          '<div class="control save">Save</div>\n' +
          '<div class="control reset">Reset</div>\n' +
        '</div>\n' +
      '</div>'
  },
  updatePreview: function ( args ) {
    var iEditor = args[0];
    var currentCode = iEditor.editor.getValue();
    if (iEditor.cache !== currentCode) {
      iEditor.cache = currentCode;
      var previewFrame = jQuery('#preview', iEditor.container).get(0);
      var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
      preview.open();
      preview.write(iEditor.cache);
      preview.close();
    }
  },
  inlineEditor: function ( el ) { // el = jQuery(this) <a> tag;
    var me = this;
    this.trigger = el;
          
    this.delay = 0;
    this.listingNumber = el.data('listing'); 
    this.cacheID = APRI.ISBNOnline + '_' + this.listingNumber;
    APRI.IED[this.listingNumber] = this;
    this.container = this.trigger.parents('.listing:first').find('.inline-codeview-container');
    this.container.html( jQuery(APRI.IED.templates.editorTemplate) );
    this.resetControl = jQuery('.control-bar .control.reset', this.container);
    this.saveControl = jQuery('.control-bar .control.save', this.container);
    this.cache = '';
    this.previewFrame = jQuery('#preview', this.container).get(0);
    this.previewHeight = this.container.parents('.listing:first').data('preview-height') + 'px';
    this.editor = CodeMirror.fromTextArea(jQuery('#code', this.container).get(0), {
      mode: 'text/html',
      tabMode: 'indent',
      theme: 'ambiance',
      lineWrapping: true,
      lineNumbers: true,
      onChange: function () {
        window.clearTimeout(me.delay);
        me.delay = window.setTimeout(APRI.IED.updatePreview, 300, [me]);
      }
    });
    this.resetControl.bind('click', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      me.reset();
    });
    this.saveControl.bind('click', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      me.save();
    });
    this.removeEditor = function () {
      window.clearTimeout(me.delay);
      me.editor = null;
      me.container.html('');
    };
    this.retrieve();
    // this.reset();
    // jQuery('#preview', this.container).height( jQuery('.code-mirror-container', this.container).height() );
    jQuery('#preview', this.container).height(this.previewHeight);
  },
  initCodeEditors: function () {
    jQuery("figure.listing[data-listing]").each(function () {
      var $thisFigure = jQuery(this);
      var thisListing = $thisFigure.data('listing');
      // ensure we have a code listing for this figure.listing
            
      // append the editor container template
      jQuery('figcaption:first', $thisFigure).after(jQuery(APRI.IED.templates.editorContainerTemplate));
      // set the data-listing on the triggers
      jQuery('.button', $thisFigure).data('listing', thisListing);
            
    });
    // bind the trigger events
    jQuery(".show-inline-editor:not('.open')").bind('click', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var $this = jQuery(this);
      var $figure = $this.parents('figure:first');
      var listing = jQuery(this).data('listing');
      $this.addClass('open');
      $figure.addClass('open-editor');
      APRI.IED[listing] = new APRI.IED.inlineEditor($this);
      jQuery('.static-code-container:first', $figure).hide();
    });
    jQuery('.close-inline-editor').bind('click', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var $this = jQuery(this);
      var $figure = $this.parents('figure:first');
      var listing = jQuery(this).data('listing');
      APRI.IED[listing].removeEditor();
      APRI.IED[listing] = null;
      jQuery('.static-code-container:first', $figure).show();
      $this.siblings('.show-inline-editor:first').removeClass('open');
      $figure.removeClass('open-editor');
    });
  }
};

APRI.IED.inlineEditor.prototype.retrieve = function () {
  if (APRI.IED.localStorageSupport && localStorage[this.cacheID]) {
    this.editor.setValue( localStorage[this.cacheID] );
  } else {
    this.reset();
  }
};
APRI.IED.inlineEditor.prototype.clearSaved = function () {
  if (APRI.IED.localStorageSupport && localStorage[this.cacheID]) {
    localStorage.removeItem( this.cacheID );
  }
};
APRI.IED.inlineEditor.prototype.save = function () {
  if(APRI.IED.localStorageSupport) {
    localStorage.setItem(this.cacheID, this.editor.getValue());
  } 
};
APRI.IED.inlineEditor.prototype.reset = function () {
  this.editor.setValue(APRI.IED.codeListings[this.listingNumber].code);
  this.clearSaved();
};

APRI.UTILS = {
  checkStorageSupport: function () {
    if (Modernizr.localstorage) {
      APRI.IED.localStorageSupport = true;
    } 
  },
  /* initializes all static code blocks within a figure as instances of codemirror for formatting purposes */
  formatStaticCode: function () {
    var staticCodeareas = [];
    var figures = jQuery('figure.listing');
    var codeStr, $figure, $pre, $code, boldLines, staticArea, editor, cmMode;
    var staticCodeContainer = '<div class="static-code-container"></div>';
    figures.each(function () {
      $figure = jQuery(this);
      $pre = jQuery('pre:first', $figure);
      $code = jQuery('code:first', $pre);
      codeStr = $code.text();
      cmMode = $code.data('cm-mode') ? $code.data('cm-mode') : 'javascript';
      boldLines = $code.data('bold') ? $code.data('bold').split(',') : [];
      staticArea = jQuery(staticCodeContainer).insertAfter($pre).get(0);
      $pre.remove();
      editor = new CodeMirror( staticArea, {
          mode: cmMode,
          tabMode: 'indent',
          theme: 'static',
          readOnly: true,
          lineWrapping: true,
          lineNumbers: false,
          pollInterval: 3000,
          value: codeStr
        } 
      );
      staticCodeareas.push(editor);
      if (boldLines.length) {
        for(var i=0, l = boldLines.length; i< l; i++) {
          editor.setLineClass(parseInt(boldLines[i], 10), 'cm-strong');
        }
      } 
    });
  }
};

jQuery( function () {
  APRI.UTILS.checkStorageSupport();
  APRI.IED.initCodeEditors();
  APRI.UTILS.formatStaticCode();
});

