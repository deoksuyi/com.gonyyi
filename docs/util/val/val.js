// val.js
//    (c) Gon Y. Yi 2021 <https://gonyyi.com/copyright.txt>
// Usage: (using class name defined in body.onload, and it uses title attr)
//    <body onload="VAL('valhtml',true);">
//    ...
//       <li class="valhtml" url="https://gonyyi.com"></li>
var gyyStatusC1 = "";
var baseURL = "";

function gyyStatusCls() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 
    `.${gyyStatusC1}_fail,.${gyyStatusC1}_pending,.${gyyStatusC1}_ok,.${gyyStatusC1}_unknown 
      {display:inline-block; border:1px solid gray; 
        padding:0 .4em; margin: 0 .2em 0 0; border-radius: 1em;
        text-align: center; font-size: .8em;
        width: 6rem; font-family:"Helvetica","Arial",sans-serif;
        background-color:#999; color: #fff; border-color: #999;}
      .${gyyStatusC1}_pending {border-color: #ddd;color:white;background-color: #ddd;}
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
function gyyStatusUpBtnUpdate(ID, addClass, content) {
  a = document.getElementById(`gyy_status_${ID}`);
  // a.className = `${gyyStatusC1}_${addClass}`;
  a.classList.remove(`${gyyStatusC1}_ok`);
  a.classList.remove(`${gyyStatusC1}_fail`);
  a.classList.remove(`${gyyStatusC1}_pending`);
  a.classList.remove(`${gyyStatusC1}_unknown`);
  a.classList.add(`${gyyStatusC1}_${addClass}`);
  if(addClass == "unknown") {
    a.innerHTML = "err";
  }
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

function gyyStatusUpBtn(DST, ID, addClass) {
  URL = DST.getAttribute("title");
  // console.log(`baseURL=${baseURL}; URL=${URL}`);

  {
    a = document.createElement('a');
    a.href = `https://validator.w3.org/nu/?doc=${baseURL}${URL}`;
    // a.innerHTML = URL;
    span = document.createElement('span');
    span.id = `gyy_status_${ID}`; 
    span.classList.add(gyyStatusC1+"_"+addClass);
    span.innerHTML = "-";
    a.appendChild(span);
    DST.appendChild(a);
  }
  
  
  // first anchor
  {
    let a = document.createElement('a');
    a.href = baseURL+URL;
    a.innerHTML = URL;
    DST.appendChild(a);
  }
}
function gyyStatusCheck(DST, ID) {
  URL=DST.getAttribute("title")
  a = document.getElementById(`gyy_status_${ID}`);
  validatorURL = "https://html5.validator.nu/";
  // validatorURL = "https://validator.w3.org/nu/";
  fetch(`${validatorURL}?out=json&doc=${baseURL}${URL}`)
  .then(res=>res.json())
  .then(res=>gyyStatusUpBtnUpdate(ID, 'ok', res.messages))
  .catch(err => {
    if (err instanceof TypeError) {
      gyyStatusUpBtnUpdate(ID, 'unknown', []); // 503 unreachable
    } else {
      console.error(`WARN: fetch(${baseURL}${URL}) ==> ${err}`);
    }
  });
}
function gyyStatusDraw(DST, ID) {
  //URL=DST.getAttribute("title")
  gyyStatusUpBtn(DST, ID, 'pending');
}

function VAL(CSSClassName, UseDefaultCSS, UseBaseURL) {
  console.log("Val 1.0.0 - (c) Gon Y. Yi 2021 <https://gonyyi.com/copyright>");
  baseURL = UseBaseURL;
  gyyStatusC1 = CSSClassName;
  if(UseDefaultCSS==true) {gyyStatusCls();}
  var i=0;
  Array.from(document.getElementsByClassName(gyyStatusC1)).forEach(c => {
    gyyStatusDraw(c, i)
    gyyStatusCheck(c, i)
    i+=1; 
  });
}
