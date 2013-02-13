   "use strict";

   APRI.UI = { // APRess Interactive
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
       if(toc) {
         var tocOutput = '<ul class="dropdown-menu">\n',
             chapters, i, tocL, key, currentClass, tocEntry;
         if (toc.header !== undefined) {
           tocOutput += '<li class="hdr">' +
             '<div class="cover"><img src="' + toc.header.image + '" /></div>' +
             '<div class="title">' + toc.header.title + '</div>' +
             '<div class="dek">' + toc.header.dek + '</div>' +
           '</li>';
         }
         if (toc.chapters !== undefined) {
           chapters = toc.chapters;
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
         jQuery('#toc').append(jQuery(tocOutput));
       } 
     },
     // jPanelMenu initiation
     initPanelNavigation: function () {
       var jPM = $.jPanelMenu( {'keyboardShortcuts': false } );
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

   jQuery(function () {

     APRI.UI.initTOC();
     APRI.UI.initPanelNavigation();
     APRI.UI.initTextResizeHandler();

   });
   

