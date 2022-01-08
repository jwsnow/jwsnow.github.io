// Spork.js
//John W. Snow (john.snow@cune.edu)
//Version of 2017-3-15
/*This is a JavaScript library that provides easy access to 
 - The HTML 5 canvas
 - Animation
 - Mouse functions
 - Time and date functions
 - Math functions
 - Key functions
*/
//If you find this useful, let me know.

// graphics functions ------------------------------------------------------------------------------------------------------------------------
var theCanvasHandle;
var theCanvas;	//really the context
var theName;
var theLoadDiv;
var storedProgram = new Array();
var storedName = new Array();
var theCode;
var width;
var height;
var theLineNumbers;
var pi=Math.PI;
function size(x,y){
	theCanvasHandle.width=x;
	theCanvasHandle.height=y;
	width=x;
	height=y;
	mouseX=-1;
	mouseY=-1;
	fillcolor('black');
	color('black');
	linewidth(1);
	theCanvas.lineCap='round';
	theCanvas.lineJoin='round';
	theCanvas.font='40px Courier';
}
function background(c){
	var temp = theCanvas.fillStyle;
	var l = arguments.length;
	if (l==1)
		theCanvas.fillStyle = arguments[0];
	else if (l==3)
		theCanvas.fillStyle = "rgb("+arguments[0]+","+arguments[1]+","+arguments[2]+")";
	else if (l==4)
		theCanvas.fillStyle = "rgba("+arguments[0]+","+arguments[1]+","+arguments[2]+","+arguments[3]+")";
	theCanvas.fillRect(0,0,width,height);
	theCanvas.fillStyle=temp;
}
function clear(){
	theCanvas.save();
	theCanvas.setTransform(1,0,0,1,0,0);
	theCanvas.clearRect(0,0,width,height);
	theCanvas.restore();
}
function rgb(r,g,b){
	return("rgb("+r+","+g+","+b+")");
}
function rgba(r,g,b,a){
	return("rgba("+r+","+g+","+b+","+a+")");
}
function color(){
	var l = arguments.length;
	if (l==1)
		theCanvas.strokeStyle = arguments[0];
	else if (l==3)
		theCanvas.strokeStyle = "rgb("+arguments[0]+","+arguments[1]+","+arguments[2]+")";
	else if (l==4)
		theCanvas.strokeStyle = "rgba("+arguments[0]+","+arguments[1]+","+arguments[2]+","+arguments[3]+")";
}
function fillcolor(){
	var l = arguments.length;
	if (l==1)
		theCanvas.fillStyle = arguments[0];
	else if (l==3)
		theCanvas.fillStyle = "rgb("+arguments[0]+","+arguments[1]+","+arguments[2]+")";
	else if (l==4)
		theCanvas.fillStyle = "rgba("+arguments[0]+","+arguments[1]+","+arguments[2]+","+arguments[3]+")";
}
var textcolor=fillcolor;
function shadowblur(n){
	theCanvas.shadowBlur=n;
}
function shadowcolor(){
	var l = arguments.length;
	if (l==1)
		theCanvas.shadowColor = arguments[0];
	else if (l==3)
		theCanvas.shadowColor = "rgb("+arguments[0]+","+arguments[1]+","+arguments[2]+")";
	else if (l==4)
		theCanvas.shadowColor = "rgba("+arguments[0]+","+arguments[1]+","+arguments[2]+","+arguments[3]+")";
}
function lineWidth(n){
	theCanvas.lineWidth=n;
}
function linewidth(n){
	theCanvas.lineWidth=n;
}
function linecap(n){
	theCanvas.lineCap=n;
}
function lineCap(n){
	theCanvas.lineCap=n;
}
function line(){
	var l = arguments.length/2;
	var i;
	theCanvas.beginPath();
	theCanvas.moveTo(arguments[0], arguments[1]);
	for (i=1;i<l;i++)
		theCanvas.lineTo(arguments[2*i],arguments[2*i+1]);
	theCanvas.stroke();
}
function rect(x1,y1,x2,y2){
	theCanvas.beginPath();
	theCanvas.rect(x1,y1,x2,y2);
	theCanvas.stroke();
}
function fillrect(x1,y1,x2,y2){
	theCanvas.fillRect(x1,y1,x2,y2);
}
function triangle(x1,y1,x2,y2,x3,y3){
	line(x1,y1,x2,y2,x3,y3,x1,y1);
}
function quad(x1,y1,x2,y2,x3,y3,x4,y4){
	line(x1,y1,x2,y2,x3,y3,x4,y4,x1,y1);
}
function arc(x, y, r, a, b){
	theCanvas.beginPath();
	theCanvas.arc(x, y, r, a*pi/180, b*pi/180);
	theCanvas.stroke();
}
function circle(x, y, r){
	arc(x,y,r,0,360);
}
function point(x,y){
	var temp = theCanvas.fillStyle;
	theCanvas.fillStyle = theCanvas.strokeStyle;
	circle(x,y,theCanvas.lineWidth);
	theCanvas.fill();
	theCanvas.fillStyle=temp;
}
function ellipse(x, y, rx, ry, a, b){
	if (arguments.length < 6){
		a=0;
		b=360;
	}
	while (b<a) b+=360;
	var arad = a*pi/180;
	var brad = b*pi/180;
	var t;
	var dt = (brad-arad)/1000;
	theCanvas.beginPath();
	theCanvas.moveTo(x+rx*Math.cos(arad), y+ry*Math.sin(arad));
	for (t=arad;t<=brad;t+=dt)
		theCanvas.lineTo(x+rx*Math.cos(t), y+ry*Math.sin(t));
	theCanvas.stroke();
}
function translate(x,y){
	theCanvas.translate(x,y);
}
function scale(x,y){
	var l = arguments.length;
	if (l==2)
		theCanvas.scale(x,y);
	else if (l==1)
		theCanvas.scale(x,x);
}
function rotate(n){
	theCanvas.rotate(n*pi/180);
}
function save(){
	theCanvas.save();
}
function restore(){
	theCanvas.restore();
}
function fill(){
	theCanvas.fill();
}
function font(x){
	theCanvas.font=x;
}
function print(t, x, y){
	theCanvas.fillText(t, x, y);
}
function fillText(t, x, y){
	theCanvas.fillText(t, x, y);
}
function strokeText(t, x, y){
	theCanvas.strokeText(t, x, y);
}
function filltext(t, x, y){
	theCanvas.fillText(t, x, y);
}
function stroketext(t, x, y){
	theCanvas.strokeText(t, x, y);
}
function aligntext(x){
	theCanvas.textAlign=x;
}
function valigntext(x){
	theCanvas.textBaseline=x;
}
function measureText(t){
	return(theCanvas.measureText(t).width);
}
function measuretext(t){
	return(theCanvas.measureText(t).width);
}
function resetTransform(){
	theCanvas.setTransform(1,0,0,1,0,0);
}
function copyImageData(R,G,B,A){
  //called by floodfill
  var i,j;
  var c = theCanvas.getImageData(0,0,width,height).data;
  for (i=0;i<width;i++){
    R[i]=[];
    G[i]=[];
    B[i]=[];
    A[i]=[];
  }
  for (i=0;i<width;i++)
    for (j=0;j<height;j++){
      R[i][j]=c[4*(i+j*width)+0];
      G[i][j]=c[4*(i+j*width)+1];
      B[i][j]=c[4*(i+j*width)+2];
      A[i][j]=c[4*(i+j*width)+3];
    }
}

