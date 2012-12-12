var menuObj = [];
jQuery(function () {
  var h1 = $('h1').eq(0);
  var currentChap = h1.text();
        
  var output = '<a name="main-navigation" id="main-navigation"></a><div class="nav-container"><nav role="navigation" id="menu"><ul>';
  // if(toc) {
  //   output += ('<li class="toc"><a href="#" class="link-toc">Table of Contents</a>\n');
  //   output += '<ul>';
  //   for(var i=0; i < toc.length; i++) {
  //     
  //     for(var key in toc[i]) {
  //       var currentClass = '';
  //       if(toc[i].hasOwnProperty(key)) {
  //         if (key == currentChap) {
  //           currentClass = 'link-current';
  //         }
  //         output += ('<li class="chap"><a href="' + toc[i][key] + '" class="' + currentClass + '">' + key + '</a></li>\n');
  //       }
  //     }
  //     
  //   }
  //   output += '</ul></li>';
  // }
    
  jQuery('<a name="item_0" />').insertBefore(h1);
  output += ('<li class="current"><a href="#item_0" >' + currentChap + '</a>\n');

  var sections = jQuery('h2');
  var j = 0;
  sections.each(function () {
          
    output += '<ul>';
    var key = jQuery(this).text();
    jQuery('<a name="item_0_' + j + '" />').insertBefore(jQuery(this));
    output += ('<li><a href="#item_0_' + j + '" >' + key + '</a>\n');
    var section = jQuery(this).parents('section:first');
    var subSection = jQuery('h3', section).not('aside h3'); // leave the asides out of the nav

    if (subSection.length) {
      output += '<ul>\n';
    }
    var k = 0;
    subSection.each(function () {
            
      var header = jQuery(this).text();
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
