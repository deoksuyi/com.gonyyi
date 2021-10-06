// val.js
//    (c) Gon Y. Yi 2021 <https://gonyyi.com/copyright.txt>
// Usage: (using class name defined in body.onload, and it uses title attr)
//    <body onload="VAL('valhtml',true);">
//    ...
//       <li class="valhtml" url="https://gonyyi.com"></li>
let gyy_status_css_class_prefix = "";
let gyy_status_base_url = "";
let gyy_status_validator_url = "https://html5.validator.nu"; // https://validator.w3.org/nu, https://html5.validator.nu
const gyy_status_copyright = "Val 1.0.0 - (c) Gon Y. Yi 2021 <https://gonyyi.com/copyright>";

function log(logType, logMsg) {
  console.log(`Val [${logType}] ${logMsg}`);
}

function gyy_status_url(URL) {
  if( !(URL.startsWith("http://") || URL.startsWith("https://"))) {
    return `${gyy_status_base_url}${URL}`;
  }
  return URL;
}

function gyy_status_set_css() {
  let style = document.createElement('style');
  style.setAttribute("type", "text/css")
  style.innerHTML =
    `.${gyy_status_css_class_prefix}_fail,.${gyy_status_css_class_prefix}_pending,.${gyy_status_css_class_prefix}_ok,.${gyy_status_css_class_prefix}_unknown 
      { display:inline-block; border:1px solid gray; 
        padding:0 1rem; margin: 0 1rem 0 0; border-radius: 1rem;
        text-align: center; font-size: 2rem;
        width: 4rem; font-family:"Helvetica","Arial",sans-serif;
        background-color:#999; color: #fff; border-color: #999;}
      .${gyy_status_css_class_prefix}_pending {border-color: #ddd;color:white;background-color: #ddd;}
      .${gyy_status_css_class_prefix}_fail {border-color: #FF4A31;color:white;background-color: #FF4A31;}
      .${gyy_status_css_class_prefix}_ok {border-color: #397EFF;color:white;background-color:#397EFF;}
      .msg {padding: 1rem 1em; margin: 0 0 0 8rem; border-radius:0; 
        border: 1rem solid #999; border-width: 0 0 0 1rem; 
        background-color:transparent; font-size:2.4rem; text-transform:none;}
      .res_error {border-color:#F39C12;} 
      .res_io {border-color:#E74C3C;}
      .res_warning {border-color:#F1C40F;}`;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function gyy_status_button_clear_init(ID) {
  let span = document.getElementById(`gyy_status_${ID}`);
  span.classList.remove(`${gyy_status_css_class_prefix}_ok`);
  span.classList.remove(`${gyy_status_css_class_prefix}_fail`);
  span.classList.remove(`${gyy_status_css_class_prefix}_pending`);
  span.classList.remove(`${gyy_status_css_class_prefix}_unknown`);
  return span
}

function gyy_status_button_update(DST, ID, addClass, content) {
  let span = gyy_status_button_clear_init(ID); // clear all the class
  span.classList.add(`${gyy_status_css_class_prefix}_${addClass}`); // add a new class
  if(addClass === "unknown") {
    span.innerHTML = "err";
  } else {
    span.innerHTML = content.length;
  }

  if( content.length > 0) {
    for(let i=0; i<content.length; i++) {
      let pre = document.createElement("pre");
      let errType = content[i]["subType"] || content[i]["type"];
      pre.classList.add("msg", `res_${errType}`);
      pre.innerHTML = i+". [" + errType.toUpperCase() +"] ";
      pre.innerHTML += content[i].message;
      DST.appendChild(pre);
    }
  }
}

function gyy_status_button(DST, ID, addClass) {
  URL = DST.getAttribute("title");

  // BUBBLE LINK
  {
    let a = document.createElement('a');
    a.href = `${gyy_status_validator_url}/?doc=${gyy_status_url(URL)}`;

    let span = document.createElement('span');
    span.id = `gyy_status_${ID}`;
    span.classList.add(gyy_status_css_class_prefix+"_"+addClass);
    span.innerHTML = "-";

    a.appendChild(span);
    DST.appendChild(a);
  }

  // URL LINK
  {
    let a = document.createElement('a');
    a.href = gyy_status_url(URL);
    
    // When base URL's used, append ~.
    if(URL.startsWith("/")) {URL = "~" + URL;}

    a.innerHTML = URL.replace(/\/index.html$/, '/'); // remove trailing '/index.html'
    DST.appendChild(a);
  }
}


function gyy_status_update(DST, ID) {
  if(!DST) {
    gyy_status_button_update(DST, ID, 'fail', []);
    return;
  }
  let URL = DST.getAttribute("title")

  // if URL has a full path, do not append base URL
  URL = gyy_status_url(URL);

  fetch(`${gyy_status_validator_url}?out=json&doc=${URL}`)
  .then(res=>res.json()).then(res=>{
    if(res.messages.length >0) {
      gyy_status_button_update(DST, ID, 'fail', res.messages)
    } else {
      gyy_status_button_update(DST, ID, 'ok', res.messages)
    }
  }).catch(err => {
    if (err instanceof TypeError) {
      gyy_status_button_update(DST, ID, 'unknown', []); // 503 unreachable
    } else {
      console.error(`WARN: fetch(${URL}) ==> ${err}`);
    }
  });
}

function VAL(CSSClassName, UseDefaultCSS, UseBaseURL) {
  log("INFO", gyy_status_copyright);
  log("INFO", `validator_url = ${gyy_status_validator_url}`);

  gyy_status_base_url = UseBaseURL;
  gyy_status_css_class_prefix = CSSClassName; // Set classPrefix

  log("INFO", `css_class_prefix = ${gyy_status_css_class_prefix}`);
  log("INFO", `base_url = ${gyy_status_base_url}`);
  log("INFO", `UseDefaultCSS = ${UseDefaultCSS}`);
  
  if(UseDefaultCSS==true) {gyy_status_set_css();}
  let i = 0;
  Array.from(document.getElementsByClassName(gyy_status_css_class_prefix)).forEach(c => {
    gyy_status_button(c, i, 'pending');
    gyy_status_update(c, i);
    i+=1;
  });
}
