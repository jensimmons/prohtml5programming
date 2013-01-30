var menuObj = [];
jQuery(function () {
  // toc list creation
  if(toc) {
    var tocOutput = '<ul class="dropdown-menu">\n';
    
    for(var i=0, tocL = toc.length; i < tocL; i++) {
      
      for(var key in toc[i]) {
        var currentClass = '';
        if(toc[i].hasOwnProperty(key)) {
          // if (key == currentChap) {
          //   currentClass = 'link-current';
          // }
          tocOutput += ('<li class="chap"><a href="' + toc[i][key] + '" class="' + currentClass + '">' + key + '</a></li>\n');
        }
      }
    }
    
    tocOutput += '</ul>\n';
    jQuery('#toc').append(jQuery(tocOutput));
  }  
  
  // chapter navigation list creation
  var h1 = $('h1').eq(0);
  var currentChap = h1.text();
        
  var output = '<a id="main-navigation"></a><div class="nav-container"><nav role="navigation" id="menu"><ul>';
    
  jQuery('<a class="section-anchor" id="chapter_title" />').insertBefore(h1);
  output += ('<li class="current"><a href="#chapter_title" >' + currentChap + '</a>\n');
  
  var sections = jQuery('h2');
  var j = 0;
  sections.each(function () {
          
    output += '<ul>';
    var key = jQuery(this).clone().find('span.index-term').empty().end().text();
    var section = jQuery(this).parents('section:first').attr('id');
    if (section == undefined) {
      section = 'sec' + j;
    }
    jQuery('<a class="section-anchor" name="#hdr_' + section + '" />').insertBefore(jQuery(this));
    output += ('<li><a href="#hdr_' + section + '" >' + key + '</a>\n');
    var section = jQuery(this).parents('section:first');
    var subSections = jQuery('h3', section).not('aside h3'); // leave the asides out of the nav
  
    if (subSections.length) {
      output += '<ul>\n';
    }
    var k = 0;
    subSections.each(function () {
            
      var header = jQuery(this).clone().find('span.index-term').empty().end().text();
      var subsection = jQuery(this).parents('section:first').attr('id');
      if (subsection == undefined) {
        subsection = 'sec' + j + '_' + k; 
      }
      jQuery('<a class="section-anchor" name="hdr_' + subsection + '" />').insertBefore(jQuery(this));
      output += ('<li><a href="#hdr_' + subsection + '" >' + header + '</a></li>\n');
      k++;
    });
    if (subSections.length) {
      output += '</ul>\n';
    }
    output += '</li></ul>\n';
    j++;
  });
  output += '</li></ul></nav></div>\n';
  jQuery('body').append(jQuery(output));
  
  
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
});
