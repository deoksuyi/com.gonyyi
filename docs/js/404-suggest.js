console.log("DSYiM Search Keyword - (c) 2021 gon/y/yi");
//
// GLOBAL VARIABLES
//
var maxRes;
var result;
var keyword;
var sugg;
var keys;

//
// MATCH ALGORITHM 
//
function bigrams(string){
  var str = string.toLowerCase()
  var chars = str.split('');
  for(var i=0; i<chars.length; i++){ chars[i] = str.slice(i, i + 2); }
  return chars;
}
function similarity(str1="", str2=""){
  if(str1.length>0 && str2.length>0){
    var bgstr1 = bigrams(str1);
    var bgstr2 = bigrams(str2);
    var union = bgstr1.length + bgstr2.length;
    var matches = 0;
    for(var i=0; i<bgstr1.length; i++){
      for(var j=0; j<bgstr2.length; j++){
        if(bgstr1[i]==bgstr2[j]) matches++;
    }}
    if(matches>0) return ((2.0 * matches) / union);
  }
  return 0.0
}

//
// SEARCH
//
function search() {
  resultReset();
  tmpRes = [];
  keys.forEach(function(k){
    score=similarity(k.desc, keyword);
    // console.log(k.name, keyword, score);
    if(score > 0.2) {
      tmpRes.push( {data:k, score:score} );
    }
  })
  // console.log(tmpRes);
  if(tmpRes.length>0) {
    tmpResIdx = Object.keys(tmpRes)
    .sort(function(item1,item2){
      if(tmpRes[item1].score > tmpRes[item2].score) return 1;
      if(tmpRes[item1].score < tmpRes[item2].score) return -1;
      if(tmpRes[item1].data.desc > tmpRes[item2].data.desc) return -1;
      if(tmpRes[item1].data.desc < tmpRes[item2].data.desc) return 1;
      return 0;
      // return tmpRes[item1].score - tmpRes[item2].score
    }).reverse();
    // limit how many can print
    if(maxRes != -1 && tmpResIdx.length > maxRes) {
      tmpResIdx = tmpResIdx.slice(0, maxRes);
    }

    // If found a match, 
    if(tmpResIdx.length > 0) {
      // Add H2
      hr = document.createElement("hr");
      h2 = document.createElement("h2");
      // h2.innerHTML = 'similar items found: "'+keyword+'"';
      h2.innerHTML = 'suggestions';
      small = document.createElement("small");
      small.innerHTML = 'blah blah';

      ul = document.createElement("ul");
      // ul.classList.add("mlink");

      result = document.createElement("li");
      ul.appendChild(result);
      sugg.appendChild(hr);
      sugg.appendChild(h2);
      sugg.appendChild(small);
      sugg.appendChild(ul);

      tmpResIdx.forEach(function(k){
        resultAdd(tmpRes[k]);
      });
    }
  } else {
    resultEmpty();
  }
}

//
// RESULT
//
function resultEmpty() {
  if(result!=null) {
    try{result.innerHTML = '<li>not available</li>';}
    catch(err){console.log(err);}  
  }
}

function resultReset() {
  if(result!=null) {
    try{result.innerHTML = '';}
    catch(err){console.log(err);}
  }
}

function resultAdd(elm) {
  tmp_score = " (match: "+elm.score.toFixed(2)+")";
  tmp_li = document.createElement("li");
  tmp_a = document.createElement('a');
  tmp_a.setAttribute('href', elm.data.url);
  tmp_a.innerHTML = elm.data.url + ' '
  tmp_i = document.createElement('i');
  tmp_i.innerHTML = elm.data.desc + tmp_score;
  tmp_a.appendChild(tmp_i);
  tmp_li.appendChild(tmp_a);
  result.appendChild(tmp_li);
}     

//
// RUN
//
function run(idSuggestion, maxResult) {
  // tmpPath = window.location.pathname.split("/");
  // keyword = tmpPath[tmpPath.length-1].split(".")[0];
  keyword = window.location.pathname.replaceAll("/", "").trim();      
  sugg = document.getElementById(idSuggestion);
  maxRes = maxResult;
  search();
}
