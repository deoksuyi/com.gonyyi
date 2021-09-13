// gyyStatus.js
// (c) gon/y/yi <https://gonyyi.com/copyright.txt>
// 09/13/2021 - v1.0
// Add script to the header, and call it from body tag's onLoad
//    eg. <head><script src="gyyStatus.js"></script></head>
//        <body onload="GYYStatus('gyyStatus',true);">
// If wants to use custom CSS, 
//    eg. <body onload="GYYStatus('gyyStatus',false);">
var gyyStatusC1 = "";
function gyyStatusCls() {
  // console.log(gyyStatusC1 + " added to style");
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 
    `.`+gyyStatusC1+` {padding: 1rem;margin: 1rem;border-radius: 3rem;width: 10rem;text-align: center;background-color:#D0D0D0;color: black;}`+
    `.`+gyyStatusC1+`_fail {background-color:#FF4A31;color: white;}`+
    `.`+gyyStatusC1+`_ok {background-color:#397EFF;color: white;}`;
  document.getElementsByTagName('head')[0].appendChild(style);
}
function gyyStatusUpBtn(DST, addClass, content) {
  DST.classList.remove(gyyStatusC1+'_ok', gyyStatusC1+'_fail'); // clear
  if (addClass!="") DST.classList.add(gyyStatusC1+"_"+addClass); // add class
  DST.innerHTML = content; // update content like (Running, Error,...)
}
async function gyyStatusChk(DST) {
  URL=DST.getAttribute("url")
  if(URL=="") {
    gyyStatusUpBtn(DST, '', "Bad URL");
    return 
  }
  DST.innerHTML = "Unknown";
  await fetch(URL).then(res => {
      if(res.status==200|| res.ok) {
        gyyStatusUpBtn(DST, 'ok', "OK");
      } else {
        gyyStatusUpBtn(DST, 'fail', "Err "+res.status);
      }
  }).catch(err => {
    if (err instanceof TypeError) {
        gyyStatusUpBtn(DST, '', "Err 503"); // 503 unreachable
    } else {
      console.error("WARN: fetch("+URL+"}) ==> "+err);
    }
  });
}
// Need if run("status", false), then 
//    status, status_ok, status_fail should be defined
function GYYStatus(CSSClassName, UseDefaultCSS) {
  gyyStatusC1 = CSSClassName;
  if(UseDefaultCSS==true) {gyyStatusCls();}
  Array.from(document.getElementsByClassName(gyyStatusC1)).forEach(c => gyyStatusChk(c));
}