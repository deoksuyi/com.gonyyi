// validate.js
//    (c) Gon Y. Yi 2021 <https://gonyyi.com/copyright.txt>
// Usage: (using class name defined in body.onload, and it uses title attr)
//    <body onload="Validate('valhtml',true);">
//    ...
//       <li class="valhtml" url="https://gonyyi.com"></li>
var gyyStatusC1 = "";
function gyyStatusCls() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 
    `.${gyyStatusC1}_fail,.${gyyStatusC1}_ok,.${gyyStatusC1}_unknown 
      {display:inline-block; border:1px solid gray; background-color:gray; 
        padding:0 .5em; margin: 0 0 0em 1em; border-radius: 1em;
        text-align: center; font-size: .8em;
        background-color:white; color: gray;}
      .${gyyStatusC1}_fail {border-color: #FF4A31;color:white;background-color: #FF4A31;}
      .${gyyStatusC1}_ok {border-color: #397EFF;color:white;background-color:#397EFF;}
      .msg {padding: .1em .5em; margin: 0 0 0 2em; border-radius:0; 
        border: .2em solid #999; border-width: 0 0 0 .4em; 
        background-color:transparent; font-size:.8em; text-transform:none;}
      .res_error {border-color:#ff0000;} 
      .res_io {border-color:#ff9000;}
      .res_warning {border-color:#ffdd00;}`;
  document.getElementsByTagName('head')[0].appendChild(style);
}
function gyyStatusUpBtn(DST, addClass, content) {
  URL = DST.getAttribute("title");
  
  // first anchor
  {
    let a = document.createElement('a');
    a.href = URL;
    a.innerHTML = URL;
    DST.appendChild(a);
  }
  
  {
    a = document.createElement('a');
    a.href = "https://validator.w3.org/nu/?doc="+URL;
    // a.innerHTML = URL;
    span = document.createElement('span');
    span.classList.add(gyyStatusC1+"_"+addClass);
    span.innerHTML = content.length;
    a.appendChild(span);
    DST.appendChild(a);
  }
  // second anchor
  
  if( content.length > 0) {
    for(i=0;i<content.length;i++) {
      pre = document.createElement("pre");
      errType = (content[i].subType ? content[i].subType : content[i].type);
      pre.classList.add("msg", `res_${errType}`);
      pre.innerHTML = i+". [" + errType.toUpperCase() +"] ";
      pre.innerHTML += content[i].message;
      DST.appendChild(pre);
    }
  }
}
function gyyStatusChk(DST) {
  URL=DST.getAttribute("title")
  fetch("https://validator.w3.org/nu/?out=json&doc="+URL)
  .then(res=>res.json())
  .then(res=>{
    if(res.messages.length > 0) {
      gyyStatusUpBtn(DST, 'fail', res.messages);
    } else {
      gyyStatusUpBtn(DST, 'ok', res.messages);
    }
  })
  .catch(err => {
    if (err instanceof TypeError) {
      gyyStatusUpBtn(DST, 'unknown', []); // 503 unreachable
    } else {
      console.error("WARN: fetch("+URL+"}) ==> "+err);
    }
  });
}
function Validate(CSSClassName, UseDefaultCSS) {
  console.log("(c) Gon Yi 2021 <https://gonyyi.com/copyright>");
  gyyStatusC1 = CSSClassName;
  if(UseDefaultCSS==true) {gyyStatusCls();}
  Array.from(document.getElementsByClassName(gyyStatusC1)).forEach(c => gyyStatusChk(c));
}
