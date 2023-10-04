//***********************************************************************************
var UNCLE = 0;
var quizId='';
var directions='';
var calcVisible = 0;
var RESTRICTED=0;
var SUBMITTABLE=0;

var TYPO = 0;
var HINT = 0;

var assignmentID;
var questionID	= new Array();		//ID of each individual question
var question	= new Array();		//Statement of each question
var type	= new Array();			//N for number answer, T for text, F for function
var response	= new Array();		//User's typed response
var answer 	= new Array();		//The correct answer
var hint 	= new Array();			//A hint
var epsilon	= new Array();			//How close a numeric answer needs to be
var notes	= new Array();			//Link to notes
var grade	= new Array();			//Grade on individual problem
var lowLimit = new Array();			//lower limit of range for comparing function answer
var highLimit = new Array();			//upper limit of range for comparing function answer
var attempts = new Array();		//Number of allowable attempts
var tries	= new Array();			//Number of attemts made at a problem
var options	= new Array();			//Arrays for MC questions


var readyToSubmit =0;				//changed to 1 when all answers have been checked

var N;
var currentProblem=1;
var MAXATTEMPTS=3;
//*********************************************************************************************************
//local storage stuff
var storage;
if('localStorage' in window && window['localStorage'] !== null)
	storage = 1;
else
	storage=0;
