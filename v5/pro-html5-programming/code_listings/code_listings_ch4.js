APRI.CME.codeListings = {
  '4-5': {
    'title': 'HTML Page with an Audio Element',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '  <title>HTML5 Audio</title>\n' +
            '  <audio controls src=\"code_listings/johann_sebastian_bach_air.ogg\">\n' +
            '    An audio clip from Johann Sebastian Bach.\n' +
            '  </audio>\n' +
            '</html>\n'
  },
  '4-6': {
    'title': 'An Audio Element with Multiple Source Elements',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '  <title>HTML5 Audio</title>\n' +
            '  <audio controls>\n' +
            '    <source src=\"code_listings/johann_sebastian_bach_air.ogg\">\n' +
            '    <source src=\"code_listings/johann_sebastian_bach_air.mp3\">\n' +
            '    An audio clip from Johann Sebastian Bach.\n' +
            '  </audio>\n' +
            '</html>\n'
  },
  '4-7': {
    'title': 'Including Type and Codec Information in an Audio Element',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '  <title>HTML5 Audio</title>\n' +
            '  <audio controls>\n' +
            '    <source src=\"code_listings/johann_sebastian_bach_air.ogg\" type=\"audio/ogg; codecs=vorbis\">\n' +
            '    <source src=\"code_listings/johann_sebastian_bach_air.mp3\" type=\"audio/mpeg\">\n' +
            '    An audio clip from Johann Sebastian Bach.\n' +
            '  </audio>\n' +
            '</html>\n'
  },
  '4-8': {
    'title': 'Using the Autoplay Attribute',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '  <title>HTML5 Audio </title>\n' +
            '  <audio autoplay>\n' +
            '    <source src=\"code_listings/johann_sebastian_bach_air.ogg\" type=\"audio/ogg; codecs=vorbis\">\n' +
            '    <source src=\"code_listings/johann_sebastian_bach_air.mp3\" type=\"audio/mpeg\">\n' +
            '    An audio clip from Johann Sebastian Bach.\n' +
            '  </audio>\n' +
            '</html>\n'
  },
  '4-9': {
    'title': 'Adding Your Own Play Button to Control Audio',
    'code': '<!DOCTYPE html>\n' + 
            '<html>\n' + 
            '  <title>Audio cue</title>\n' + 
            '\n' + 
            '  <audio id=\"clickSound\">\n' + 
            '    <source src=\"code_listings/johann_sebastian_bach_air.ogg\">\n' + 
            '    <source src=\"code_listings/johann_sebastian_bach_air.mp3\">\n' + 
            '  </audio>\n' + 
            '\n' + 
            '  <button id=\"toggle\" onclick=\"toggleSound()\">Play</button>\n' + 
            '\n' + 
            '  <script type=\"text/javascript\">\n' + 
            '    function toggleSound() {\n' + 
            '        var music = document.getElementById(\"clickSound\");\n' + 
            '        var toggle = document.getElementById(\"toggle\");\n' + 
            '\n' + 
            '        if (music.paused) {\n' + 
            '          music.play();\n' + 
            '          toggle.innerHTML = \"Pause\";\n' + 
            '        }\n' + 
            '        else {\n' + 
            '          music.pause();\n' + 
            '          toggle.innerHTML =\"Play\";\n' + 
            '        }\n' + 
            '    }\n' + 
            '  </script>\n' + 
            '\n' + 
            '</html>\n'
  },
  '4-10': {
    'title': 'The Complete Video Timeline Code',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '  <title>Video Timeline</title>\n' +
            '\n' +
            '  <video id=\"movies\" autoplay oncanplay=\"startVideo()\" onended=\"stopTimeline()\" autobuffer=\"true\"\n' +
            '    width=\"400px\" height=\"300px\">\n' +
            '    <source src=\"code_listings/Intermission-Walk-in.ogv\" type=\'video/ogg; codecs=\"theora, vorbis\"\'>\n' +
            '    <source src=\"code_listings/Intermission-Walk-in_512kb.mp4\" type=\'video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"\'>\n' +
            '  </video>\n' +
            '\n' +
            '  <canvas id=\"timeline\" width=\"400px\" height=\"300px\">\n' +
            '\n' +
            '  <script type=\"text/javascript\">\n' +
            '\n' +
            '    // # of milliseconds between timeline frame updates\n' +
            '    var updateInterval = 5000;\n' +
            '\n' +
            '    // size of the timeline frames\n' +
            '    var frameWidth = 100;\n' +
            '    var frameHeight = 75;\n' +
            '\n' +
            '    // number of timeline frames\n' +
            '    var frameRows = 4;\n' +
            '    var frameColumns = 4;\n' +
            '    var frameGrid = frameRows * frameColumns;\n' +
            '\n' +
            '    // current frame\n' +
            '    var frameCount = 0;\n' +
            '\n' +
            '    // to cancel the timer at end of play\n' +
            '    var intervalId;\n' +
            '\n' +
            '    var videoStarted = false;\n' +
            '\n' +
            '    function startVideo() {\n' +
            '\n' +
            '      // only set up the timer the first time the\n' +
            '      // video is started\n' +
            '      if (videoStarted)\n' +
            '        return;\n' +
            '\n' +
            '      videoStarted = true;\n' +
            '\n' +
            '      // calculate an initial frame, then create\n' +
            '      // additional frames on a regular timer\n' +
            '      updateFrame();\n' +
            '      intervalId = setInterval(updateFrame, updateInterval);\n' +
            '\n' +
            '      // set up a handler to seek the video when a frame\n' +
            '      // is clicked\n' +
            '      var timeline = document.getElementById(\"timeline\");\n' +
            '      timeline.onclick = function(evt) {\n' +
            '        var offX = evt.layerX - timeline.offsetLeft;\n' +
            '        var offY = evt.layerY - timeline.offsetTop;\n' +
            '\n' +
            '        // calculate which frame in the grid was clicked\n' +
            '        // from a zero-based index\n' +
            '        var clickedFrame = Math.floor(offY / frameHeight) * frameRows;\n' +
            '        clickedFrame += Math.floor(offX / frameWidth);\n' +
            '\n' +
            '        // find the actual frame since the video started\n' +
            '        var seekedFrame = (((Math.floor(frameCount / frameGrid)) *\n' +
            '                            frameGrid) + clickedFrame);\n' +
            '\n' +
            '        // if the user clicked ahead of the current frame\n' +
            '        // then assume it was the last round of frames\n' +
            '        if (clickedFrame > (frameCount % 16))\n' +
            '            seekedFrame -= frameGrid;\n' +
            '\n' +
            '        // can\'t seek before the video\n' +
            '        if (seekedFrame < 0)\n' +
            '          return;\n' +
            '\n' +
            '        // seek the video to that frame (in seconds)\n' +
            '        var video = document.getElementById(\"movies\");\n' +
            '        video.currentTime = seekedFrame * updateInterval / 1000;\n' +
            '\n' +
            '        // then set the frame count to our destination\n' +
            '        frameCount = seekedFrame;\n' +
            '      }\n' +
            '    }\n' +
            '\n' +
            '    // paint a representation of the video frame into our canvas\n' +
            '    function updateFrame() {\n' +
            '      var video = document.getElementById(\"movies\");\n' +
            '      var timeline = document.getElementById(\"timeline\");\n' +
            '\n' +
            '      var ctx = timeline.getContext(\"2d\");\n' +
            '\n' +
            '      // calculate out the current position based on frame\n' +
            '      // count, then draw the image there using the video\n' +
            '      // as a source\n' +
            '      var framePosition = frameCount % frameGrid;\n' +
            '      var frameX = (framePosition % frameColumns) * frameWidth;\n' +
            '      var frameY = (Math.floor(framePosition / frameRows)) * frameHeight;\n' +
            '      ctx.drawImage(video, 0, 0, 400, 300, frameX, frameY, frameWidth, frameHeight);\n' +
            '\n' +
            '      frameCount++;\n' +
            '    }\n' +
            '\n' +
            '    // stop gathering the timeline frames\n' +
            '    function stopTimeline() {\n' +
            '      clearInterval(intervalId);\n' +
            '    }\n' +
            '\n' +
            '  </script>\n' +
            '\n' +
            '</html>\n'
  },
  '4-11': {
    'title': 'Using the Loop and Autoplay Attributes',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '  <title>Background Music</title>\n' +
            '\n' +
            '  <audio autoplay loop>\n' +
            '      <source src=\"code_listings/johann_sebastian_bach_air.ogg\">\n' +
            '      <source src=\"code_listings/johann_sebastian_bach_air.mp3\">\n' +
            '  </audio\n' +
            '\n' +
            '  <h1>You\'re hooked on Bach!</h1>\n' +
            '\n' +
            '</html>\n'
  },
  '4-12': {
    'title': 'Mouse Detection on a Video Element',
    'code': '<!DOCTYPE html>\n' +
            '<html>\n' +
            '  <title>Mouseover Video</title>\n' +
            '\n' +
            '  <video id=\"movies\" onmouseover=\"this.play()\" onmouseout=\"this.pause()\" autobuffer=\"true\"\n' +
            '    width=\"400px\" height=\"300px\">\n' +
            '    <source src=\"code_listings/Intermission-Walk-in.ogv\" type=\'video/ogg; codecs=\"theora, vorbis\"\'>\n' +
            '    <source src=\"code_listings/Intermission-Walk-in_512kb.mp4\" type=\'video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"\'>\n' +
            '  </video>\n' +
            '\n' +
            '  <h1>Point at the video to play it!</h1>\n' +
            '</html>\n'
  }
};