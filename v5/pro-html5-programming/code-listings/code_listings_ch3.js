inlineEditors = inlineEditors || {};
inlineEditors.codeListings = {
  '3-2': {
    'title': 'SVG Containing a Red Rectangle',
    'code': '<!doctype html>\n' +
            '<svg width="200" height="200">  \n' +
            '	 <rect x="10" y="20" width="100" height="80" stroke="red" fill="#ccc" />\n' +
            '</svg>\n'
  },
  '3-3': {
    'title': 'A Rectangle and a Circle',
    'code': '<!doctype html>\n' +
            '<svg width="200" height="200">\n' +
            '	 <rect x="10" y="20" width="100" height="80" stroke="red" fill="#ccc" />\n' +
            '	 <circle cx="120" cy="80" r="40" stroke="#00f" fill="none" stroke-width="8" />\n' +
            '</svg>\n'
  },
  '3-4': {
    'title': 'A Rectangle and a Circle Within a Rotated Group',
    'code': '<svg width="200" height="200">\n' +
            '	 <g transform="translate(60,0) rotate(30) scale(0.75)" id="ShapeGroup">\n' +
            '  	 <rect x="10" y="20" width="100" height="80" stroke="red" fill="#ccc" />\n' +
            '  	 <circle cx="120" cy="80" r="40" stroke="#00f" fill="none" stroke-width="8" />\n' +
            '  </g>\n' +
            '</svg>\n'
  },
  '3-5': {
    'title': 'Using a Group Three Times',
    'code': '<svg width="200" height="200">\n' +
            '  <defs>\n' +
            '    <g id="ShapeGroup">\n' +
            '      <rect x="10" y="20" width="100" height="80" stroke="red" fill="#ccc" />\n' +
            '      <circle cx="120" cy="80" r="40" stroke="#00f" fill="none" stroke-width="8" />\n' +
            '    </g>\n' +
            '  </defs>\n' +
            '  <use xlink:href="#ShapeGroup" transform="translate(60,0) scale(0.5)"/>\n' +
            '  <use xlink:href="#ShapeGroup" transform="translate(120,80) scale(0.4)"/>\n' +
            '  <use xlink:href="#ShapeGroup" transform="translate(20,60) scale(0.25)"/>\n' +
            '</svg>\n'
  },
  '3-6': {
    'title': 'Texturing the Rectangle and Circle',
    'code': '<!doctype html>\n' +
    '<svg width="200" height="200">\n' +
    '  <defs>\n' +
    '    <pattern id="GravelPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="100" height="67" viewBox="0 0 100 67">\n' +
    '      <image x="0" y="0" width="100" height="67" xlink:href="gravel.jpg"></image>\n' +
    '    </pattern>\n' +
    '    <linearGradient id="RedBlackGradient">\n' +
    '      <stop offset="0%" stop-color="#000"></stop>\n' +
    '      <stop offset="100%" stop-color="#f00"></stop>\n' +
    '    </linearGradient>\n' +
    '  </defs>\n' +
    '  <rect x="10" y="20" width="100" height="80" stroke="red" fill="url(#RedBlackGradient)" />\n' +
    '  <circle cx="120" cy="80" r="40" stroke="#00f" stroke-width="8" fill="url(#GravelPattern)" />\n' +
    '</svg>\n'
  },
  '3-9': {
    'title': 'SVG Text',
    'code': '<svg width="600" height="200">\n' +
    '  <text \n' +
    '    x="10" y="80"\n' +
    '    font-family="Droid Sans"\n' +
    '    stroke="#00f"\n' +
    '    fill="#0ff"\n' +
    '    font-size="40px"\n' +
    '    font-weight="bold">\n' +
    '    Select this text!\n' +
    '  </text>\n' +
    '</svg>\n'
  },
  '3-10': {
    'title': 'Complete Code for trails-static.html',
    'code': '<!doctype html>\n' +
            '<title>Happy Trails in SVG</title>\n' +
            '<style>\n' +
            '  svg {\n' +
            '    border: 1px solid black;\n' +
            '  }\n' +
            '</style>\n' +
            '<svg width="400" height="600">\n' +
            '  <defs>\n' +
            '    <pattern id="GravelPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="100" height="67" viewBox="0 0 100 67">\n' +
            '      <image x=0 y=0 width=100 height=67 xlink:href="gravel.jpg" />\n' +
            '    </pattern>\n' +
            '    <linearGradient id="TrunkGradient">\n' +
            '      <stop offset="0%" stop-color="#663300" />\n' +
            '      <stop offset="40%" stop-color="#996600" />\n' +
            '      <stop offset="100%" stop-color="#552200" />\n' +
            '    </linearGradient>\n' +
            '    <rect x="-5" y="-50" width="10" height="50" id="Trunk" />\n' +
            '      <path d="M-25, -50\n' +
            '            L-10, -80\n' +
            '            L-20, -80\n' +
            '            L-5, -110\n' +
            '            L-15, -110\n' +
            '            L0, -140\n' +
            '            L15, -110\n' +
            '            L5, -110\n' +
            '            L20, -80\n' +
            '            L10, -80\n' +
            '            L25, -50\n' +
            '            Z"\n' +
            '            id="Canopy"\n' +
            '            />\n' +
            '    <linearGradient id="CanopyShadow" x=0 y=0 x2=0 y2=100%>\n' +
            '      <stop offset="0%" stop-color="#000" stop-opacity=".5" />\n' +
            '      <stop offset="20%" stop-color="#000" stop-opacity="0" />\n' +
            '    </linearGradient>\n' +
            '    <g id="Tree">\n' +
            '      <use xlink:href="#Trunk" fill="url(#TrunkGradient)" />\n' +
            '      <use xlink:href="#Trunk" fill="url(#CanopyShadow)" />\n' +
            '      <use xlink:href="#Canopy" fill="none" stroke="#663300"\n' +
            '        stroke-linejoin="round" stroke-width="4px" />\n' +
            '      <use xlink:href="#Canopy" fill="#339900" stroke="none" />\n' +
            '    </g>\n' +
            '    <g id="TreeShadow">\n' +
            '      <use xlink:href="#Trunk" fill="#000" />\n' +
            '      <use xlink:href="#Canopy" fill="000" stroke="none" />\n' +
            '    </g>\n' +
            '  </defs>\n' +
            '  <g transform="translate(-10, 350)"\n' +
            '    stroke-width="20"\n' +
            '    stroke="url(#GravelPattern)"\n' +
            '    stroke-linejoin="round">\n' +
            '    <path d="M0,0 Q170,-50 260, -190 Q310, -250 410,-250"\n' +
            '    fill="none" />\n' +
            '  </g>\n' +
            '  <text y=60 x=200\n' +
            '    font-family="impact"\n' +
            '    font-size="60px"\n' +
            '    fill="#996600"\n' +
            '    text-anchor="middle" >\n' +
            '    Happy Trails!\n' +
            '  </text>\n' +
            '  <use xlink:href="#TreeShadow"\n' +
            '    transform="translate(130, 250) scale(1, .6) skewX(-18)"\n' +
            '    opacity="0.4" />\n' +
            '  <use xlink:href="#Tree" transform="translate(130,250)" />\n' +
            '  <use xlink:href="#TreeShadow"\n' +
            '    transform="translate(260, 500) scale(2, 1.2) skewX(-18)"\n' +
            '    opacity="0.4" />\n' +
            '  <use xlink:href="#Tree" transform="translate(260, 500) scale(2)" />\n' +
            '</svg>\n'
  },
  '3-14': {
    'title': 'The Entire trails-dynamic.html Code',
    'code': '<!doctype html>\n' +
            '<title>Happy Trails in SVG</title>\n' +
            '<style>\n' +
            '  svg {\n' +
            '    border: 1px solid black;\n' +
            '  }\n' +
            '  g[id=Tree]:hover {\n' +
            '    opacity: 0.9;\n' +
            '    cursor: crosshair;\n' +
            '  }\n' +
            '</style>\n' +
            '<div>\n' +
            '  <button id="AddTreeButton">Add Tree</button>\n' +
            '</div>\n' +
            '<svg width="400" height="600">\n' +
            '  <defs>\n' +
            '    <pattern id="GravelPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="100" height="67" viewBox="0 0 100 67">\n' +
            '      <image x=0 y=0 width=100 height=67 xlink:href="gravel.jpg" />\n' +
            '    </pattern>\n' +
            '    <linearGradient id="TrunkGradient">\n' +
            '        <stop offset="0%" stop-color="#663300" />\n' +
            '        <stop offset="40%" stop-color="#996600" />\n' +
            '        <stop offset="100%" stop-color="#552200" />\n' +
            '    </linearGradient>\n' +
            '    <rect x="-5" y="-50" width=10 height=50 id="Trunk" />\n' +
            '    <path d="M-25, -50\n' +
            '            L-10, -80\n' +
            '            L-20, -80\n' +
            '            L-5, -110\n' +
            '            L-15, -110\n' +
            '            L0, -140\n' +
            '            L15, -110\n' +
            '            L5, -110\n' +
            '            L20, -80\n' +
            '            L10, -80\n' +
            '            L25, -50\n' +
            '            Z"\n' +
            '        id="Canopy"/>\n' +
            '    <linearGradient id="CanopyShadow" x=0 y=0 x2=0 y2=100%>\n' +
            '        <stop offset="0%" stop-color="#000" stop-opacity=".5" />\n' +
            '        <stop offset="20%" stop-color="#000" stop-opacity="0" />\n' +
            '    </linearGradient>\n' +
            '    <g id="Tree">\n' +
            '      <use xlink:href="#Trunk" fill="url(#TrunkGradient)" />\n' +
            '      <use xlink:href="#Trunk" fill="url(#CanopyShadow)" />\n' +
            '      <use xlink:href="#Canopy" fill="none" stroke="#663300"\n' +
            '         stroke-linejoin="round" stroke-width="4px" />\n' +
            '      <use xlink:href="#Canopy" fill="#339900" stroke="none" />\n' +
            '    </g>\n' +
            '  </defs>\n' +
            '  <g transform="translate(-10, 350)"\n' +
            '      stroke-width="20"\n' +
            '      stroke="url(#GravelPattern)"\n' +
            '      stroke-linejoin="round">\n' +
            '        <path d="M0,0 Q170,-50 260, -190 Q310, -250 410,-250"\n' +
            '          fill="none" />\n' +
            '  </g>\n' +
            '  <text y=60 x=200\n' +
            '    font-family="impact"\n' +
            '    font-size="60px"\n' +
            '    fill="#996600"\n' +
            '    text-anchor="middle" >\n' +
            '    Happy Trails!\n' +
            '  </text>\n' +
            '  <text y=90 x=200\n' +
            '    font-family="impact"\n' +
            '    font-size="20px"\n' +
            '    fill="#996600"\n' +
            '    text-anchor="middle" id="TreeCounter">\n' +
            '  </text>\n' +
            '  <text y=420 x=20\n' +
            '    font-family="impact"\n' +
            '    font-size="20px"\n' +
            '    fill="#996600"\n' +
            '    text-anchor="left">\n' +
            '    <tspan>You can remove a</tspan>\n' +
            '  <tspan y=440 x=20>tree by clicking on it.</tspan>\n' +
            '  </text>\n' +
            '  <use xlink:href="#Tree" transform="translate(130,250)" />\n' +
            '  <use xlink:href="#Tree" transform="translate(260, 500) scale(2)" />\n' +
            '</svg>\n' +
            '<script>\n' +
            '  function removeTree(e) {\n' +
            '    var elt = e.target;\n' +
            '    if (elt.correspondingUseElement) {\n' +
            '      elt = elt.correspondingUseElement;\n' +
            '    }\n' +
            '    elt.parentNode.removeChild(elt);\n' +
            '    updateTrees();\n' +
            '  }\n' +
            '  document.getElementById("AddTreeButton").onclick = function() {\n' +
            '    var x = Math.floor(Math.random() * 400);\n' +
            '    var y = Math.floor(Math.random() * 600);\n' +
            '    var scale = Math.random() + .5;\n' +
            '    var translate = "translate(" + x + "," + y + ") ";\n' +
            '    var tree = document.createElementNS("http://www.w3.org/2000/svg", "use");\n' +
            '    tree.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#Tree");\n' +
            '    tree.setAttribute("transform", translate + "scale(" + scale + ")");\n' +
            '    document.querySelector("svg").appendChild(tree);\n' +
            '    updateTrees();\n' +
            '  }\n' +
            '  function updateTrees() {\n' +
            '    var list = document.querySelectorAll("use");\n' +
            '    var treeCount = 0;\n' +
            '    for (var i=0; i<list.length; i++) {\n' +
            '      if(list[i].getAttribute("xlink:href")=="#Tree") {\n' +
            '        treeCount++;\n' +
            '        list[i].onclick = removeTree;\n' +
            '      }\n' +
            '    }\n' +
            '    var counter = document.getElementById("TreeCounter");\n' +
            '    counter.textContent = treeCount + " trees in the forest";\n' +
            '  }\n' +
            '  updateTrees();\n' +
            '</script>\n'
  }

};