function floodfill(x,y){
	x=floor(x);
	y=floor(y);
  var R=[], G=[], B=[], A=[];
  var r,g,b,a;
  var pstack=[];
  var p, X, Y, Z, left, right;
  copyImageData(R,G,B,A);
  r=R[x][y];
  g=G[x][y];
  b=B[x][y];
  a=A[x][y];
  save();
  linewidth(0);
  color(0,0,0,0);
  pstack.push([x,y]);
  while (p=pstack.pop()){
    X=p[0];
    Y=p[1];
    Z=Y;
    while (Z>=0 && R[X][Z]==r && G[X][Z]==g && B[X][Z]==b && A[X][Z]==a)
      Z--;
    Z++;
    Y=Z;
    left=false;
    right=false;
    while (Y<height && R[X][Y]==r && G[X][Y]==g && B[X][Y]==b && A[X][Y]==a)
    {
      R[X][Y]=-1;
      if (X-1>=0 && R[X-1][Y]==r && G[X-1][Y]==g && 
          B[X-1][Y]==b && A[X-1][Y]==a)
      {
        if (!left){
            pstack.push([X-1, Y]);
            left=true;
        }
      }
      else 
        left=false;
      if (X+1<width && R[X+1][Y]==r && G[X+1][Y]==g && 
          B[X+1][Y]==b && A[X+1][Y]==a)
      {
        if (!right){
          pstack.push([X+1, Y]);
          right=true;
        }
      }
      else
        right=false;
      Y++;
    }
  }
  for (i=0;i<width;i++)
    for (j=0;j<height;j++)
      if (R[i][j]==-1){
        fillrect(i,j,1,1);
      }
  restore();
}

