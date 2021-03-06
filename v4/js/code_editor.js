/* initializes all static code blocks within a figure as instances of codemirror for formatting purposes */
function formatStaticCode() {
  var staticCodeareas = [];
  var figures = jQuery('figure.listing');
  var codeStr, $pre, boldLines, staticArea, editor, cmMode;
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
    editor = CodeMirror( staticArea, {
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
        editor.setLineClass(parseInt(boldLines[i]), 'cm-strong');
      }
    } 
  });
}

function updatePreview( args ) {
  var iEditor = args[0];
  var currentCode = iEditor.editor.getValue();
  if (iEditor.cache != currentCode) {
    iEditor.cache = currentCode;
    var previewFrame = jQuery('#preview', iEditor.container).get(0);
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(iEditor.cache);
    preview.close();
  }
}
      
var inlineEditors = {
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
          '<textarea id="code" name="code">\n' +
          '</textarea>\n' +
        '</div>\n' +
      '<div class="control-bar">\n' +
        '<div class="control save">Save</div>\n' +
        '<div class="control reset">Reset</div>\n' +
      '</div>\n' +
    '</div>',
  'localStorageSupport': false
};
        
var inlineEditor = function ( el ) { // el = jQuery(this) <a> tag;
  var me = this;
  this.trigger = el;
          
  this.delay = 0;
  this.listingNumber = el.data('listing'); 
  this.cacheID = ISBNOnline + '_' + this.listingNumber;
  inlineEditors[this.listingNumber] = this;
  this.container = this.trigger.parents('.listing:first').find('.inline-codeview-container');
  this.container.html( jQuery(inlineEditors.editorTemplate) );
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
      me.delay = window.setTimeout(updatePreview, 300, [me]);
    }
  });
  this.resetControl.bind('click', function (evt) {
    me.reset();
  });
  this.saveControl.bind('click', function (evt) {
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
}

inlineEditor.prototype.retrieve = function () {
  if (inlineEditors.localStorageSupport && localStorage[this.cacheID]) {
    this.editor.setValue( localStorage[this.cacheID] );
  } else {
    this.reset();
  }
}
inlineEditor.prototype.clearSaved = function () {
  if (inlineEditors.localStorageSupport && localStorage[this.cacheID]) {
    localStorage.removeItem( this.cacheID );
  }
}
inlineEditor.prototype.save = function () {
  if( inlineEditors.localStorageSupport ) {
    localStorage.setItem(this.cacheID, this.editor.getValue());
  } else {
    
  }
}        
inlineEditor.prototype.reset = function () {
  this.editor.setValue(inlineEditors.codeListings[this.listingNumber].code);
  this.clearSaved();
}
        
function initCodeEditors() {
  jQuery("figure.listing[data-listing]").each(function () {
    var $thisFigure = jQuery(this);
    var thisListing = $thisFigure.data('listing');
    // ensure we have a code listing for this figure.listing
            
    // append the editor container template
    jQuery('figcaption:first', $thisFigure).after(jQuery(inlineEditors.editorContainerTemplate));
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
    inlineEditors[listing] = new inlineEditor($this);
    jQuery('.static-code-container:first', $figure).hide();

  });
  jQuery('.close-inline-editor').bind('click', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var $this = jQuery(this);
    var $figure = $this.parents('figure:first');
    var listing = jQuery(this).data('listing');
    inlineEditors[listing].removeEditor();
    inlineEditors[listing] = null;
    jQuery('.static-code-container:first', $figure).show();
    $this.siblings('.show-inline-editor:first').removeClass('open');
    $figure.removeClass('open-editor');
  });
}

function checkStorageSupport() {
  //localStorage
  if (window.localStorage) {
    inlineEditors.localStorageSupport = true;
  } 
}
        
jQuery( function () {
  checkStorageSupport();
  initCodeEditors();
  formatStaticCode();
});

