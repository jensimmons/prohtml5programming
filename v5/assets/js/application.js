"use strict";
// UI functions
APRI.UI = {
 textResize: function (direction) {
   var $baseEl = $('html'),
       currentSize,
       newSize,
       fontResizeDelta = 2.0;
   if (direction === 0) { // reset to 16px
     $baseEl.css('font-size', '16px');
   } else {
     currentSize = parseFloat($baseEl.css('font-size'));
     newSize = currentSize + (direction * fontResizeDelta) + 'px';
     $baseEl.css('font-size', newSize );
   }
   if (Modernizr.localstorage) {
     localStorage.font_size_pref = newSize;
   }
 },
 // create TOC & append to toc link
 initTOC: function () {
   if(APRI.toc) {
     var tocOutput = '<ul class="toc-dropdown box">\n',
         chapters, i, tocL, key, currentClass, tocEntry;
     if (APRI.toc.header !== undefined) {
       tocOutput += '<li class="hdr">' +
         '<div class="cover"><a href="' + APRI.toc.header.cover_url + '" class="cover-link"><img src="' + APRI.toc.header.image + '" /></a></div>' +
         '<div class="title">' + APRI.toc.header.title + '</div>' +
         '<div class="dek">' + APRI.toc.header.dek + '</div>' +
       '</li>';
     }
     if (APRI.toc.chapters !== undefined) {
       chapters = APRI.toc.chapters;
       for(i=0, tocL = chapters.length; i < tocL; i++) {
         for(key in chapters[i]) {
           if(chapters[i].hasOwnProperty(key)) {
             currentClass = '';
             if (chapters[i][key] === '') {
               tocEntry = '<li class="chap"><span class="unavailable">' + key + '</span></li>\n';
             } else {
               tocEntry = '<li class="chap"><a href="' + chapters[i][key] + '" class="' + currentClass + '">' + key + '</a></li>\n';
             }
             // if (key == currentChap) {
             //   currentClass = 'link-current';
             // }
             tocOutput += tocEntry;
           }
         }
       }
     }
     tocOutput += '<li class="dashboard-link"><a href="../index.html">My Apress Library</a></li>';
     tocOutput += '</ul>\n';
     // jQuery('.jPanelMenu-panel').append(jQuery(tocOutput));
     jQuery('article').before(jQuery(tocOutput));
   } 
 },
 // jPanelMenu initiation
 initPanelNavigation: function () {
   var jPM = $.jPanelMenu( {'keyboardShortcuts': false, duration: 125 } );
   jPM.on();
   // close menu post click
   jQuery(document).on('click', jPM.menu + ' li a', function (e) {
     if ( jPM.isOpen() && jQuery(e.target).attr('href').substring(0,1) === '#' ) { jPM.close(); }
   });
   // remove hidden nav if jPanel is good to go (do we need checks here (like, for silk browser?))
   jQuery('.jPanelMenu-panel > .nav-container').remove();
   jQuery('.jPanelMenu-panel > #main-navigation').remove();
 },
 // initialize font-size controls
 initTextResizeHandler: function () {
   var me = this;
   jQuery('.btn.fs-smaller').bind('click', function (e) {
     e.stopPropagation();
     e.preventDefault();
     me.textResize(-1);
   });
   jQuery('.btn.fs-default').bind('click', function (e) {
     e.stopPropagation();
     e.preventDefault();
     me.textResize(0);
   });
   jQuery('.btn.fs-larger').bind('click', function (e) {
     e.stopPropagation();
     e.preventDefault();
     me.textResize(1);
   });

   // pick up fontSize from cookie if exists
   if (Modernizr.localstorage && localStorage.font_size_pref !== undefined) {
     $('html').css('font-size', localStorage.font_size_pref );
   }
 }
};

APRI.CME = { // CodeMirror editors
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
   APRI.CME[this.listingNumber] = this;
   this.container = this.trigger.parents('.listing:first').find('.inline-codeview-container');
   this.container.html( jQuery(APRI.CME.templates.editorTemplate) );
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
       me.delay = window.setTimeout(APRI.CME.updatePreview, 300, [me]);
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
     // TODO: ensure we have a code listing for this figure.listing
            
     // append the editor container template
     jQuery('figcaption:first', $thisFigure).after(jQuery(APRI.CME.templates.editorContainerTemplate));
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
     APRI.CME[listing] = new APRI.CME.inlineEditor($this);
     jQuery('.static-code-container:first', $figure).hide();
   });
   jQuery('.close-inline-editor').bind('click', function (evt) {
     evt.stopPropagation();
     evt.preventDefault();
     var $this = jQuery(this);
     var $figure = $this.parents('figure:first');
     var listing = jQuery(this).data('listing');
     APRI.CME[listing].removeEditor();
     APRI.CME[listing] = null;
     jQuery('.static-code-container:first', $figure).show();
     $this.siblings('.show-inline-editor:first').removeClass('open');
     $figure.removeClass('open-editor');
   });
 }
};

APRI.CME.inlineEditor.prototype.retrieve = function () {
 if (APRI.CME.localStorageSupport && localStorage[this.cacheID]) {
   this.editor.setValue( localStorage[this.cacheID] );
 } else {
   this.reset();
 }
};
APRI.CME.inlineEditor.prototype.clearSaved = function () {
 if (APRI.CME.localStorageSupport && localStorage[this.cacheID]) {
   localStorage.removeItem( this.cacheID );
 }
};
APRI.CME.inlineEditor.prototype.save = function () {
 if(APRI.CME.localStorageSupport) {
   localStorage.setItem(this.cacheID, this.editor.getValue());
 } 
};
APRI.CME.inlineEditor.prototype.reset = function () {
 this.editor.setValue(APRI.CME.codeListings[this.listingNumber].code);
 this.clearSaved();
};

APRI.UTILS = {
 checkStorageSupport: function () {
   if (Modernizr.localstorage) {
     APRI.CME.localStorageSupport = true;
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

jQuery(function () {


 APRI.UI.initPanelNavigation();
 APRI.UI.initTextResizeHandler();

 APRI.UI.initTOC();
 $('.popbox').popbox();

 APRI.UTILS.checkStorageSupport();
 APRI.CME.initCodeEditors();
 APRI.UTILS.formatStaticCode();

});
