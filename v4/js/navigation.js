var menuObj = [];
jQuery(function () {
  // toc
  if(toc) {
    var tocOutput = '<div class="btn-group toc-link">\n' +
    '  <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">\n' +
    '    Table of Contents\n' +
    '    <span class="caret"></span>\n' +
    '  </a>\n' +
    '<ul class="dropdown-menu">\n';
    
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
    
    tocOutput += '</ul>\n</div>\n';
    jQuery('.menu-trigger').after(jQuery(tocOutput));
  }  
  
  
  var h1 = $('h1').eq(0);
  var currentChap = h1.text();
        
  var output = '<a name="main-navigation" id="main-navigation"></a><div class="nav-container"><nav role="navigation" id="menu"><ul>';
    
  jQuery('<a name="item_0" />').insertBefore(h1);
  output += ('<li class="current"><a href="#item_0" >' + currentChap + '</a>\n');

  var sections = jQuery('h2');
  var j = 0;
  sections.each(function () {
          
    output += '<ul>';
    var key = jQuery(this).clone().find('span.index-term').empty().end().text();
    
    jQuery('<a name="item_0_' + j + '" />').insertBefore(jQuery(this));
    output += ('<li><a href="#item_0_' + j + '" >' + key + '</a>\n');
    var section = jQuery(this).parents('section:first');
    var subSection = jQuery('h3', section).not('aside h3'); // leave the asides out of the nav

    if (subSection.length) {
      output += '<ul>\n';
    }
    var k = 0;
    subSection.each(function () {
            
      var header = jQuery(this).clone().find('span.index-term').empty().end().text();
      jQuery('<a name="item_0_' + j + '_' + k + '" />').insertBefore(jQuery(this));
      output += ('<li><a href="#item_0_' + j + '_' + k + '" >' + header + '</a></li>\n');
      k++;
    });
    if (subSection.length) {
      output += '</ul>\n';
    }
    output += '</li></ul>\n';
    j++;
  });
  output += '</li></ul></nav></div>\n';
  jQuery('body').append(jQuery(output));
        
  var jPM = $.jPanelMenu();
  jPM.on();
});