//not really used for class
function stroke(){
	theCanvas.stroke();
}
function beginpath(){
	theCanvas.beginPath();
}
function beginPath(){
	theCanvas.beginPath();
}
function moveto(x,y){
	theCanvas.moveTo(x,y);
}
function moveTo(x,y){
	theCanvas.moveTo(x,y);
}
function lineto(x,y){
	theCanvas.lineTo(x,y);
}
function lineTo(x,y){
	theCanvas.lineTo(x,y);
}
function arcto(x1,y1,x2,y2,r){
	theCanvas.arcTo(x1,y1,x2,y2,r);
}
function clip(){
	theCanvas.clip();
}
function drawImage(i, x, y, w, h, r){
	if (arguments.length<6)
		r=0;
	save();
	translate(x,y);
	rotate(r);
	translate(-w/2, -h/2);
	theCanvas.drawImage(i, 0,0,w,h)
	restore();
}
// end of graphics functions ----------------------------------------------------------------------------------------------------------------


//Running functions --------------------------------------------------------------------------------------------------------------------------
function setup(){}
function draw(){}
function redraw(){}
CONTINUELOOPING=false;
function loop(){
	CONTINUELOOPING=true;
}
function startloop(){
	if (CONTINUELOOPING ==false){
		CONTINUELOOPING=true;
		doTheLoop();
	}
}
function stoploop(){
	CONTINUELOOPING=false;
}
function noloop(){
	CONTINUELOOPING=false;
}
var timeStep = 1;
function timestep(n){
	timeStep=n;
}

function doTheLoop(){
	draw();
	if (CONTINUELOOPING)
		setTimeout('this.doTheLoop()', timeStep);
}


// Mouse events-------------------------------------------------------------------------------------------------------------------------------
var mouseX;
var mouseY;
var mouseDown=false;

function getCoords(e) {
	if (e){
		var brect=theCanvasHandle.getBoundingClientRect();
		mouseX=e.clientX-brect.left;
		mouseY=e.clientY-brect.top;
	}	
}
function onmousedown(){}
function mouseDownFunction(e){
	//e.preventDefault();
	mouseDown=true;
	if (e.touches){
		getCoords(e.touches[0]);
	}
	else
		getCoords(e);
	onmousedown();
}
function onmouseup(){}
function mouseUpFunction(e){
	//e.preventDefault();
	mouseDown=false;
	if (e.touches)
		getCoords(e.touches[0]);
	else
		getCoords(e);
	onmouseup();
}
function onmousemove(){}
function mouseMoveFunction(e){
	e.preventDefault();
	if (e.touches)
		getCoords(e.touches[0]);
	else
		getCoords(e);
	onmousemove();
}
function onclick(){}
function mouseClickFunction(e){
	//e.preventDefault();
	if (e.touches)
		getCoords(e.touches[0]);
	else
		getCoords(e);
	onclick();
}
function onmouseover(){}
function mouseOverFunction(e){
	getCoords(e);
	onmouseover();
}
function onmouseout(){}
function mouseOutFunction(e){
	mouseDown=false;
	onmouseout();
}
function touchEndFunction(e){
	mouseDown=false;
	if (e.touches)
		getCoords(e.touches[0]);
	else
		getCoords(e);
	onmouseup();
	onmouseout();
}
// End mouse events -------------------------------------------------------------------------------------------------------------------------

