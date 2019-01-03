// Spork.js editor
//John W. Snow (snowj342@gmail.com)
//Version of 2016-12-16
/*This is a JavaScript library that provides easy access to 
 - The HTML 5 canvas
 - Animation
 - Mouse functions
 - Time and date functions
 - Math functions
 - Key functions
*/
//If you find this useful, let me know.

//IN EDITOR ONLY
function runCode(){

	setup=function(){};
	draw=function(){};
	redraw=function(){};
	onmousedown=function(){};
	onmouseup=function(){};
	onmousemove=function(){};
	onclick=function(){};
	onmouseover=function(){};
	onmouseout=function(){}
		
	keyDown=false;
	keyCode=-1;
	keyChar='';
	altKey=false;
	ctrlKey=false;
	shiftKey=false;
	onkeydown = function(){};
	onkeyup=function(){};
	onkeypress=function (){};
		
	CONTINUELOOPING=false;
	size(400,400);
	resetTransform();
	mouseX=-1;
	mouseY=-1;
	fillcolor('black');
	color('black');
	linewidth(1);
	theCanvas.lineCap='round';
	theCanvas.lineJoin='round';
	theCanvas.font='40px Courier';
	clear();	
			
//	var codeToRun=theCode.value;
	var codeToRun=editor.getValue();
		
	try{
		eval(codeToRun);
		setup();
		draw();
	}
	catch(err){
		alert('Your code has an error: '+err.message);
	}
	window['draw']=draw;
	window['redraw']=redraw;
	window['onmousedown']=onmousedown;
	window['onmouseup']=onmouseup;
	window['onmousemove']=onmousemove;
	window['onclick']=onclick;
	window['onmouseover']=onmouseover;
	window['onmouseout']=onmouseout;
	window['onkeydown']=onkeydown;
	window['onkeyup']=onkeyup;
	window['onkeypress']=onkeypress;
	if (CONTINUELOOPING)
		doTheLoop();
}
//----------------------------------------------------------------------------------------------------------------------------------------------
//save image-----------------------------------------------------------------------------------------------------------------------------------
function toim(){
	var image=theCanvasHandle.toDataURL("image/png");
	document.getElementById('theImage').src=image;
	imgDiv.style.display='block';
}

// storage --------------------------------------------------------------------------------------------------------------------------------
function backup(){
	var fileName = 'SPORK|backup';
	localStorage[fileName]=editor.getValue();	
}
function saveCode(){
	var fileName = 'SPORK|'+theName.value;
	localStorage[fileName]=editor.getValue();
}
function display(i){
	editor.setValue(storedProgram[i]);
	theName.value= storedName[i];
//	theLoadDiv.innerHTML ='';
	theLoadDiv.style.display='none';
}
function append(i){
	editor.setValue(editor.getValue()+'\r'+storedProgram[i]);
	theName.value= storedName[i];
//	theLoadDiv.innerHTML ='';
	theLoadDiv.style.display='none';
}
function deleteSpork(i){
	localStorage.removeItem('SPORK|'+storedName[i]);
//	theLoadDiv.innerHTML ='';
//	theLoadDiv.style.display='none';
	loadCode();
}
function loadCode(){
//	theCode.value = localStorage['runCode'];

	var l = localStorage.length;
	var j, key, splitKey, k;
	k=0;
	for (j=0;j<l;j++){
		key=localStorage.key(j);
		splitKey = key.split('|');
		if ((splitKey[0] == 'SPORK')){
			storedName[k]=splitKey[1];
			storedProgram[k]=localStorage[key];
			k++;
		}
	}
	if (k==0)
		theLoadDiv.innerHTML = '<button onclick=\'loadDiv.style.display=\"none\";\'>Close</button><br>No programs were found.';
	else{
		var outputString="<button onclick='loadDiv.style.display=\"none\";'>Close</button><ul>";
		for (j=0;j<k;j++)
			outputString+="<li>"+storedName[j]+" <a class='menu' href='javascript:display("+j+");'>Replace</a> or <a class='menu' href='javascript:append("+j+");'>Append</a> or <a class='menu' href='javascript:deleteSpork("+j+");'>Delete</a>";
		outputString+='</ul>';
		theLoadDiv.innerHTML=outputString;
	}
	theLoadDiv.style.display='block';
}
function dumpCode(){
	var l = localStorage.length;
	var j, key, splitKey, k;
	k=0;
	for (j=0;j<l;j++){
		key=localStorage.key(j);
		splitKey = key.split('|');
		if ((splitKey[0] == 'SPORK')){
			storedName[k]=splitKey[1];
			storedProgram[k]=localStorage[key];
			k++;
		}
	}
	if (k==0)
		theLoadDiv.innerHTML = '<button onclick=\'loadDiv.style.display=\"none\";\'>Cancel</button><br>No programs were found.';
	else{
		var outputString="<button onclick='loadDiv.style.display=\"none\";'>Cancel</button><ul>";
		for (j=0;j<k;j++)
			outputString+="<li>"+storedName[j]+"<br><pre>"+storedProgram[j]+"</pre></li>";
		
		outputString+='</ul>';
		theLoadDiv.innerHTML=outputString;
	}
	theLoadDiv.style.display='block';
	
}
// end storage ---------------------------------------------------------------------------------------------------------------------------

