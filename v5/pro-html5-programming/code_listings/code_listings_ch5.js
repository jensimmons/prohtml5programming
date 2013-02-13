APRI.CME.codeListings = {
  '5-3': {
    'title': 'HTML5 Geolocation',
    'code': '<!DOCTYPE html>\n' +
            '<head>\n' +
            '  <meta charset=\"utf-8\">\n' +
            '  <title>HTML5 Geolocation</title>\n' +
            '</head>\n' +
            '\n' +
            '<body onload=\"loadDemo()\">\n' +
            '\n' +
            '<h1>HTML5 Geolocation Example</h1>\n' +
            '\n' +
            '<span class=\"info\">\n' +
            '  <p id=\"status\">HTML5 Geolocation is <strong>not</strong> supported in your browser.</p>\n' +
            '</span>\n' +
            '\n' +
            '<h2>Current Position:</h2>\n' +
            '<table border=\"1\">\n' +
            '  <tr>\n' +
            '    <th width=\"40\" scope=\"col\"><h5 align=\"left\">Lat.</h5></th>\n' +
            '    <td width=\"114\" id=\"latitude\">?</td>\n' +
            '  </tr>\n' +
            '  <tr>\n' +
            '    <td><h5>Long.</h5></td>\n' +
            '    <td id=\"longitude\">?</td>\n' +
            '  </tr>\n' +
            '  <tr>\n' +
            '    <td><h5>Accuracy</h5></td>\n' +
            '    <td id=\"accuracy\">?</td>\n' +
            '  </tr>\n' +
            '  <tr>\n' +
            '    <td><h5>Timestamp</h5></td>\n' +
            '    <td id=\"timestamp\">?</td>\n' +
            '  </tr>\n' +
            '</table>\n' +
            '\n' +
            '\n' +
            '<p align=\"center\" class=\"style2\">Copyright (c) 2010</p>\n' +
            '\n' +
            '<script type=\"text/javascript\">\n' +
            '\n' +
            '  function loadDemo() {\n' +
            '    if(navigator.geolocation) {\n' +
            '      document.getElementById(\"status\").innerHTML = \"HTML5 Geolocation is supported in your browser.\";\n' +
            '      navigator.geolocation.getCurrentPosition(updateLocation);\n' +
            '    }\n' +
            '  }\n' +
            '\n' +
            '  function updateLocation(position) {\n' +
            '    var latitude = position.coords.latitude;\n' +
            '    var longitude = position.coords.longitude;\n' +
            '    var accuracy = position.coords.accuracy;\n' +
            '    var timestamp = position.timestamp;\n' +
            '\n' +
            '    if (!latitude || !longitude) {\n' +
            '      document.getElementById(\"status\").innerHTML = \"HTML5 Geolocation is supported in your browser, but location is currently not available.\";\n' +
            '      return;\n' +
            '    }\n' +
            '\n' +
            '    document.getElementById(\"latitude\").innerHTML = latitude;\n' +
            '    document.getElementById(\"longitude\").innerHTML = longitude;\n' +
            '    document.getElementById(\"accuracy\").innerHTML = accuracy\n' +
            '    document.getElementById(\"timestamp\").innerHTML = timestamp;\n' +
            '  }\n' +
            '\n' +
            '</script>\n' +
            '</body>\n' +
            '</html>\n'
  },
  '5-14': {
    'title': 'HTML5 Geolocation Odometer',
    'code': '<!DOCTYPE html>\n' +
            '<head>\n' +
            '  <meta charset=\"utf-8\">\n' +
            '  <title>HTML5 Geolocation Odometer</title>\n' +
            '</head>\n' +
            '\n' +
            '<body onload=\"loadDemo()\">\n' +
            '\n' +
            '<h1>HTML5 Geolocation Distance Tracker</h1>\n' +
            '\n' +
            '<p id=\"status\">HTML5 Geolocation is <strong>not</strong> supported in your browser.</p>\n' +
            '\n' +
            '<h2>Current Position:</h2>\n' +
            '<table border=\"1\">\n' +
            '<tr>\n' +
            '<th width=\"40\" scope=\"col\"><h5>Latitude</h5></th>\n' +
            '<td width=\"114\" id=\"latitude\">?</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td> Longitude</td>\n' +
            '<td id=\"longitude\">?</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td>Accuracy</td>\n' +
            '<td id=\"accuracy\">?</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td>Last Timestamp</td>\n' +
            '<td id=\"timestamp\">?</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '<h4 id=\"currDist\">Current distance traveled: 0.0 km</h4>\n' +
            '<h4 id=\"totalDist\">Total distance traveled: 0.0 km</h4>\n' +
            '\n' +
            '\n' +
            '<script type=\"text/javascript\">\n' +
            '\n' +
            '  var totalDistance = 0.0;\n' +
            '  var lastLat;\n' +
            '  var lastLong;\n' +
            '\n' +
            '  Number.prototype.toRadians = function() {\n' +
            '    return this * Math.PI / 180;\n' +
            '  }\n' +
            '\n' +
            '\n' +
            '  function distance(latitude1, longitude1, latitude2, longitude2) {\n' +
            '    // R is the radius of the earth in kilometers\n' +
            '    var R = 6371;\n' +
            '\n' +
            '    var deltaLatitude = (latitude2-latitude1).toRadians();\n' +
            '    var deltaLongitude = (longitude2-longitude1).toRadians();\n' +
            '    latitude1 = latitude1.toRadians(), latitude2 = latitude2.toRadians();\n' +
            '\n' +
            '    var a = Math.sin(deltaLatitude/2) *\n' +
            '            Math.sin(deltaLatitude/2) +\n' +
            '            Math.cos(latitude1) *\n' +
            '            Math.cos(latitude2) *\n' +
            '            Math.sin(deltaLongitude/2) *\n' +
            '            Math.sin(deltaLongitude/2);\n' +
            '\n' +
            '    var c = 2 * Math.atan2(Math.sqrt(a),\n' +
            '                           Math.sqrt(1-a));\n' +
            '    var d = R * c;\n' +
            '    return d;\n' +
            '  }\n' +
            '\n' +
            '\n' +
            '  function updateStatus(message) {\n' +
            '    document.getElementById(\"status\").innerHTML = message;\n' +
            '  }\n' +
            '\n' +
            '  function loadDemo() {\n' +
            '    if(navigator.geolocation) {\n' +
            '      updateStatus(\"HTML5 Geolocation is supported in your browser.\");\n' +
            '      navigator.geolocation.watchPosition(updateLocation,\n' +
            '                                          handleLocationError,\n' +
            '                                          {maximumAge:20000});\n' +
            '    }\n' +
            '  }\n' +
            '\n' +
            '  function updateLocation(position) {\n' +
            '    var latitude = position.coords.latitude;\n' +
            '    var longitude = position.coords.longitude;\n' +
            '    var accuracy = position.coords.accuracy;\n' +
            '    var timestamp = position.timestamp;\n' +
            '\n' +
            '    document.getElementById(\"latitude\").innerHTML = latitude;\n' +
            '    document.getElementById(\"longitude\").innerHTML = longitude;\n' +
            '    document.getElementById(\"accuracy\").innerHTML = accuracy;\n' +
            '    document.getElementById(\"timestamp\").innerHTML = timestamp;\n' +
            '\n' +
            '    // sanity test... don\'t calculate distance if accuracy\n' +
            '    // value too large\n' +
            '    if (accuracy >= 500) {\n' +
            '      updateStatus(\"Need more accurate values to calculate distance.\");\n' +
            '      return;\n' +
            '    }\n' +
            '\n' +
            '    // calculate distance\n' +
            '\n' +
            '    if ((lastLat != null) && (lastLong != null)) {\n' +
            '      var currentDistance = distance(latitude, longitude, lastLat, lastLong);\n' +
            '      document.getElementById(\"currDist\").innerHTML =\n' +
            '        \"Current distance traveled: \" + currentDistance.toFixed(4) + \" km\";\n' +
            '\n' +
            '      totalDistance += currentDistance;\n' +
            '\n' +
            '      document.getElementById(\"totalDist\").innerHTML =\n' +
            '        \"Total distance traveled: \" + currentDistance.toFixed(4) + \" km\";\n' +
            '    }\n' +
            '\n' +
            '\n' +
            '    lastLat = latitude;\n' +
            '    lastLong = longitude;\n' +
            '\n' +
            '    updateStatus(\"Location successfully updated.\");\n' +
            '  }\n' +
            '\n' +
            '  function handleLocationError(error) {\n' +
            '    switch(error.code)\n' +
            '    {\n' +
            '    case 0:\n' +
            '      updateStatus(\"There was an error while retrieving your location: \" + error.message);\n' +
            '      break;\n' +
            '    case 1:\n' +
            '      updateStatus(\"The user prevented this page from retrieving a location.\");\n' +
            '      break;\n' +
            '    case 2:\n' +
            '      updateStatus(\"The browser was unable to determine your location: \" + error.message);\n' +
            '      break;\n' +
            '    case 3:\n' +
            '      updateStatus(\"The browser timed out before retrieving the location.\");\n' +
            '      break;\n' +
            '    }\n' +
            '  }\n' +
            '\n' +
            '</script>\n' +
            '</body>\n' +
            '</html>\n'
  }
};