//Key events --------------------------------------------------------------------------------------------------------------

var keyDown =false;
var keyCode;
var keyChar;
var altKey = false;
var crtlKey = false;
var shiftKey = false;
var leftArrow=37;
var upArrow=38;
var rightArrow=39;
var downArrow=40;

function onkeydown(){}
function keyDownFunction(e){
	var keyASCII = parseInt(e.keyCode, 10);
	if (keyASCII == 9)
		return(false);
	else {
		keyDown=true;
		keyCode=e.keyCode;
		keyChar=String.fromCharCode(keyCode);
		altKey=e.altKey;
		ctrlKey=e.ctrlKey;
		shiftKey=e.shiftKey;
		onkeydown();
	}
}

function onkeyup(){}
function keyUpFunction(e){
	keyDown=false;
	onkeyup();
}

function onkeypress(){}
function keyPressFunction(e){
	onkeypress();
}
//End Key Events---------------------------------------------------------------------------------------------------------

// Time ----------------------------------------------------------------------------------------------------------------------------------------
function hour(){
	var h=(new Date()).getHours() % 12;
	if (h==0) h=12;
	return(h);
}
function minute(){
	return((new Date()).getMinutes());
}
function second(){
	return((new Date()).getSeconds());
}
function millisecond(){
	return((new Date()).getMilliseconds());
}
function date(){
	return((new Date()).getDate());
}
function year(){
	return((new Date()).getFullYear());
}
var dayNames=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function day(){
	return(dayNames[(new Date()).getDay()]);
}
function month(){
	return(monthNames[(new Date()).getMonth()]);
}
//end Time -------------------------------------------------------------------------------------------------------------------------------------


// Initialization -------------------------------------------------------------------------------------------------------------------------------
//Make Math object accessible without "Math." And extend Array object prototype
function cacheMath(){
	var aMathFunctions = Object.getOwnPropertyNames(Math);

	for (var i in aMathFunctions){
		window[aMathFunctions[i]] = Math[aMathFunctions[i]];
	}
	Array.prototype.random = function(){
		return(this[floor(this.length*random())]);
	}
}
function init(){
	var i, theDiv;
	cacheMath();
	//If interactive, set up interface handles
	if ((typeof(EDITOR) != 'undefined') && (EDITOR ==1)){
		theName = document.getElementById('name');	
		theLoadDiv = document.getElementById('loadDiv');	
		document.onkeydown = keyDownFunction;
	}
	//Set up spork div
	theDiv=document.getElementById('spork');
	if ((theDiv != undefined) && (theDiv != null))
		theDiv.innerHTML="<canvas id='drawing' style='border: 1px solid black;position:relative;touch-action:none;-ms-touch-action:none;' width=400 height=400></canvas>";

	//Set up canvas
	theCanvasHandle = document.getElementById('drawing');
	if ((theCanvasHandle != undefined) && (theCanvasHandle != null)){
	if (theCanvasHandle.getContext) 
	       	theCanvas = theCanvasHandle.getContext("2d");
	width=theCanvasHandle.width;
	height=theCanvasHandle.height;
	
	resetTransform();
	mouseX=-1;
	mouseY=-1;
	fillcolor('black');
	color('black');
	linewidth(1);
	theCanvas.lineCap='round';
	theCanvas.lineJoin='round';
	theCanvas.font='40px Courier';

	//Set up mouse events
	theCanvasHandle.onclick=mouseClickFunction;
	theCanvasHandle.onmousedown=mouseDownFunction;
	theCanvasHandle.onmouseup=mouseUpFunction;
	theCanvasHandle.onmouseover=mouseOverFunction;
	theCanvasHandle.onmousemove=mouseMoveFunction;
	theCanvasHandle.onmouseout=mouseOutFunction;
	
	keyDown=false;
	keyCode=-1;
	keyChar=' ';
	altKey=false;
	ctrlKey=false;
	shiftKey=false;

	document.onkeydown=keyDownFunction;
	document.onkeyup=keyUpFunction;
	document.onkeypress=keyPressFunction;
	
	theCanvasHandle.addEventListener('touchstart', mouseDownFunction, false);
	theCanvasHandle.addEventListener('touchend', mouseUpFunction, false);
	theCanvasHandle.addEventListener('touchmove', mouseMoveFunction, false);
	}

	if ((typeof(EDITOR) === 'undefined') || (EDITOR==0)){
		setup();
		draw();
		if (CONTINUELOOPING)
			doTheLoop();
	}
}
//set onload function
window.onload=function(){init();}
//End Initialazation ---------------------------------------------------------------------------------------------------------------------------


