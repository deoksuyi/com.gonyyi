/* 
  Pagen v1.1.0 - (c) Gon Y. Yi 2021 
  How to use: add below code to right before body tag closes
    <script src="https://gonyyi.com/js/pagen.js"></script>
  */

function setTitleIfNE(title) {
  if(document.title=="") {
    document.title = title;
  }
}

function addHead(type, ...keyValues) {
  meta = document.createElement(type);
  // console.log(`addHead.keyValues.length = ${keyValues.length}`);
  for(i=0;i<(keyValues.length - keyValues.length%2);i+=2) {
    meta.setAttribute(keyValues[i], keyValues[i+1]);
    // console.log(keyValues[i], keyValues[i+1]);
  }
  document.getElementsByTagName('head')[0].appendChild(meta);
}

function addHeadIfNE(type, condition, ...keyValues) {
  m = document.querySelector(`${type}[${condition}]`);
  if(m!=null) {
    for(i=0;i<(keyValues.length - keyValues.length%2);i+=2) {
      m.setAttribute(keyValues[i], keyValues[i+1]);
      // console.log(keyValues[i], keyValues[i+1]);
    }
    return 
  }
  addHead(type, ...keyValues)
}

// ADD DOCUMENT LANGUAGE IF MISSING
function fillLang(defaultLang="en") {
  if(document.documentElement.lang == null || document.documentElement.lang == "") {
    document.documentElement.lang = defaultLang;
    console.log(`Pagen: Added a default language [${defaultLang}]`);
  }
}

// SET TITLE
function fillTitle(defaultTitle="gonyyi") {
  var title;
  tmpTitle = document.getElementsByTagName("title")[0];
  if(tmpTitle && tmpTitle.innerHTML!="") {
    title=tmpTitle.innerHTML;
  } else {
    tmpTitle = document.createElement("title");
    tmpTitle.innerText = defaultTitle;
    document.head.appendChild(tmpTitle);
    console.log(`Pagen: Added a default title [${defaultTitle}]`);
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
    document.body.insertBefore(header, document.body.firstChild);
    console.log("Pagen: added a header");
  }
}

// ADD FOOTER
function fillFooter() {
  tmpFooter = document.getElementsByTagName("footer");
  if(tmpFooter.length == 0) {
    footer = document.createElement("footer");
    footer.innerHTML = "&copy; gon/y/yi 2016-2021";
    footer_div = document.createElement("div");
    footer_div.innerHTML = "Created by Pagen";
    footer.appendChild(footer_div);
    document.body.appendChild(footer);
    console.log("Pagen: added a footer");
  }    
}

// ADD META
function fillMeta() {
  addHeadIfNE("meta", "charset", "charset", "utf-8");
  addHeadIfNE("meta", 'name="viewport"', "name", "viewport", "content", 
    "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0");
  addHeadIfNE("meta", 'property="og:locale"', 
    "property", "og:locale", "content", "en_US");
  addHeadIfNE("meta", 'property="og:type"', 
    "property", "og:type", "content", "website");
  addHeadIfNE("meta", 'property="og:url"', 
    "property", "og:url", "content", "https://gonyyi.com");
  addHeadIfNE("meta", 'property="og:image"', 
    "property", "og:image", "content", "https://gonyyi.com/img/og-img.png");
  addHeadIfNE("meta", 'property="og:site_name"', 
    "property", "og:site_name", "content", "gonyyi");
  addHeadIfNE("meta", 'property="og:title"', 
    "property", "og:title", "content", "validator");
}

// ADD LINK
function fillLink() {
  addHeadIfNE("link", 'rel="icon"', 
    "rel", "icon", "type", "image/svg+xml", "href", "https://gonyyi.com/img/favicon.svg");
  addHeadIfNE("link", 'rel="alternate icon"', 
    "rel", "alternate icon", "type", "image/svg+xml", "href", "https://gonyyi.com/img/favicon.png");
  addHeadIfNE("link", 'rel="apple-touch-icon"', 
    "rel", "apple-touch-icon", "href", "https://gonyyi.com/img/apple-touch-icon.png", "size", "any");
  addHeadIfNE("link", 'rel="stylesheet"', 
    "rel", "stylesheet", "type", "text/css", "href", "https://gonyyi.com/css/base.css");
}

function loadAll() {
  fillLang();     // ADD DOCUMENT LANGUAGE IF MISSING
  fillTitle();    // ADD TITLE
  fillHeader();   // ADD HEADER
  fillFooter();   // ADD FOOTER
  fillMeta();     // ADD META
  fillLink();     // ADD LINK
}

console.log("Pagen: Start Pagen v1.1.0 (c) Gon Y. Yi 2021");
loadAll();
