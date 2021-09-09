//
// GLOBAL VARIABLES
//
var maxRes;
var keyword;
var result;
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
function similarity(str1, str2){
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
function search(elm) {
	// if search button is clicked or user entered from text box,
	// if(event.key == 'Enter' || event.key == null) {
	if(keyword.value == '') {
		resultEmpty();
	} else {
		resultReset();
		tmpRes = [];
		keys.forEach(function(k){
			score=similarity(k.name, keyword.value);
			if(score != 0) {
				tmpRes.push( {data:k, score:score} );
			}
		})
		if(tmpRes.length>0) {
			tmpResIdx = Object.keys(tmpRes)
			.sort(function(item1,item2){
				if(tmpRes[item1].score > tmpRes[item2].score) return 1;
				if(tmpRes[item1].score < tmpRes[item2].score) return -1;
				if(tmpRes[item1].data.name > tmpRes[item2].data.name) return -1;
				if(tmpRes[item1].data.name < tmpRes[item2].data.name) return 1;
				return 0;
				// return tmpRes[item1].score - tmpRes[item2].score
			}).reverse();
			// limit how many can print
			if(maxRes != -1 && tmpResIdx.length > maxRes) {
				tmpResIdx = tmpResIdx.slice(0, maxRes);
			}
			tmpResIdx.forEach(function(k){
				resultAdd(tmpRes[k]);
			});
		} else {
			resultEmpty();
		}
	}
	keyword.focus();
}

//
// RESULT
//
function resultEmpty() {
	result.innerHTML = '<li>No result</li>';
	keyword.focus();
}
function resultReset() {
	result.innerHTML = '';
}
function resultAdd(elm) {
	tmp_score = " (match: "+elm.score.toFixed(2)+")";
	tmp_li = document.createElement("li");
	tmp_a = document.createElement('a');
	tmp_a.setAttribute('href', elm.data.url);
	tmp_a.innerHTML = elm.data.name + ' '
	tmp_i = document.createElement('i');
	tmp_i.innerHTML = elm.data.desc + tmp_score;
	tmp_a.appendChild(tmp_i);
	tmp_li.appendChild(tmp_a);
	result.appendChild(tmp_li);
}			

//
// RUN
//
function run(idKeyword, idResult, maxResult) {
	keyword = document.getElementById(idKeyword);
	result = document.getElementById(idResult);
	maxRes = maxResult;
	resultEmpty();
}