function print(s){
	var printWindow = window.open();
	printWindow.document.write(s);
}

//--------------------------------------------------------------------------------------------------------------------------------------
function startover(){
	stoploop();
	size(width,height);
	setup();
	draw();
	if (CONTINUELOOPING)
		doTheLoop();
}
function fillContainer(){
	window.onresize=function(){startover();}
	var tobj =document.getElementById('spork'); 
	size(tobj.offsetWidth ||  tobj.clientWidth, tobj.offsetHeight || tobj.clientHeight);
}

//noise stuff-------------------------------------------------------------------------------
var noiseSeed;
var noiseValues;
var noiseGridSize;

function flattenNoiseEdges(){
	var n=noiseGridSize;
	var x,y,z;
	for (x=0;x<=n;x++)
		for (y=0;y<=n;y++)
			for (z=0;z<=n;z++)
				if ((x==0) || (y==0) || (x==n) || (y==n))
					noiseValues[x][y][z]=0;	
}
function setupNoise(n){
	var i,j,k;
	if (arguments.length==0)
		n=100;
	noiseSeed=0;
	noiseValues=[];
	for (i=0;i<=n;i++){
		noiseValues[i]=[];
		for (j=0;j<=n;j++){
			noiseValues[i][j]=[];
			for (k=0;k<=n;k++){
				noiseValues[i][j][k]=2*random()-1;
			}
		}
	}
	for (i=0;i<=n;i++)
		for (j=0;j<=n;j++){
			noiseValues[n][i][j]=noiseValues[0][i][j];
			noiseValues[i][n][j]=noiseValues[i][0][j];
			noiseValues[i][j][n]=noiseValues[i][j][0];
		}
	noiseGridSize=n;
}
function noise(x, y, z){
	if (arguments.length==0){
		x=noiseSeed;
		y=0;
		z=0;
		noiseSeed = (noiseSeed + 0.01)%1;
	}
	else if (arguments.length==1){
		y=0;
		z=0;
	}
	else if (arguments.length==2){
		z=0;
	}
	x=(x%1)*noiseGridSize;
	y=(y%1)*noiseGridSize;
	z=(z%1)*noiseGridSize;
	var X = floor(x);
	var Y = floor(y);
	var Z = floor(z);
	var tx = x%1;
	var ty = y%1;
	var tz = z%1;
	
	tx=3*tx*tx-2*tx*tx*tx;
	ty=3*ty*ty-2*ty*ty*ty;
	tz=3*tz*tz-2*tz*tz*tz;
	
	var c00=noiseValues[X][Y][Z]*(1-tx)+noiseValues[X+1][Y][Z]*tx;
	var c10=noiseValues[X][Y+1][Z]*(1-tx)+noiseValues[X+1][Y+1][Z]*tx;
	var c01=noiseValues[X][Y][Z+1]*(1-tx)+noiseValues[X+1][Y][Z+1]*tx;
	var c11=noiseValues[X][Y+1][Z+1]*(1-tx)+noiseValues[X+1][Y+1][Z+1]*tx;

	var c0=c00*(1-ty)+c10*ty;
	var c1=c01*(1-ty)+c11*ty;
	
	return(c0*(1-tz)+c1*tz);
}
//---------------------------------------------------------------------------------------------
function COS(x){
  return(cos(x*pi/180));
}
function SIN(x){
  return(sin(x*pi/180));
}
//save canvas
function canvasToImg(imageID){
	var image=theCanvasHandle.toDataURL("image/png");
	imageID.src=image;
}    
function canvasToNewImg(){
	var newImage = document.createElement('img');
	canvasToImg(newImage);
	document.body.appendChild(newImage);
}