function saveQuiz(){
	if (storage == 1){
		localStorage['SNOWSTATTEST']=document.getElementById('problemArea').innerHTML.replace(/\t/g,' ');
	}
}
//*********************************************************************************************************
//Inserting JavaScript stuff
function addJavascript(jsname,pos) {
	var th = document.getElementsByTagName(pos)[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
	}
function randomArgument(){
	var l = arguments.length;
	return (arguments[Math.floor(Math.random()*l)]);
	}
function randIntLessThan(a){
	return (Math.floor(Math.random()*a));
	}
function addRandomBlock(n){
	var l = arguments.length-1;
	var a = new Array(l);
	var i;
	var c;

	for (i=0;i<l;i++)
		a[i]=0;
	if (n>l)
		n=l;

	i=0;
	c=randIntLessThan(l);
	while (i<n){
		while (a[c]==1)
			c=randIntLessThan(l);
		addJavascript(arguments[c+1],'head');
		a[c]=1;
		i++;		
		}
	}
function addProblem(p){
	addJavascript(p, 'head');
	}
function addProblems(){
	var n = arguments.length;
	var i;
	for (i=0;i<n;i++)
		addJavascript(arguments[i], 'head');
	}
//** Code stuff **
function toAlpha(s){
	var aValue = "a".charCodeAt(0);
	var l = s.length;
	var i,a,b,c;
	var r = '';
	for (i=0;i<l;i++){
		c=s.charCodeAt(i);
		a=c%16;
		b=(c-a)/16;
		r+=String.fromCharCode(aValue+a)+String.fromCharCode(aValue+b);
		}
	return(r);
	}
//**
//***********************************************************************************
//Function stuff
function fixExponents(s){
	var a=s;
	var re=/\w\^[0-9]*/;
	var re2=/\(\S*\)\^[0-9]/;
	while (re2.test(a)){
		a=a.replace(/\((\S*)\)\^([0-9]*\.?[0-9]*)/, "pow($1, $2)");
		}
	while (re.test(a)){
		a=a.replace(/(\w*\.?\w*)\^([0-9]*\.?[0-9]*)/, "pow($1, $2)");
		}
	return a;
	}
function fDiff(f, g, l, h, n){
	var fDiffEpsilon=0.01;
	var fFunction = function(x){
		var value	
		with (Math){
			value=eval(f);
			}
		return value;
		}
	var gFunction = function(x){
		var value	
		with (Math){
			value=eval(g);
			}
		return value;
		}

	var dx, sum, x, diff;
	if ((n==undefined)||(n<=0))
		n=100;
	dx=(h-l)/n;
	
	sum=0;
	for (x=l;x<=h;x+=dx){
		diff=(fFunction(x)) - (gFunction(x));
		sum+=diff*diff;
		}
	return(sum);
	}
//***********************************************************************************

function practiceRedirect(){
	top.location.href='http://jwsnow.com';
	}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function prepareToSubmit(){
	var theForm = document.getElementById('problemForm');
	var theProblemArea = document.getElementById('problemArea');
	var alertText;
	var theTestText;

	var j,h;
	var GRADE=0;
	for (j=1;j<N;j++)
		GRADE += grade[j];
	
	GRADE = (100*GRADE/(N-1)).toFixed(1);
		

//	document.getElementById('returnButton').style.display='inline';
	document.getElementById('calculatorButton').style.display='none';
	document.getElementById('emailButton').style.display='none';
	saveQuiz();
	
	var f = document.getElementById('rightDiv');
	calcVisible=0;
	var d= new Date();
	var options = {
		weekday: "short", year: "numeric", month: "short",
		day: "numeric", hour: "2-digit", minute: "2-digit"
	};
	alertText = toAlpha(quizId+'\n'+GRADE+'\n'+d.toLocaleTimeString("en-us", options));

	f.innerHTML='<h3>You have completed this assignment.</h3><h3>'+quizId+'</h3>Your Grade: '+GRADE+'%<br><br>To inform your instructor of your performance, email the code below exactly as it appears to John.Snow@cune.edu.<br><br>'+alertText;
	
}
function cryUncle(i){
	var currentEntryArea = document.getElementById("response"+i);
	currentEntryArea.value='uncle';
	checkAnswer(i);
	}
function disableOptions(i){
	var option;
	for (j in options[i]){
		option=document.getElementById('radio_'+i+'_'+j);
		option.disabled=true;
	}
}
function checkAnswer(i){

	TYPO=0;
	UNCLE=0;
	
	var currentEntryArea = document.getElementById("response"+i);
	var attempt=currentEntryArea.value;

	response[i]=attempt;
	var x;
	var correct=0;

	if ((attempt=='') || (attempt==undefined) || (attempt==null)){
		TYPO=1;
		alert('You did not type a response.');
		}
	else if (answer[i]=='')
		correct=1; 
	else{
		if (attempt.toUpperCase() == 'UNCLE')
			UNCLE=1;
		if ((type[i]=="N") && (UNCLE==0)){
			try{
				x=eval(attempt);
				y=eval(answer[i]);
				if ((epsilon[i] != undefined) && (epsilon[i] != '') && (Math.abs(x-y) <= epsilon[i]))
					correct=1;
				else if (x==answer[i])
					correct=1;
				}
			catch(err){
				TYPO=1;
				}
			}
		else if ((type[i]=="F") && (UNCLE==0)){
			try{
				x=fixExponents(attempt);
				y=fixExponents(answer[i]);
				if ((epsilon[i] != undefined) && (epsilon[i] != '') && (fDiff(x,y,lowLimit[i],highLimit[i]) <= epsilon[i]))
					correct=1;
				}
			catch(err){
				TYPO=1;
				}
			}
		else if ((UNCLE==0) && (attempt.toUpperCase() == answer[i].toUpperCase()))
				correct=1;

		if (TYPO == 1){
			alert('I cannot understand your answer.');
			}
		else{ 
			//An actual attempt has been entered
			tries[i]++;
			if (correct==1){
				//Answer was correct
				grade[i]=(attempts[i]-tries[i]+1)/attempts[i];
				currentEntryArea.readOnly='readonly';
					if (type[i]=='MC')
						disableOptions(i);
				var f = document.getElementById('problem'+i);
				f.style.background='lightgreen';
				var placeforcheck = document.getElementById("feedbackarea"+i);
				placeforcheck.innerHTML='<font color="green">CORRECT '+(grade[i]).toFixed(2)+'</font>';
				//alert('Correct!');
				}
			else if ((UNCLE ==0)){
				//Answer not correct and did not cry uncle
				if (tries[i] < attempts[i])
					alert('Please try again.');
				else{
					grade[i]=0;
					currentEntryArea.readOnly='readonly';
					if (type[i]=='MC')
						disableOptions(i);
					var f = document.getElementById('problem'+i);
					f.style.background='lightgray';
					var placeforcheck = document.getElementById("feedbackarea"+i);
					placeforcheck.innerHTML='<font color="red">THE CORRECT ANSWER IS '+answer[i]+'</font>';
					}
				}
			else{
				//cried uncle
				grade[i]=0;
				currentEntryArea.readOnly='readonly';
					if (type[i]=='MC')
						disableOptions(i);
				var f = document.getElementById('problem'+i);
				f.style.background='lightgray';
				var placeforcheck = document.getElementById("feedbackarea"+i);
				placeforcheck.innerHTML='<font color="red">THE CORRECT ANSWER IS '+answer[i]+'</font>';
				}
			}
		}
	currentEntryArea.setAttribute('value', currentEntryArea.value);
	var optionToSet;
	if (type[i] == 'MC')
		for (j in options[i]){
			optionToSet = document.getElementById('radio_'+i+'_'+j);
			if (optionToSet.checked)
				optionToSet.setAttribute('checked', optionToSet.checked);
		}
	//See if done
	var j;
	readyToSubmit=1;
	for (j=1;j<N;j++)
		if (grade[j] == -1)
			readyToSubmit = 0;
	if (readyToSubmit == 1)
		prepareToSubmit();
	//Save if SUBMITTABLE
	if (SUBMITTABLE == 1)
		saveQuiz();
	}
function showHint(i){
	var theHint;
	if ((hint[i] == "") || (hint[i] == null))
		theHint='There are no hints specified for this problem.';
	else 
		theHint=hint[i];
	var f = document.getElementById('rightDiv');
	f.innerHTML=theHint;
	calcVisible=0;
	}
function showNotes(i){
	if ((notes[i] == "") || (notes[i] == null))
		alert('There are no notes specified for this problem.');
	else
		window.open(baseURL+notes[i]);
	}
function showCalculator(){
	var f = document.getElementById('rightDiv');
	if (calcVisible == 0){
		var calcLocation=baseURL+'calc.html';
		f.innerHTML="<iframe id='calcFrame' style='width: 100%; height: 800px;' src='"+calcLocation+"'></iframe>";
		}
	else{
		f.innerHTML="";
		}
	calcVisible=1-calcVisible;
	}
function emailInstructor(){
	var f = document.getElementById('rightDiv');
//	var calcLocation=baseURL+'email.html'+'?'+quizId;
//	saveQuiz();
//	f.innerHTML="<iframe id='calcFrame' style='width: 100%; height: 800px;' src='"+calcLocation+"'></iframe>";
	calcVisible=0;
	f.innerHTML="<h3>Email</h3> You can email questions directly to John.Snow@cune.edu. <br><br> Be sure to copy and paste which problem you have a question about into your email.";
	}
function displayProblems(){
	var i,j;
	var theDiv=document.getElementById('problemArea');
	var problemList='<ol>';
	for (i=1;i<N;i++){
		if (attempts[i]==undefined)
			attempts[i]=MAXATTEMPTS;
		tries[i]=0;
		grade[i]=-1;
		problemList+='<li id="problem'+i+'">'+question[i]+'<br>';
		if (type[i] != 'MC')
			problemList+='<input type="text" id="response'+i+'">'
		else{
			problemList+='<input type="hidden" id="response'+i+'">'
			problemList += '<form>';
			for (j in options[i])
				problemList+='<input type="radio" name="radio'+i+'" id="radio_'+i+'_'+j+'"  value = '+j+' onclick="response'+i+'.value=\''+j+'\'"><label for="radio_'+i+'_'+j+'">'+options[i][j]+'</label><br>';
			problemList += '</form>';
		}
		problemList+='<div  style="text-align: right; width: 100%" id="feedbackarea'+i+'">';
//HIDING HINTS AND NOTES
//		if ((hint[i] != null) && (hint[i]!='') && (RESTRICTED == 0))
//			problemList+='<button onclick="showHint('+i+');">Hint</button>';
//		if (RESTRICTED == 0)
//			problemList+='<button onclick="showNotes('+i+');">Notes</button>';		
		problemList+='<button onclick="cryUncle('+i+');">Uncle</button>';
		problemList+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="checkAnswer('+i+');">Check</button>';
		problemList+='</div>';
		problemList+='<hr>'+'</li>';
		}
	problemList+='</ol>'+'<hr>';
	theDiv.innerHTML='<H1>'+quizId+'</H1>'+problemList;
	}
function beginAssignment(){
	N=currentProblem;
	document.getElementById('beginButton').style.display='none';
	document.getElementById('emailButton').style.display='inline';
	document.getElementById('calculatorButton').style.display='inline';
	displayProblems();
	}
//					<button id='returnButton' style='display: none;' onclick='practiceRedirect();'>Return to Index</button>\
//					<button id='submitButton' style='display: none;' onclick='gradeRedirect();'>Submit</button>\

var bodyTextStart="";
var bodyTextLeft="	<div id='problemArea' style='position:fixed;top:0px;bottom:50px;left:0px;right:460px;overflow-y:scroll;-webkit-overflow-scrolling: touch;'>";
var bodyTextRight="	<div id='rightDiv' style='position: fixed; top: 0px; right: 0px; width:450px; background: white;overflow:auto;z-index:10; word-wrap:break-word;'></div>";
var bodyTextBottom="<div id='controlDiv' style='position: fixed;bottom: 0px;background: black;color:white;width: 100%;margin:0px;padding:10px;'>&nbsp;\
					<button id='beginButton' style='display: inline;' onclick='beginAssignment();'>Begin</button>\
					<button id='emailButton' style='display: none;' onclick='emailInstructor()'>Email</button>\
					<button id='calculatorButton' style='display: none;' onclick='showCalculator();'>Calculator</button>\
					</div>";

function fillBody(){
	theBody.innerHTML=bodyTextLeft+'<H1>'+quizId+'</H1>'+directions+'<hr></div>'+bodyTextRight+bodyTextBottom;
	}

document.onkeydown = function (event) {
	var e = event || window.event;
	var keyASCII = parseInt(e.keyCode, 10);
	var src = e.target? e.target : e.srcElement; 
	var tag = src.tagName.toUpperCase();
	if(keyASCII == 13) {
		return false;
		}
	if(keyASCII == 8) {
		if(src.readOnly || src.disabled || (tag != "INPUT" && tag != "TEXTAREA")) {
			return false;
			}
		if(src.type) {
			var type = ("" + src.type).toUpperCase();
			return type != "CHECKBOX" && type != "RADIO" && type != "BUTTON";
			}
		}
	return true;
	}