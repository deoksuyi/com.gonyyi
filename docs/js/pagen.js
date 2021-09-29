/* Filler -- one step HTML header setting for test */
/* Copyright (C) 2021 Gon Y. Yi */

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

function loadAll(optionalName="TestPage") {
  setTitleIfNE(optionalName);
  addHeadIfNE("meta", "charset", "charset", "utf-8");
  addHeadIfNE("meta", 'name="viewport"', "name", "viewport", 
    "content", "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0");
  addHeadIfNE("meta", 'name="theme-color"', "name", "theme-color", "content", "#79e");
  // <meta property="og:locale" content="en_US"/>
  addHeadIfNE("meta", 'property="og:locale"', 
    "property", "og:locale", "content", "en_US");
  // <meta property="og:type" content="website"/>
  addHeadIfNE("meta", 'property="og:type"', 
    "property", "og:type", "content", "website");
  // <meta property="og:url" content="https://gonyyi.com"/>
  addHeadIfNE("meta", 'property="og:url"', 
    "property", "og:url", "content", "https://gonyyi.com");
  // <meta property="og:image" content="img/og-img.png"/>
  addHeadIfNE("meta", 'property="og:image"', 
    "property", "og:image", "content", "https://gonyyi.com/img/og-img.png");
  // <meta property="og:site_name" content="gonyyi"/>
  addHeadIfNE("meta", 'property="og:site_name"', 
    "property", "og:site_name", "content", "gonyyi");
  // <meta property="og:title" content="validator"/>
  addHeadIfNE("meta", 'property="og:title"', 
    "property", "og:title", "content", "validator");
  // <link rel="icon" type="image/svg+xml" href="img/favicon.svg"/>
  addHeadIfNE("link", 'rel="icon"', 
    "rel", "icon", "type", "image/svg+xml", "href", "https://gonyyi.com/img/favicon.svg");
  // <link rel="alternate icon" type="image/png" href="img/favicon.png"/>
  addHeadIfNE("link", 'rel="alternate icon"', 
    "rel", "alternate icon", "type", "image/svg+xml", "href", "https://gonyyi.com/img/favicon.png");
  // <link rel="apple-touch-icon" href="img/apple-touch-icon.png" sizes="any"/>
  addHeadIfNE("link", 'rel="apple-touch-icon"', 
    "rel", "apple-touch-icon", "href", "https://gonyyi.com/img/apple-touch-icon.png", "size", "any");
  // <link rel="stylesheet" type="text/css" href="css/base.css"/>  
  addHeadIfNE("link", 'rel="stylesheet"', 
    "rel", "stylesheet", "type", "text/css", "href", "https://gonyyi.com/css/base.css");

}

console.log("HTML Filler v1.0 (c) Gon Y. Yi 2021");
loadAll();