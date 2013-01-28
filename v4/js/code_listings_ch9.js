inlineEditors = inlineEditors || {};
inlineEditors.codeListings = {
  '9-17': {
    'title': 'Diagonal line example',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '<head>\n' +
            '  <script type=\"text/javascript\">\n' +
            '  \n' +
            '    var droptarget;\n' +
            '    // set the status text in our display\n' +
            '    function setStatus(text) {\n' +
            '        document.getElementById(\"status\").innerHTML = text;\n' +
            '    }\n' +
            '    // ...\n' +
            '    function loadDemo() {\n' +
            '        droptarget = document.getElementById(\"droptarget\");\n' +
            '        droptarget.className = \"validtarget\";\n' +
            '        droptarget.addEventListener(\"dragenter\", handleDragEnter, false);\n' +
            '        droptarget.addEventListener(\"dragover\", handleDragOver, false);\n' +
            '        droptarget.addEventListener(\"dragleave\", handleDragLeave, false);\n' +
            '        droptarget.addEventListener(\"drop\", handleDrop, false);\n' +
            '        setStatus(\"Drag files into this area.\");\n' +
            '    }\n' +
            '    window.addEventListener(\"load\", loadDemo, false);\n' +
            '  \n' +
            '    // handle drag events in the drop target\n' +
            '    function handleDragEnter(evt) {\n' +
            '      // if the browser supports accessing the file\n' +
            '      // list during drag, we display the file count\n' +
            '      var files = evt.dataTransfer.files;\n' +
            '      if (files)\n' +
            '          setStatus(\"There are \" + evt.dataTransfer.files.length +\n' +
            '              \" files in this drag.\");\n' +
            '      else\n' +
            '          setStatus(\"There are unknown items in this drag.\");\n' +
            '      droptarget.className = \"highlighted\";\n' +
            '      evt.stopPropagation();\n' +
            '      evt.preventDefault();\n' +
            '      return false;\n' +
            '    }\n' +
            '        \n' +
            '    // preventing the default dragover behavior\n' +
            '    // is necessary for successful drops\n' +
            '    function handleDragOver(evt) {\n' +
            '        evt.stopPropagation();\n' +
            '        evt.preventDefault();\n' +
            '        return false;\n' +
            '    }\n' +
            '    // reset the text and status when drags leave\n' +
            '    function handleDragLeave(evt) {\n' +
            '        setStatus(\"Drag files into this area.\");\n' +
            '        droptarget.className = \"validtarget\";\n' +
            '        return false;\n' +
            '    }\n' +
            '    \n' +
            '    // handle the drop of files\n' +
            '    function handleDrop(evt) {\n' +
            '      // cancel the event to prevent viewing the file\n' +
            '      evt.preventDefault();\n' +
            '      evt.stopPropagation();\n' +
            '      var filelist = evt.dataTransfer.files;\n' +
            '      var message = \"There were \" + filelist.length + \" files dropped.\";\n' +
            '      // show a detail list for each file in the drag\n' +
            '      message += \"<ol>\";\n' +
            '      [].forEach.call(filelist, function(file) {\n' +
            '          message += \"<li>\";\n' +
            '          message += \"<strong>\" + file.name + \"</strong> \";\n' +
            '          message += \"(<em>\" + file.type + \"</em>) : \";\n' +
            '          message += \"size: \" + file.size + \" bytes - \";\n' +
            '          message += \"modified: \" + file.lastModifiedDate;\n' +
            '          message += \"</li>\";\n' +
            '        });\n' +
            '        message += \"</ol>\";\n' +
            '        setStatus(message);\n' +
            '        droptarget.className = \"validtarget\";\n' +
            '        return false;\n' +
            '    }\n' +
            '    \n' +
            '  </script>\n' +
            '</head>\n' +
            '<body>\n' +
            '<div id=\"droptarget\" style=\"min-width: 300px; min-height: 200px; border:1px solid #ddd;\">\n' +
            '<div id=\"status\"></div>\n' +
            '</div>\n' +
            '</body>\n' +
            '</html>\n'
  }
};