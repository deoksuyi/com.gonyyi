// gyyStatus.js
// (c) gon/y/yi <https://gonyyi.com/copyright.txt>
// 09/13/2021 - v1.0.1
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
    `.`+gyyStatusC1+` {display: inline-block;border: .2rem solid gray;padding:0 .5rem;border-radius: 2rem;text-align: center;background-color:white;color: gray; font-size: 2rem;}`+
    `.`+gyyStatusC1+`_fail {border-color: #FF4A31;color:#FF4A31;}`+
    `.`+gyyStatusC1+`_ok {border-color: #397EFF;color:#397EFF;}`;
  document.getElementsByTagName('head')[0].appendChild(style);
}
function gyyStatusUpBtn(DST, addClass, content) {
  DST.classList.remove(gyyStatusC1+'_ok', gyyStatusC1+'_fail'); // clear
  if (addClass!="") DST.classList.add(gyyStatusC1+"_"+addClass); // add class
  DST.innerHTML = content; // update content like (Running, Error,...)
}
function gyyStatusChk(DST) {
  URL=DST.getAttribute("url")
  if(URL=="") {
    gyyStatusUpBtn(DST, '', "Bad URL");
    return 
  }
  DST.innerHTML = "Unknown";
  fetch(URL).then(res => {
      if(res.status==200|| res.ok) {
        gyyStatusUpBtn(DST, 'ok', res.status);
      } else {
        gyyStatusUpBtn(DST, 'fail', res.status);
      }
  }).catch(err => {
    if (err instanceof TypeError) {
        gyyStatusUpBtn(DST, '', "503"); // 503 unreachable
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
