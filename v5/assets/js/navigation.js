// var menuObj = [];

function textResize(direction) {
  var baseEl = $('html');
  if (direction === 0) { // reset to 16px
    baseEl.css('font-size', '16px');
  } else {
    var currentSize = parseFloat(baseEl.css('font-size'));
    var fontSizeMultiplier = 2.0; 
    var newSize = currentSize + (direction * fontSizeMultiplier) + 'px';
    baseEl.css('font-size', newSize );
  }
  if (window.localStorage) {
    localStorage['font_size_pref'] = newSize;
  } 
}

jQuery(function () {
  // toc list creation
  if(toc) {
    var tocOutput = '<ul class="dropdown-menu">\n';
    
    for(var i=0, tocL = toc.length; i < tocL; i++) {
      
      for(var key in toc[i]) {
        var currentClass = '';
        var tocEntry;
        if(toc[i].hasOwnProperty(key)) {
          if (toc[i][key] === '') {
            tocEntry = '<li class="chap"><span class="unavailable">' + key + '</span></li>\n'
          } else {
            tocEntry = '<li class="chap"><a href="' + toc[i][key] + '" class="' + currentClass + '">' + key + '</a></li>\n'
          }
          // if (key == currentChap) {
          //   currentClass = 'link-current';
          // }
          tocOutput += tocEntry;
        }
      }
    }
    
    tocOutput += '</ul>\n';
    jQuery('#toc').append(jQuery(tocOutput));
  }  
  
  // // chapter navigation list creation
  // var h1 = $('h1').eq(0);
  // var currentChap = h1.text();
  //       
  // var output = '<a id="main-navigation"></a><div class="nav-container"><nav role="navigation" id="menu"><ul>';
  //   
  // jQuery('<a class="section-anchor" id="chapter_title" />').insertBefore(h1);
  // output += ('<li class="current"><a href="#chapter_title" >' + currentChap + '</a>\n');
  // 
  // var sections = jQuery('h2');
  // var j = 0;
  // sections.each(function () {
  //         
  //   output += '<ul>';
  //   var key = jQuery(this).clone().find('span.index-term').empty().end().text();
  //   var section = jQuery(this).parents('section:first').attr('id');
  //   if (section == undefined) {
  //     section = 'sec' + j;
  //   }
  //   jQuery('<a class="section-anchor" id="hdr_' + section + '" />').insertBefore(jQuery(this));
  //   output += ('<li><a href="#hdr_' + section + '" >' + key + '</a>\n');
  //   var section = jQuery(this).parents('section:first');
  //   var subSections = jQuery('h3', section).not('aside h3'); // leave the asides out of the nav
  //     
  //   if (subSections.length) {
  //     output += '<ul>\n';
  //   }
  //   var k = 0;
  //   subSections.each(function () {
  //           
  //     var header = jQuery(this).clone().find('span.index-term').empty().end().text();
  //     var subsection = jQuery(this).parents('section:first').attr('id');
  //     if (subsection == undefined) {
  //       subsection = 'sec' + j + '_' + k; 
  //     }
  //     jQuery('<a class="section-anchor" id="hdr_' + subsection + '" />').insertBefore(jQuery(this));
  //     output += ('<li><a href="#hdr_' + subsection + '" >' + header + '</a></li>\n');
  //     k++;
  //   });
  //   if (subSections.length) {
  //     output += '</ul>\n';
  //   }
  //   output += '</li></ul>\n';
  //   j++;
  // });
  // output += '</li></ul></nav></div>\n';
  // jQuery('body').append(jQuery(output));
  
  
    // jPanelMenu initiation  
    var jPM = $.jPanelMenu( {'keyboardShortcuts': false} );
    jPM.on();
    // close menu post click?
  jQuery(document).on('click', jPM.menu + ' li a', function (e) {
    if ( jPM.isOpen() && $(e.target).attr('href').substring(0,1) == '#' ) { jPM.close(); }
  });
    
    // remove hidden nav if jPanel is good to go (do we need checks here (like, for silk browser?))
    jQuery('.jPanelMenu-panel > .nav-container').remove();
    jQuery('.jPanelMenu-panel > #main-navigation').remove();
    
    // initialize font-size controls
    jQuery('.btn.fs-smaller').bind('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      textResize(-1);
    });
    jQuery('.btn.fs-default').bind('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      textResize(0);
    });
    jQuery('.btn.fs-larger').bind('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      textResize(1);
    });
    
    // pick up fontSize from cookie if exists
    if (window.localStorage && localStorage['font_size_pref'] !== undefined) {
      $('html').css('font-size', localStorage['font_size_pref'] );
    }

});
