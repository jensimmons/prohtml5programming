inlineEditors = inlineEditors || {};
inlineEditors.codeListings = {
  '1-2': {
    'title': 'An Example HTML5 Page',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '\n' +
            '<head>\n' +
            '  <meta charset="utf-8" />\n' +
            '  <title>HTML5</title>\n' +
            '  <style>\n' +
            '  body {\n' +
            '  	background-color:#CCCCCC;\n' +
            '  	font-family:Geneva,Arial,Helvetica,sans-serif;\n' +
            '  	margin: 0px auto;\n' +
            '  	max-width:900px;\n' +
            '  	border:solid;\n' +
            '  	border-color:#FFFFFF;\n' +
            '  }\n' +
            '\n' +
            '  header {\n' +
            '  	background-color: #F47D31;\n' +
            '  	display:block;\n' +
            '  	color:#FFFFFF;\n' +
            '  	text-align:center;\n' +
            '  }\n' +
            '\n' +
            '  header h2 {\n' +
            '  	margin: 0px;\n' +
            '  }\n' +
            '\n' +
            '  h1 {\n' +
            '  	font-size: 72px;\n' +
            '  	margin: 0px;\n' +
            '  }\n' +
            '\n' +
            '  h2 {\n' +
            '  	font-size: 24px;\n' +
            '  	margin: 0px;\n' +
            '  	text-align:center;\n' +
            '  	color: #F47D31;\n' +
            '  }\n' +
            '\n' +
            '  h3 {\n' +
            '  	font-size: 18px;\n' +
            '  	margin: 0px;\n' +
            '  	text-align:center;\n' +
            '  	color: #F47D31;\n' +
            '  }\n' +
            '\n' +
            '  h4 {\n' +
            '  	color: #F47D31;\n' +
            '  	background-color: #fff;\n' +
            '  	-webkit-box-shadow: 2px 2px 20px #888;\n' +
            '  	-webkit-transform: rotate(-45deg);\n' +
            '  	-moz-box-shadow: 2px 2px 20px #888;\n' +
            '  	-moz-transform: rotate(-45deg);\n' +
            '  	position: absolute;\n' +
            '  	padding: 0px 150px;\n' +
            '  	top: 50px;\n' +
            '  	left: -120px;\n' +
            '  	text-align:center;\n' +
            '	\n' +
            '  }\n' +
            '\n' +
            '  nav {\n' +
            '  	display:block;\n' +
            '  	width:25%;\n' +
            '  	float:left;\n' +
            '  }\n' +
            '\n' +
            '  nav a:link, nav a:visited {\n' +
            '  	display: block;\n' +
            '  	border-bottom: 3px solid #fff;\n' +
            '  	padding: 10px;\n' +
            '  	text-decoration: none;\n' +
            '  	font-weight: bold;\n' +
            '  	margin: 5px;\n' +
            '  }\n' +
            '\n' +
            '  nav a:hover {\n' +
            '  	color: white;\n' +
            '  	background-color: #F47D31;\n' +
            '  }\n' +
            '\n' +
            '  nav h3 {\n' +
            '  	margin: 15px;\n' +
            '  	color: white;\n' +
            '  }\n' +
            '\n' +
            '  #container {\n' +
            '  	background-color: #888;\n' +
            '  }\n' +
            '\n' +
            '  section {\n' +
            '  	display:block;\n' +
            '  	width:50%;\n' +
            '  	float:left;\n' +
            '  }\n' +
            '\n' +
            '  article {\n' +
            '  	background-color: #eee;\n' +
            '  	display:block;\n' +
            '  	margin: 10px;\n' +
            '  	padding: 10px;\n' +
            '  	-webkit-border-radius: 10px;\n' +
            '  	-moz-border-radius: 10px;\n' +
            '  	border-radius: 10px;\n' +
            '  }\n' +
            '\n' +
            '  article header {\n' +
            '  	-webkit-border-radius: 10px;\n' +
            '  	-moz-border-radius: 10px;\n' +
            '  	border-radius: 10px;\n' +
            '  	padding: 5px;\n' +
            '\n' +
            '  }\n' +
            '\n' +
            '  article footer {\n' +
            '  	-webkit-border-radius: 10px;\n' +
            '  	-moz-border-radius: 10px;\n' +
            '  	border-radius: 10px;\n' +
            '  	padding: 5px;\n' +
            '  }\n' +
            '\n' +
            '  article h1 {\n' +
            '  	font-size: 18px;\n' +
            '  }\n' +
            '\n' +
            '	\n' +
            '  aside {\n' +
            '  	display:block;\n' +
            '  	width:25%;\n' +
            '  	float:left;\n' +
            '  }\n' +
            '\n' +
            '  aside h3 {\n' +
            '  	margin: 15px;\n' +
            '  	color: white;\n' +
            '  }\n' +
            '\n' +
            '  aside p {\n' +
            '  	margin: 15px;\n' +
            '  	color: white;\n' +
            '  	font-weight: bold;\n' +
            '  	font-style: italic;\n' +
            '  }\n' +
            '	\n' +
            '\n' +
            '  footer {\n' +
            '  	clear: both;	\n' +
            '  	display: block;\n' +
            '  	background-color: #F47D31;\n' +
            '  	color:#FFFFFF;\n' +
            '  	text-align:center;\n' +
            '  	padding: 15px;\n' +
            '  }\n' +
            '\n' +
            '  footer h2 {\n' +
            '  	font-size: 14px;\n' +
            '  	color: white;\n' +
            '  }\n' +
            '\n' +
            '\n' +
            '  /* links */\n' +
            '  a {\n' +
            '  	color: #F47D31;\n' +
            '  }\n' +
            '\n' +
            '  a:hover {\n' +
            '  	text-decoration: underline;\n' +
            '  }\n' +
            '  </style>\n' +
            '</head>\n' +
            '\n' +
            '<body>\n' +
            '\n' +
            '  <header>\n' +
            '    <h1>Header</h1>\n' +
            '    <h2>Subtitle</h2>\n' +
            '    <h4>HTML5 Rocks!</h4>\n' +
            '  </header>\n' +
            '\n' +
            '  <div id="container">\n' +
            '\n' +
            '    <nav>\n' +
            '      <h3>Nav</h3>\n' +
            '      <a href="">Link 1</a>\n' +
            '      <a href="">Link 2</a>\n' +
            '      <a href="">Link 3</a>\n' +
            '    </nav>\n' +
            '\n' +
            '    <section>\n' +
            '      <article>\n' +
            '        <header>\n' +
            '          <h1>Article Header</h1>\n' +
            '        </header>\n' +
            '        <p>Lorem ipsum dolor HTML5 nunc aut nunquam sit amet, consectetur adipiscing elit. Vivamus at est eros, vel fringilla urna.</p>\n' +
            '        <p>Per inceptos himenaeos. Quisque feugiat, justo at vehicula pellentesque, turpis lorem dictum nunc.</p>\n' +
            '        <footer>\n' +
            '          <h2>Article Footer</h2>\n' +
            '        </footer>\n' +
            '      </article>\n' +
            '      <article>\n' +
            '        <header>\n' +
            '          <h1>Article Header</h1>\n' +
            '        </header>\n' +
            '        <p>HTML5: "Lorem ipsum dolor nunc aut nunquam sit amet, consectetur adipiscing elit. Vivamus at est eros, vel fringilla urna. Pellentesque odio</p>\n' +
            '        <footer>\n' +
            '          <h2>Article Footer</h2>\n' +
            '        </footer>\n' +
            '      </article>\n' +
            '    </section>\n' +
            '\n' +
            '    <aside>\n' +
            '      <h3>Aside</h3>\n' +
            '      <p>HTML5: "Lorem ipsum dolor nunc aut nunquam sit amet, consectetur adipiscing elit. Vivamus at est eros, vel fringilla urna. Pellentesque odio rhoncus</p>\n' +
            '    </aside>\n' +
            '    <footer>\n' +
            '      <h2>Footer</h2>\n' +
            '    </footer>\n' +
            '  </div>\n' +
            '</body>\n' +
            '\n' +
            '</html>\n'
  },
  '1-3': {
    'title': 'Using the Selector API',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '\n' +
            '<head>\n' +
            '  <meta charset=\"utf-8\" />\n' +
            '  <title>Query Selector Demo</title>\n' +
            '\n' +
            '  <style type=\"text/css\">\n' +
            '    td {\n' +
            '      border-style: solid;\n' +
            '      border-width: 1px;\n' +
            '      font-size: 300%;\n' +
            '    }\n' +
            '\n' +
            '    td:hover {\n' +
            '      background-color: cyan;\n' +
            '    }\n' +
            '\n' +
            '    #hoverResult {\n' +
            '      color: green;\n' +
            '      font-size: 200%;\n' +
            '    }\n' +
            '  </style>\n' +
            '</head>\n' +
            '\n' +
            '<body>\n' +
            '  <section>\n' +
            '    <!-- create a table with a 3 by 3 cell display -->\n' +
            '    <table>\n' +
            '      <tr>\n' +
            '        <td>A1</td> <td>A2</td> <td>A3</td>\n' +
            '      </tr>\n' +
            '      <tr>\n' +
            '        <td>B1</td> <td>B2</td> <td>B3</td>\n' +
            '      </tr>\n' +
            '      <tr>\n' +
            '        <td>C1</td> <td>C2</td> <td>C3</td>\n' +
            '      </tr>\n' +
            '    </table>\n' +
            '\n' +
            '    <div>Focus the button, hover over the table cells, and hit Enter to identify them using querySelector(\'td:hover\').</div>\n' +
            '    <button type=\"button\" id=\"findHover\" autofocus>Find \'td:hover\' target</button>\n' +
            '    <div id=\"hoverResult\"></div>\n' +
            '\n' +
            '    <script type=\"text/javascript\">\n' +
            '      document.getElementById(\"findHover\").onclick = function() {\n' +
            '        // find the table cell currently hovered in the page\n' +
            '        var hovered = document.querySelector(\"td:hover\");\n' +
            '        if (hovered)\n' +
            '           document.getElementById(\"hoverResult\").innerHTML = hovered.innerHTML;\n' +
            '      }\n' +
            '    </script>\n' +
            '  </section>\n' +
            '\n' +
            '</body>\n' +
            '</html>\n'
  }
};
  