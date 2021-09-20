// Copyright (C) 2016-2021 Gon/Y/Yi
console.log("DSYiM Mater - (c) gon/y/yi");
var oSize = document.getElementById("inSize");
var oBgColor = document.getElementById("inBgColor");
var oColor = document.getElementById("inColor");
var oLine1 = document.getElementById("inLine1");
var oLine2 = document.getElementById("inLine2");
var btnDownload = document.getElementById('dn');
var dsyim = document.getElementById("DSYIM");
var svg = document.getElementById('DSYI');
var canvas = document.getElementById('canvas');
var win = window.URL || window.webkitURL || window;
var data = "";

function resetCanvas() {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// When the download button is clicked
btnDownload.addEventListener('click', function () {
  data = (new XMLSerializer()).serializeToString(svg);
  var img = new Image();
  var blob = new Blob([data], {type: 'image/svg+xml'});
  var url = win.createObjectURL(blob);

  img.onload = function () {
    resetCanvas();
    var tmp = canvas.getContext('2d');
    tmp.drawImage(img, 0, 0);

    var uri = canvas.toDataURL('image/png');//.replace('image/png', 'octet/stream');
    if (1 == 1) {
      // Create a button element and download
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = uri
      a.download = 'dsyim.png';
      a.click();
      window.URL.revokeObjectURL(uri);
      document.body.removeChild(a);
    } else {
      console.log(uri);
    }

  };
  img.src = url;
});

function draw() {
  // clear canvas
  resetCanvas();
  // Update the size of image
  svg.width.baseVal.value = oSize.value;
  svg.height.baseVal.value = oSize.value;
  dsyim.style.fill = oBgColor.value;
  dsyim.style.stroke = oColor.value;
  dsyim.style.strokeWidth = oLine1.value;
  document.getElementById("G").style.strokeWidth = oLine2.value;

  // Resize canvas
  var c = document.getElementById('canvas');
  c.width = oSize.value;
  c.height = oSize.value;

  data = (new XMLSerializer()).serializeToString(svg);
  var img = new Image();
  var blob = new Blob([data], {type: 'image/svg+xml'});
  var url = win.createObjectURL(blob);
  img.onload = function () {
    var tmp = canvas.getContext('2d');
    tmp.drawImage(img, 0, 0);
  };
  img.src = url;
}

function getInfoFromURL() {
  var configs = window.location.search.replace("?", "").split("&");
  // console.log("total hash item: " + configs.length);
  for (var i = 0; i < configs.length; i++) {
    var item = configs[i].split("=");
    if (item.length > 1) {
      switch (item[0]) {
        case "size":
          svg.width.baseVal.value = parseInt(item[1]);
          svg.height.baseVal.value = parseInt(item[1]);
          oSize.value = item[1];
          console.log("size: " + item[1]);
          break;
        case "bgColor":
          dsyim.style.fill = item[1];
          oBgColor.value = item[1];
          console.log("bgcolor: " + item[1]);
          break;
        case "lineColor":
          dsyim.style.stroke = item[1];
          oColor.value = item[1];
          console.log("color: " + item[1]);
          break;
        case "line1":
          dsyim.style.strokeWidth = item[1];
          oLine1.value = item[1];
          console.log("line1: " + item[1]);
          break;
        case "line2":
          document.getElementById("G").style.strokeWidth = item[1];
          oLine2.value = item[1];
          console.log("line2: " + item[1]);
          break;
      }
    }
  }
}

function getDefaultValues() {
  if (oSize.value == "") {
    oSize.value = svg.width.animVal.value; // svg.height.baseVal.value;
  }
  if (oBgColor.value == "") {
    oBgColor.value = dsyim.getAttribute("fill"); // dsyim.style.fill;
  }
  if (oColor.value == "") {
    oColor.value = dsyim.getAttribute("stroke"); // dsyim.style.stroke;
  }
  if (oLine1.value == "") {
    oLine1.value = dsyim.getAttribute("stroke-width"); // dsyim.style.strokeWidth;
  }
  if (oLine2.value == "") {
    oLine2.value = document.getElementById("G").getAttribute("stroke-width"); // dsyim.style.strokeWidth;
  }
}

oSize.addEventListener('change', draw);
oBgColor.addEventListener('change', draw);
oColor.addEventListener('change', draw);
oLine1.addEventListener('change', draw);
oLine2.addEventListener('change', draw);

getInfoFromURL();
getDefaultValues();
draw();
