var WIDTH=200;
var IMAGEWIDTH=WIDTH;//1024;//4096;//1024;//Math.max(WIDTH,1024);
var R=[], G=[], B=[],A=[],D=[],T=[], TR=[], TG=[], TB=[];
var theFunctions=['P1','P2','MUL', 'SINPI', 'COSPI','CUBE','SINXXYY','max','min','SIN2PI','COS2PI','AVG','NOISE'];

var GLOBALT=1;

function getColors(P){
	var i,x,y;
	size(IMAGEWIDTH,IMAGEWIDTH);
	drawImage(P, width/2, height/2, width, height); 
	copyImageData(R,G,B,A);
	for (x=0;x<IMAGEWIDTH;x++)
	for (y=0;y<IMAGEWIDTH;y++){
		R[x][y]=R[x][y]/128-1;
		G[x][y]=G[x][y]/128-1;
		B[x][y]=B[x][y]/128-1;
	}
	size(WIDTH,WIDTH);
}

function lerp(a,b,t){
	return(t*b+(1-t)*a);
}
function lerpArray(a,x,y){
var ox=x;
var oy=y;
	var width=a.length;
	var height=a[0].length;
	var X, Y, X1, Y1;
	var a1, a2,r;
	if (x<0) x=0;
	else if (x>=width-1){
		x=width-1;
		X=width-1;
		X1=width-1;
	}
	else{
		X=floor(x);
		X1=X+1
	}
	if (y<0) y=0;
	else if (y>=height-1){
		y=height-1;
		Y=height-1;
		Y1=height-1;
	}
	else{
		Y=floor(y);
		Y1=Y+1;
	}
	x=x-X;
	y=y-Y	

	a1=lerp(a[X][Y],a[X1][Y],x);
	a2=lerp(a[X][Y1], a[X1][Y1],x);

	r=(lerp(a1,a2,y));
	return(r);
}

function IMAGER(x,y){
	var X=((x+1)/2)*IMAGEWIDTH;
	var Y=((y+1)/2)*IMAGEWIDTH;
	return(lerpArray(R, X,Y));
}
function IMAGEG(x,y){
	var X=((x+1)/2)*IMAGEWIDTH;
	var Y=((y+1)/2)*IMAGEWIDTH;
	return(lerpArray(G, X,Y));
}
function IMAGEB(x,y){
	var X=((x+1)/2)*IMAGEWIDTH;
	var Y=((y+1)/2)*IMAGEWIDTH;
	return(lerpArray(B, X,Y));
}

function generateImage(){
	var x,y,a,b,c,d,cr,cg,cb,X,Y;
	var depth=0;
	var fr1='';
	var fr2='';
	var fr='';
	function xfn(){};
	function yfn(){};	
	var theSeed=RNGSEED;
	while ((fr1.length<=10) || (fr2.length<=10)){
		theSeed=RNGSEED;
		depth=3+floor(random()*5);
		fr1=randomFunction(depth-1);
		fr2=randomFunction(depth-1);	
	}

	eval('xfn=function(x,y){ var c='+fr1+'; return(c);}');	
	eval('yfn=function(x,y){ var c='+fr2+'; return(c);}');
	setupNoise(2+floor(random()*10));
	for (a=0;a<width;a++)
		for (b=0;b<height;b++){
			x=2*a/width-1;
			y=2*b/height-1;
			t=GLOBALT;
			
			X=t*(xfn(x,y))+(1-t)*x;
			Y=t*(yfn(x,y))+(1-t)*y;
			cr=floor(255*(IMAGER(X,Y)+1)/2);
			cg=floor(255*(IMAGEG(X,Y)+1)/2);
			cb=floor(255*(IMAGEB(X,Y)+1)/2);

			fillcolor(cr,cg,cb);
			fillrect(a,b,1,1);
		}
	return(theSeed);	
}