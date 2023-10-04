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

//FIX STYLES ********************************************
var ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = baseURL+"quizstyle.css";
document.getElementsByTagName("head")[0].appendChild(ss);
//**************************************************************

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
		
	var f = document.getElementById('rightDiv');
	calcVisible=0;
	var d= new Date();
	var options = {
		weekday: "short", year: "numeric", month: "short",
		day: "numeric", hour: "2-digit", minute: "2-digit"
	};
	alertText = toAlpha(quizId+'\n'+GRADE+'\n'+d.toLocaleTimeString("en-us", options)+'\n'+Math.floor(Math.random()*100000)+'\n\n');

	f.innerHTML='<h3>You have completed this assignment.</h3><h3>'+quizId+'</h3>Your Grade: '+GRADE+'%<br><br>To inform your instructor of your performance, email the code below exactly as it appears to John.Snow@cune.edu.<br><br>'+alertText+'<br><br><br><button onclick="rightDiv.style.display=\'none\';">Hide this window</button>';
	f.style.display='block';
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
		problemList+='<div  class="feedbackarea" id="feedbackarea'+i+'">';
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
	displayProblems();
	}

var bodyTextLeft="	<button id='calculatorButton' onclick='showCalculator();'>Calculator</button>\
				<div id='calculatorDiv'>\
					<button id='calculatorCloser' onclick='hideCalculator();'>X</button>\
					<div id='calculatorHandle' \
						onmousedown='mouseDownFunction(event);' \
						ontouchstart='mouseDownFunction(event);'	>\
					</div>\
					<iframe src='"+baseURL+"calc.html' style='border:none; background: none; width: 420px; height: 620px;'></iframe>\
					</div>	\
	<div id='problemArea'>";
var bodyTextRight="<div id='rightDiv'></div>";

//---------------------------------------------------------------------------
	var mouseDown=false;
	var dragging = false;
	var offsetX =0;
	var offsetY =0;
	var mouseX = 0;
	var mouseY=0;

	function getCoords(e){
		mouseX=e.clientX;
		mouseY=e.clientY;
	}	
	function mouseDownFunction (e){
		e.preventDefault();
		mouseDown=true;
		if (e.touches)
			getCoords(e.touches[0]);
		else
			getCoords(e);
		var brect =  calculatorDiv.getBoundingClientRect();
		offsetX=mouseX-brect.left;
		offsetY=mouseY-brect.top;
		dragging=true;
		}
	function mouseUpFunction(e){
		mouseDown=false;
		dragging=false;
	}
		function movingFunction(e){
			var brect;
			if (mouseDown){
				if (e.touches)
					getCoords(e.touches[0]);
				else
					getCoords(e);
				if (dragging){
					calculatorDiv.style.top=(mouseY-offsetY)+'px';
					calculatorDiv.style.left=(mouseX-offsetX)+'px';
				}
			}
		}
	function hideCalculator(){
		calculatorDiv.style.display='none';
	}
	function showCalculator(){
		calculatorDiv.style.display='block';
	}
//---------------------------------------------------------------------------	
	
function fillBody(){
	document.body.innerHTML=bodyTextLeft+'<H1>'+quizId+'</H1>'+directions+'<hr><button id="beginButton" onclick="beginAssignment();">Begin</button><hr></div>'+bodyTextRight;
	document.onmouseup=mouseUpFunction;
	document.ontouchend=mouseUpFunction;
	document.onmousemove=movingFunction;
	document.ontouchmove=movingFunction;
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