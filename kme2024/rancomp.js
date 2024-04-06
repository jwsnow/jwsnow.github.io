//Random stuff-------------------------------------------------------
var RNGMOD=Math.pow(2,32);
var RNGSEED=0;

function RNG(){
	RNGSEED=(RNGSEED*1664525 + 1013904223)%RNGMOD;
  	return(RNGSEED/RNGMOD);
}
//----------------------------------------------------------------------------

//Functions for random composition
function MUL(x,y){
	return(x*y);
}
function P1(x,y){
	return(x);
}
function P2(x,y){
	return(y)
}
function SINPI(x,y){
	return(sin(x*pi));
}
function COSPI(x,y){
	return(cos(x*pi));
}
function SIN2PI(x,y){
	return(sin(2*x*pi));
}
function COS2PI(x,y){
	return(cos(2*x*pi));
}
function SIN3PI(x,y){
	return(sin(3*x*pi));
}
function COS3PI(x,y){
	return(cos(3*x*pi));
}
function CUBE(x,y){
	return(x*x*x);
}
function SINXXYY(x,y){
	return(sin(pi*(x*x+y*y)));
}
function SINXXXYYY(x,y){
	return(sin(pi*(x*x*x+y*y*y)));
}
function SQUARE(x,y){
	return(x*x);
}
function AVG(x,y){
	return((x+y)/2);
}
function NOISE(x,y){
	 var r;

		r=noise((x+1)/2,(y+1)/2);
//		r=noise(abs(x), abs(y));
	return(r);
		

}
function INV2X(x,y){
	if ((x==0))
		return(0);
	else if (x>0)
		return(1-x);
	else
		return(-1-x);
}
function INV2Y(x,y){
	if ((y==0))
		return(0)
	else if (y>0)
		return(1-y);
	else
		return(-1-y);
}
var theFunctions=['P1','P2','MUL', 'SINPI', 'COSPI','CUBE','SINXXYY','max','min','SIN2PI','COS2PI','AVG','NOISE'];

function randomFunction(n){
	var r,s,t,u;
	if (n==1){
		if (random()<0.5)
			r='x';//r='P1(x,y)'
		else
			r='y';//r='P2(x,y)';
	}
	else{
		s=randomFunction(n-1);
		t=randomFunction(n-1);
		u=theFunctions.random();
		if (u=='P1')
			r=s;
		else if (u=='P2')
			r=t;
		else	
			r=u+'('+s+','+t+')';
	}
	return(r);
}