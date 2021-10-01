/* 
  Pagen v1.2.1 - (c) Gon Y. Yi 2021 
  
  USAGE: add below code to anywhere in the head.
    <script src="https://gonyyi.com/js/pagen.js"></script>

  Pagen will place default code on the top. Therefore any other code will
  overwrite Pagen's default. See example below:

      <style>
        header > h1 > a {color:red;}
      </style>  
      <script src="../../js/pagen.js"></script>
  
  OPTIONS: Pagen allows some override options. It can be placed before or after
  the script src=Pagen tag.

      PAGEN_TITLE     -- page title, if this is set, it will override current tag
      PAGEN_BASE_URL  -- base URL for images
      PAGEN_FOOTER    -- footer

    Example:

      <script>
        PAGEN_TITLE    = "Gon Original";
        PAGEN_BASE_URL = "https://gonyyi.com";
        PAGEN_FOOTER   = "copyright (c) gon/y/yi 2016-2021";
      </script>
      <script src="../../js/pagen.js"></script>    

  */

function setTitleIfNE() {
  if(document.title=="") {
    document.title = PAGEN_TITLE;
  }
}

function addHead(type, ...keyValues) {
  meta = document.createElement(type);
  // console.log(`addHead.keyValues.length = ${keyValues.length}`);
  for(i=0;i<(keyValues.length - keyValues.length%2);i+=2) {
    meta.setAttribute(keyValues[i], keyValues[i+1]);
    // console.log(keyValues[i], keyValues[i+1]);
  }
  document.head.insertBefore(meta, document.head.firstElementChild);
  // console.log(meta);
  // document.getElementsByTagName('head')[0].appendChild(meta);
}

function addHeadIfNE(type, condition, ...keyValues) {
  m = document.querySelector(`${type}[${condition}]`);
  if(m!=null) {
    // BELOW WILL UPDATE WHEN FOUND SAME VALUE
    // for(i=0;i<(keyValues.length - keyValues.length%2);i+=2) {
    //   m.setAttribute(keyValues[i], keyValues[i+1]);
    // }
    // return 
  } else {
    // if not exist, then add it
    addHead(type, ...keyValues)
  }  
}

// ADD DOCUMENT LANGUAGE IF MISSING
function fillLang(defaultLang="en") {
  if(document.documentElement.lang == null || document.documentElement.lang == "") {
    document.documentElement.lang = defaultLang;
    // console.log(`Pagen [INFO] Added a default language [${defaultLang}]`);
    pagenLoaded.push("DEFAULT_LANG");
  }
}

// SET TITLE
function fillTitle() {
  tmpTitle = document.getElementsByTagName("title")[0];
  if(tmpTitle && tmpTitle.innerText!="") {
    tmpTitle.innerText = 
      PAGEN_TITLE && PAGEN_TITLE != "Pagen" ? PAGEN_TITLE : tmpTitle.innerText;
  } else {
    tmpTitle = document.createElement("title");
    tmpTitle.innerText = PAGEN_TITLE;
    document.head.insertBefore(tmpTitle, document.head.firstElementChild);
    pagenLoaded.push("TITLE");
    // console.log(`Pagen: Added a default title [${defaultTitle}]`);
  }
}

// ADD HEADER
// check if header exist, if not, create one
function fillHeader() {
  tmpHeader = document.getElementsByTagName("header");
  if(tmpHeader.length == 0) {
    header = document.createElement("header");
    header_h1 = document.createElement("h1");
    header_h1_a = document.createElement("a");
    header_h1_a.appendChild(document.createTextNode("gon/y/yi"));
    header_h1_a.href="https://gonyyi.com";
    header_h1_a.title="gonyyi main";
    header_h1.appendChild(header_h1_a);
    header.appendChild(header_h1);
    if(document.body==null) {
      console.log("Pagen [ERRO] Pagen script ran before body was loaded");
    }
    document.body.insertBefore(header, document.body.firstChild);
    // console.log("Pagen: added a header");
    pagenLoaded.push("HEADER");
  }
}

// ADD FOOTER
function fillFooter() {
  tmpFooter = document.getElementsByTagName("footer");
  if(tmpFooter.length == 0) {
    footer = document.createElement("footer");
    footer.innerHTML = PAGEN_FOOTER;
    footer_div = document.createElement("div");
    footer_div.innerHTML = "Created by Pagen";
    footer.appendChild(footer_div);
    document.body.appendChild(footer);
    pagenLoaded.push("FOOTER");
    // console.log("Pagen: added a footer");
  }    
}

// ADD META
function fillMeta() {
  addHeadIfNE("meta", 'property="og:title"', 
    "property", "og:title", "content", PAGEN_TITLE);
  addHeadIfNE("meta", 'property="og:site_name"', 
    "property", "og:site_name", "content", "gonyyi");
  addHeadIfNE("meta", 'property="og:image"', 
    "property", "og:image", "content", 
    PAGEN_BASE_URL + "/img/og-img.png");
  addHeadIfNE("meta", 'property="og:url"', 
    "property", "og:url", "content", PAGEN_BASE_URL);
  addHeadIfNE("meta", 'property="og:type"', 
    "property", "og:type", "content", "website");
  addHeadIfNE("meta", 'property="og:locale"', 
    "property", "og:locale", "content", "en_US");
  addHeadIfNE("meta", 'name="theme-color"', 
    "name", "theme-color", "content", "#37e");
  addHeadIfNE("meta", 'name="viewport"', "name", "viewport", "content", 
    "width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0");
  addHeadIfNE("meta", "charset", "charset", "utf-8");
}

// ADD LINK
function fillLink() {
  addHeadIfNE("link", 'rel="stylesheet"', 
    "rel", "stylesheet", "type", "text/css", "href", 
    PAGEN_BASE_URL + "/css/base.css");
  addHeadIfNE("link", 'rel="apple-touch-icon"', 
    "rel", "apple-touch-icon", "href", 
    PAGEN_BASE_URL + "/img/apple-touch-icon.png", "size", "any");
  addHeadIfNE("link", 'rel="alternate icon"', 
    "rel", "alternate icon", "type", "image/svg+xml", "href", 
    PAGEN_BASE_URL + "/img/favicon.png");
  addHeadIfNE("link", 'rel="icon"', 
    "rel", "icon", "type", "image/svg+xml", "href", 
    PAGEN_BASE_URL + "/img/favicon.svg");
}

var pagenRun = 0;
var pagenLoaded = [];

var PAGEN_TITLE = PAGEN_TITLE ? PAGEN_TITLE : "Pagen"; 
var PAGEN_BASE_URL = PAGEN_BASE_URL ? PAGEN_BASE_URL : "https://gonyyi.com";
var PAGEN_FOOTER = PAGEN_FOOTER ? PAGEN_FOOTER : "&copy; gon/y/yi 2016-2021";

function pagen(onlyOnce=true) {
  if(onlyOnce && pagenRun==0){
    console.log("Pagen [INFO] Start Pagen v1.2.1 (c) Gon Y. Yi 2021");
    fillHeader();   // ADD HEADER
    fillFooter();   // ADD FOOTER
    fillMeta();     // ADD META
    fillLink();     // ADD LINK
    fillTitle();    // ADD TITLE
    fillLang();     // ADD DOCUMENT LANGUAGE IF MISSING
    console.log("Pagen [INFO] Loaded: " + pagenLoaded.join(", "));
    pagenRun = 1;
  } else {
    console.log("Pagen [ERRO] Did not run - already ran once");
  }
}

// this to run at the end
document.addEventListener('DOMContentLoaded', function() {
  pagen();
}, false);