// CHEAT _______-------------------------------------------------------

var cheats={
	'cheats':'',
	'point': 'point(x, y);\n',
	'circle': 'circle(x, y, radius);\n',
	'line': 'line(x1, y1, x2, y2);\n',
	'linewidth': 'linewidth(n);\n',
	'rect': 'rect(x, y, width, height);\n',
	'color': 'color(color-string or r,g,b(,a));\n',
	'fillcolor': 'fillcolor(color-string or r,g,b(,a));\n',
	'background': 'background(color-string or r,g,b(,a));\n',
	'fill': 'fill();\n',
	'triangle': 'triangle(x1, y1, x2, y2, x3, y3);\n',
	'quad': 'quad(x1, y1, x2, y2, x3, y3, x4, y4);\n',
	'ellipse': 'ellipse(x, y, x-radius, y-radius);\n',
	'arc': 'arc(x, y, radius, start-angle, stop-angle);\n',
	'translate': 'translate(x, y);\n',
	'rotate': 'rotate(n);\n',
	'scale': 'scale(s or x-scale, y-scale);\n',
	'save': 'save();\n',
	'restore': 'restore();\n',
	'filltext': 'filltext(string, x, y);\n',
	'stroketext': 'stroketext(string, x, y);\n',
	'font': 'font("bold 40px Courier");\n',
	'clear': 'clear();\n',
	'size': 'size(w,h);\n',
	'width': 'width',
	'height': 'height',
	'year': 'year()',
	'month': 'month()',
	'date': 'date()',
	'day': 'day()',
	'hour': 'hour()',
	'minute': 'minute()',
	'second': 'second()',
	'onclick': 'function onclick(){}\n',
	'onmousedown': 'function onmousedown(){}\n',
	'onmouseup': 'function onmouseup(){}\n',
	'onmousemove': 'function onmousemove(){}\n',
	'mouseDown': 'mouseDown',
	'onmouseover': 'function onmouseover(){}\n',
	'onmouseout': 'function onmouseout(){}\n',
	'setup': 'function setup(){}\n',
	'draw': 'function draw(){}\n',
	'loop': 'loop();\n',
	'startloop': 'startloop();\n',
	'stoploop': 'stoploop();\n',
	'timestep': 'timestep(number);\n',
	'function': 'function functionName(){}\n',
	'var': 'var variables;\n',
	'comment': '/*\n\n*/',
	'alert': 'alert(string);\n',
	'prompt': 'prompt(string, "")',
	'braces': '{}\n',
	'if': 'if (){}\n',
	'if...else': 'if (){}\nelse{}\n',
	'for': 'for(start ; test ; step){}\n',
	'while': 'while( condition ){}\n'
};

//FOR SAVING TO LOCAL FILE

function saveTextAsFile()
{
	var textToWrite = editor.getValue();
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
if (fileNameToSaveAs){
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}
else alert('Enter a file name.');
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		editor.setValue(textFromFileLoaded);
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}
