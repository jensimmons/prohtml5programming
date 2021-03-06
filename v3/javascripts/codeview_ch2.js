

        var delay;
        var editor;
        var codeviewReadyDelay;
        var preview;
        var previewFrame;

        function updatePreview() {
          if (document.getElementById('preview')) {
            var previewFrame = document.getElementById('preview');
            var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
            preview.open();
            preview.write(editor.getValue());
            preview.close();
          }
        }

        function initCodeview () {
          console.log('initCodeview');     
          // Initialize CodeMirror editor with a nice html5 canvas demo.
          editor = CodeMirror.fromTextArea(document.getElementById('code'), {
            mode: 'text/html',
            tabMode: 'indent',
            theme: 'default',
            lineNumbers: true,
            onChange: function() {
              clearTimeout(delay);
              delay = setTimeout(updatePreview, 300);
            }
          });
          setTimeout(updatePreview, 300);

          jQuery(".cb-codeview").colorbox({
            inline: true, width:"90%", height: "90%", 
            onComplete:function(){ 
              var listingNumber = $(this).data('listing');
              var codeObj = codeListings[listingNumber];
              editor.setValue(codeObj.code);
              jQuery('#code-view-source h1').html('Listing ' + listingNumber + ': ' + codeObj.title);
            },
            onClosed:function(){
              editor.setValue('');
              jQuery('#code-view-source h1').html('');
            }
          });
          console.log('codeview initialized');
        }

        function codeviewReady() {
          clearTimeout(codeviewReadyDelay);
          if($('.ignore-me').length && $('a.cb-codeview').length && $('#preview').length) {
            initCodeview();  
          } else {
            codeviewReadyDelay = setTimeout(codeviewReady, 100);
          }
        }

        var codeListings = {
          '2-6': {
            'title': 'Diagonal line example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Diagonal line example</title>\n' +
                    '\n' +
                    '  <canvas id="diagonal" style="border: 1px solid;"  width="200" height="200"></canvas>\n' +
                    '  <script>\n' +
                    '    function drawDiagonal() {\n' +
                    '      // Get the canvas element and its drawing context\n' +
                    '      var canvas = document.getElementById(\'diagonal\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      // Create a path in absolute coordinates\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(70, 140);\n' +
                    '      context.lineTo(140, 70);\n' +
                    '\n' +
                    '      // Stroke the line onto the canvas\n' +
                    '      context.stroke();\n' +
                    '    }\n' +
                    '\n' +
                    '    window.addEventListener("load", drawDiagonal, true);\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-7': {
            'title': 'Translated diagonal line example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Translated diagonal line example</title>\n' +
                    '\n' +
                    '  <canvas id="diagonal" style="border: 1px solid;"  width="200" height="200"></canvas>\n' +
                    '  <script>\n' +
                    '    function drawDiagonal() {\n' +
                    '      var canvas = document.getElementById(\'diagonal\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      // Save a copy of the current drawing state\n' +
                    '      context.save();\n' +
                    '\n' +
                    '      // Move the drawing context to the right, and down\n' +
                    '      context.translate(70, 140);\n' +
                    '\n' +
                    '      // Draw the same line as before, but using the origin as a start\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(0, 0);\n' +
                    '      context.lineTo(70, -70);\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      // Restore the old drawing state\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '    window.addEventListener("load", drawDiagonal, true);\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-9': {
            'title': 'Closed path example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Closed path example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      // Draw the tree canopy\n' +
                    '      context.beginPath();\n' +
                    '\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      // Top of the tree\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '\n' +
                    '      // Close the path back to its start point\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      // Create the shape for our canopy path\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      // Stroke the current path\n' +
                    '      context.stroke();\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '    window.addEventListener("load", drawTrails, true);\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-10': {
            'title': 'Stroke style example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Stroke style example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      // Increase the line width\n' +
                    '      context.lineWidth = 4;\n' +
                    '\n' +
                    '      // Round the corners at path joints\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '\n' +
                    '      // Change the color to brown\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '\n' +
                    '      context.stroke();\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '    window.addEventListener("load", drawTrails, true);\n' +
                    '  </scr'+ 'ipt>\n' +
                    '</html>\n'
          },
          '2-11': {
            'title': 'Fill style example',
            'code': '<!DOCTYPE html>' +
                    '<html>\n' +
                    '  <title>Fill style example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      // Set the fill color to green and fill the canopy\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '    window.addEventListener("load", drawTrails, true);\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-12': {
            'title': 'Fill rectangle example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Fill rectangle example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '\n' +
                    '      // Change fill color to brown\n' +
                    '      context.fillStyle = \'#663300\';\n' +
                    '\n' +
                    '      // Fill a rectangle for the tree trunk\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '    window.addEventListener("load", drawTrails, true);\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-13': {
            'title': 'Curve example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Curve example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '\n' +
                    '      context.fillStyle = \'#663300\';\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      // Save the canvas state and draw the path\n' +
                    '      context.save();\n' +
                    '\n' +
                    '      context.translate(-10, 350);\n' +
                    '      context.beginPath();\n' +
                    '\n' +
                    '      // The first curve bends up and right\n' +
                    '      context.moveTo(0, 0);\n' +
                    '      context.quadraticCurveTo(170, -50, 260, -190);\n' +
                    '\n' +
                    '      // The second curve continues down and right\n' +
                    '      context.quadraticCurveTo(310, -250, 410,-250);\n' +
                    '\n' +
                    '      // Draw the path in a wide brown stroke\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.lineWidth = 20;\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      // Restore the previous canvas state\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '    window.addEventListener("load", drawTrails, true);\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-15': {
            'title':'Image example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Image example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    // Load the bark image\n' +
                    '    var bark = new Image();\n' +
                    '    bark.src = "bark.jpg";\n' +
                    '\n' +
                    '    // Once the image is loaded, draw on the canvas\n' +
                    '    bark.onload = function () {\n' +
                    '      drawTrails();\n' +
                    '    }\n' +
                    '\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '\n' +
                    '      // Draw the bark pattern image where\n' +
                    '      //  the filled rectangle was before\n' +
                    '      context.drawImage(bark, -5, -50, 10, 50);\n' +
                    '\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(-10, 350);\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(0, 0);\n' +
                    '      context.quadraticCurveTo(170, -50, 260, -190);\n' +
                    '      context.quadraticCurveTo(310, -250, 410,-250);\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.lineWidth = 20;\n' +
                    '      context.stroke();\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-16': {
            'title': 'Gradient example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Gradient example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    var gravel = new Image();\n' +
                    '    gravel.src = "gravel.jpg";\n' +
                    '    gravel.onload = function () {\n' +
                    '      drawTrails();\n' +
                    '    }\n' +
                    '\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      // Create a 3 stop gradient horizontally across the trunk\n' +
                    '      var trunkGradient = context.createLinearGradient(-5, -50, 5, -50);\n' +
                    '\n' +
                    '      // The beginning of the trunk is medium brown\n' +
                    '      trunkGradient.addColorStop(0, \'#663300\');\n' +
                    '\n' +
                    '      // The middle-left of the trunnk is lighter in color\n' +
                    '      trunkGradient.addColorStop(0.4, \'#996600\');\n' +
                    '\n' +
                    '      // The right edge of the trunk is darkest\n' +
                    '      trunkGradient.addColorStop(1, \'#552200\');\n' +
                    '\n' +
                    '      // Apply the gradient as the fill style, and draw the trunk\n' +
                    '      context.fillStyle = trunkGradient;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '\n' +
                    '      // A second, vertical gradient creates a shadow from the\n' +
                    '      //  canopy on the trunk\n' +
                    '      var canopyShadow = context.createLinearGradient(0, -50, 0, 0);\n' +
                    '\n' +
                    '      // The beginning of the shadow gradient is black, but with\n' +
                    '      //  a 50% alpha value\n' +
                    '      canopyShadow.addColorStop(0, \'rgba(0, 0, 0, 0.5)\');\n' +
                    '\n' +
                    '      // Slightly further down, the gradient completely fades to\n' +
                    '      //  fully transparent. The rest of the trunk gets no shadow.\n' +
                    '      canopyShadow.addColorStop(0.2, \'rgba(0, 0, 0, 0.0)\');\n' +
                    '\n' +
                    '      // Draw the shadow gradient on top of the trunk gradient\n' +
                    '      context.fillStyle = canopyShadow;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(-10, 350);\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(0, 0);\n' +
                    '      context.quadraticCurveTo(170, -50, 260, -190);\n' +
                    '      context.quadraticCurveTo(310, -250, 410,-250);\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.lineWidth = 20;\n' +
                    '      context.stroke();\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-18': {
            'title':'Pattern example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Pattern example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    // Replace the bark image with\n' +
                    '    // a trail gravel image\n' +
                    '    var gravel = new Image();\n' +
                    '    gravel.src = "gravel.jpg";\n' +
                    '    gravel.onload = function () {\n' +
                    '      drawTrails();\n' +
                    '    }\n' +
                    '\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '\n' +
                    '      var trunkGradient = context.createLinearGradient(-5, -50, 5, -50);\n' +
                    '      trunkGradient.addColorStop(0, \'#663300\');\n' +
                    '      trunkGradient.addColorStop(0.4, \'#996600\');\n' +
                    '      trunkGradient.addColorStop(1, \'#552200\');\n' +
                    '      context.fillStyle = trunkGradient;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      var canopyShadow = context.createLinearGradient(0, -50, 0, 0);\n' +
                    '      canopyShadow.addColorStop(0, \'rgba(0, 0, 0, 0.5)\');\n' +
                    '      canopyShadow.addColorStop(0.2, \'rgba(0, 0, 0, 0.0)\');\n' +
                    '      context.fillStyle = canopyShadow;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      context.save();\n' +
                    '\n' +
                    '      context.translate(-10, 350);\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(0, 0);\n' +
                    '      context.quadraticCurveTo(170, -50, 260, -190);\n' +
                    '      context.quadraticCurveTo(310, -250, 410,-250);\n' +
                    '\n' +
                    '      // Replace the solid stroke with a repeated\n' +
                    '      // background pattern\n' +
                    '      context.strokeStyle = context.createPattern(gravel, \'repeat\');\n' +
                    '      context.lineWidth = 20;\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-20': {
            'title':'Scaling example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Scaling example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    var gravel = new Image();\n' +
                    '    gravel.src = "gravel.jpg";\n' +
                    '    gravel.onload = function () {\n' +
                    '      drawTrails();\n' +
                    '    }\n' +
                    '\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    // Move tree drawing into its own function for reuse\n' +
                    '    function drawTree(context) {\n' +
                    '      var trunkGradient = context.createLinearGradient(-5, -50, 5, -50);\n' +
                    '      trunkGradient.addColorStop(0, \'#663300\');\n' +
                    '      trunkGradient.addColorStop(0.4, \'#996600\');\n' +
                    '      trunkGradient.addColorStop(1, \'#552200\');\n' +
                    '      context.fillStyle = trunkGradient;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      var canopyShadow = context.createLinearGradient(0, -50, 0, 0);\n' +
                    '      canopyShadow.addColorStop(0, \'rgba(0, 0, 0, 0.5)\');\n' +
                    '      canopyShadow.addColorStop(0.2, \'rgba(0, 0, 0, 0.0)\');\n' +
                    '      context.fillStyle = canopyShadow;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '    }\n' +
                    '\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      // Draw the first tree at X=130, Y=250\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '      drawTree(context);\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      // Draw the second tree at X=260, Y=500\n' +
                    '      context.save();\n' +
                    '      context.translate(260, 500);\n' +
                    '\n' +
                    '      // Scale this tree twice normal in both dimensions\n' +
                    '      context.scale(2, 2);\n' +
                    '      drawTree(context);\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(-10, 350);\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(0, 0);\n' +
                    '      context.quadraticCurveTo(170, -50, 260, -190);\n' +
                    '      context.quadraticCurveTo(310, -250, 410,-250);\n' +
                    '      context.strokeStyle = context.createPattern(gravel, \'repeat\');\n' +
                    '      context.lineWidth = 20;\n' +
                    '      context.stroke();\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          },
          '2-22': {
            'title': 'Transform example',
            'code': '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '  <title>Transform example</title>\n' +
                    '\n' +
                    '  <canvas id="trails" style="border: 1px solid;"  width="400" height="600"> </canvas>\n' +
                    '  <script>\n' +
                    '    var gravel = new Image();\n' +
                    '    gravel.src = "gravel.jpg";\n' +
                    '    gravel.onload = function () {\n' +
                    '      drawTrails();\n' +
                    '    }\n' +
                    '\n' +
                    '    function createCanopyPath(context) {\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(-25, -50);\n' +
                    '      context.lineTo(-10, -80);\n' +
                    '      context.lineTo(-20, -80);\n' +
                    '      context.lineTo(-5, -110);\n' +
                    '      context.lineTo(-15, -110);\n' +
                    '\n' +
                    '      context.lineTo(0, -140);\n' +
                    '\n' +
                    '      context.lineTo(15, -110);\n' +
                    '      context.lineTo(5, -110);\n' +
                    '      context.lineTo(20, -80);\n' +
                    '      context.lineTo(10, -80);\n' +
                    '      context.lineTo(25, -50);\n' +
                    '      context.closePath();\n' +
                    '    }\n' +
                    '\n' +
                    '    function drawTree(context) {\n' +
                    '      // Save the current canvas state for later\n' +
                    '      context.save();\n' +
                    '\n' +
                    '      // Create a slanted tree as the shadow by applying\n' +
                    '      //  a shear transform, changing X values to increase\n' +
                    '      //  as Y values increase\n' +
                    '      context.transform(1, 0,\n' +
                    '                        -0.5, 1,\n' +
                    '                        0, 0);\n' +
                    '\n' +
                    '      // Shrink the shadow down to 60% height in the Y dimension\n' +
                    '      context.scale(1, 0.6);\n' +
                    '\n' +
                    '      // Set the tree fill to be black, but at only 20% alpha\n' +
                    '      context.fillStyle = \'rgba(0, 0, 0, 0.2)\';\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      // Redraw the tree with the shadow effects applied\n' +
                    '      createCanopyPath(context);\n' +
                    '      context.fill();\n' +
                    '\n' +
                    '      // Restore the canvas state\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      var trunkGradient = context.createLinearGradient(-5, -50, 5, -50);\n' +
                    '      trunkGradient.addColorStop(0, \'#663300\');\n' +
                    '      trunkGradient.addColorStop(0.4, \'#996600\');\n' +
                    '      trunkGradient.addColorStop(1, \'#552200\');\n' +
                    '      context.fillStyle = trunkGradient;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      var canopyShadow = context.createLinearGradient(0, -50, 0, 0);\n' +
                    '      canopyShadow.addColorStop(0, \'rgba(0, 0, 0, 0.5)\');\n' +
                    '      canopyShadow.addColorStop(0.2, \'rgba(0, 0, 0, 0.0)\');\n' +
                    '      context.fillStyle = canopyShadow;\n' +
                    '      context.fillRect(-5, -50, 10, 50);\n' +
                    '\n' +
                    '      createCanopyPath(context);\n' +
                    '\n' +
                    '      context.lineWidth = 4;\n' +
                    '      context.lineJoin = \'round\';\n' +
                    '      context.strokeStyle = \'#663300\';\n' +
                    '      context.stroke();\n' +
                    '\n' +
                    '      context.fillStyle = \'#339900\';\n' +
                    '      context.fill();\n' +
                    '    }\n' +
                    '\n' +
                    '\n' +
                    '    function drawTrails() {\n' +
                    '      var canvas = document.getElementById(\'trails\');\n' +
                    '      var context = canvas.getContext(\'2d\');\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(130, 250);\n' +
                    '      drawTree(context);\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(260, 500);\n' +
                    '\n' +
                    '      context.scale(2, 2);\n' +
                    '      drawTree(context);\n' +
                    '      context.restore();\n' +
                    '\n' +
                    '      context.save();\n' +
                    '      context.translate(-10, 350);\n' +
                    '      context.beginPath();\n' +
                    '      context.moveTo(0, 0);\n' +
                    '      context.quadraticCurveTo(170, -50, 260, -190);\n' +
                    '      context.quadraticCurveTo(310, -250, 410,-250);\n' +
                    '      context.strokeStyle = context.createPattern(gravel, \'repeat\');\n' +
                    '      context.lineWidth = 20;\n' +
                    '      context.stroke();\n' +
                    '      context.restore();\n' +
                    '    }\n' +
                    '\n' +
                    '  </scr' + 'ipt>\n' +
                    '</html>\n'
          }
        };

        jQuery(function () {
          codeviewReady();

        });