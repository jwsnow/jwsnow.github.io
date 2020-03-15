


function applyMatrix(M,v){
	  var t=[];
	  var i,j;
	  for (i=0;i<v.length;i++)
	    t[i]=0;
	  for (i=0;i<v.length;i++)
	    for (j=0;j<v.length;j++)
	      t[i]+=M[i][j]*v[j];
	  for (i=0;i<v.length;i++)
	    v[i]=t[i];
}


//two colors

function twoColors(X){
	  var i;
	  
	  //Set up base tetrahedron
	  var x1=[1,0,0];
	  var x2=[-1,0,0];
	  //Rotate tetrahedron
	  var a=random()*2*pi;
	  var b=random()*2*pi;
	  var c=random()*2*pi;
	  var Rx=[[1,0,0],
		 [0,cos(a),-sin(a)],
		 [0,sin(a),cos(a)]];
	  
	  var Ry=[[cos(b),0,sin(b)],
		 [0,1,0],
		 [-sin(b),0,cos(b)]];
	  
	  var Rz=[[cos(c),-sin(c),0],
		 [sin(c),cos(c),0],
		 [0,0,1]];
	  applyMatrix(Rx,x1);applyMatrix(Ry,x1);applyMatrix(Rz,x1);
	  applyMatrix(Rx,x2);applyMatrix(Ry,x2);applyMatrix(Rz,x2);
	  //Convert coordinates to RGB values
	  for (i=0;i<3;i++){
		    x1[i]=floor(128*x1[i]+128);
		    x2[i]=floor(128*x2[i]+128);
	  }
	  
	  //Copy colors to return matrix
	  X[X.length]=rgb(x1[0],x1[1],x1[2]);
	  X[X.length]=rgb(x2[0],x2[1],x2[2]);
}

//three colors

function threeColors(X){
	  var i;
	  
	  //Set up base tetrahedron
	  var x1=[COS(0),SIN(0),0];
	  var x2=[COS(120),SIN(120),0];
	  var x3=[COS(240),SIN(240),0];
	  //Rotate tetrahedron
	  var a=random()*2*pi;
	  var b=random()*2*pi;
	  var c=random()*2*pi;
	  var Rx=[[1,0,0],
		 [0,cos(a),-sin(a)],
		 [0,sin(a),cos(a)]];
	  
	  var Ry=[[cos(b),0,sin(b)],
		 [0,1,0],
		 [-sin(b),0,cos(b)]];
	  
	  var Rz=[[cos(c),-sin(c),0],
		 [sin(c),cos(c),0],
		 [0,0,1]];
	  applyMatrix(Rx,x1);applyMatrix(Ry,x1);applyMatrix(Rz,x1);
	  applyMatrix(Rx,x2);applyMatrix(Ry,x2);applyMatrix(Rz,x2);
	  applyMatrix(Rx,x3);applyMatrix(Ry,x3);applyMatrix(Rz,x3);
	  //Convert coordinates to RGB values
	  for (i=0;i<3;i++){
		    x1[i]=floor(128*x1[i]+128);
		    x2[i]=floor(128*x2[i]+128);
		    x3[i]=floor(128*x3[i]+128);
	  }
	  
	  //Copy colors to return matrix
	  X[X.length]=rgb(x1[0],x1[1],x1[2]);
	  X[X.length]=rgb(x2[0],x2[1],x2[2]);
	  X[X.length]=rgb(x3[0],x3[1],x3[2]);
}

//tetracolors

function tetraColors(X){
	  var i;
	  
	  //Set up base tetrahedron
	  var l=1/sqrt(3);
	  var x1=[l,l,l];
	  var x2=[-l,-l,l];
	  var x3=[-l,l,-l];
	  var x4=[l,-l,-l]; 
	  //Rotate tetrahedron
	  var a=random()*2*pi;
	  var b=random()*2*pi;
	  var c=random()*2*pi;
	  var Rx=[[1,0,0],
		 [0,cos(a),-sin(a)],
		 [0,sin(a),cos(a)]];
	  
	  var Ry=[[cos(b),0,sin(b)],
		 [0,1,0],
		 [-sin(b),0,cos(b)]];
	  
	  var Rz=[[cos(c),-sin(c),0],
		 [sin(c),cos(c),0],
		 [0,0,1]];
	  applyMatrix(Rx,x1);applyMatrix(Ry,x1);applyMatrix(Rz,x1);
	  applyMatrix(Rx,x2);applyMatrix(Ry,x2);applyMatrix(Rz,x2);
	  applyMatrix(Rx,x3);applyMatrix(Ry,x3);applyMatrix(Rz,x3);
	  applyMatrix(Rx,x4);applyMatrix(Ry,x4);applyMatrix(Rz,x4); 
	  //Convert coordinates to RGB values
	  for (i=0;i<3;i++){
		    x1[i]=floor(128*x1[i]+128);
		    x2[i]=floor(128*x2[i]+128);
		    x3[i]=floor(128*x3[i]+128);
		    x4[i]=floor(128*x4[i]+128);
	  }
	  
	  //Copy colors to return matrix
	  X[X.length]=rgb(x1[0],x1[1],x1[2]);
	  X[X.length]=rgb(x2[0],x2[1],x2[2]);
	  X[X.length]=rgb(x3[0],x3[1],x3[2]);
	  X[X.length]=rgb(x4[0],x4[1],x4[2]);
}

//octahedron
function octaColors(X){
	  var i;
	  
	  //Set up base octahedron
	  var x1=[1,0,0];
	  var x2=[-1,0,0];
	  var x3=[0,1,0];
	  var x4=[0,-1,0];
	var x5=[0,0,1];
	var x6=[0,0,-1];
	  //Rotate tetrahedron
	  var a=random()*2*pi;
	  var b=random()*2*pi;
	  var c=random()*2*pi;
	  var Rx=[[1,0,0],
		 [0,cos(a),-sin(a)],
		 [0,sin(a),cos(a)]];
	  
	  var Ry=[[cos(b),0,sin(b)],
		 [0,1,0],
		 [-sin(b),0,cos(b)]];
	  
	  var Rz=[[cos(c),-sin(c),0],
		 [sin(c),cos(c),0],
		 [0,0,1]];
	  applyMatrix(Rx,x1);applyMatrix(Ry,x1);applyMatrix(Rz,x1);
	  applyMatrix(Rx,x2);applyMatrix(Ry,x2);applyMatrix(Rz,x2);
	  applyMatrix(Rx,x3);applyMatrix(Ry,x3);applyMatrix(Rz,x3);
	  applyMatrix(Rx,x4);applyMatrix(Ry,x4);applyMatrix(Rz,x4); 
	  applyMatrix(Rx,x5);applyMatrix(Ry,x5);applyMatrix(Rz,x5); 
	  applyMatrix(Rx,x6);applyMatrix(Ry,x6);applyMatrix(Rz,x6); 
	  //Convert coordinates to RGB values
	  for (i=0;i<3;i++){
		    x1[i]=floor(128*x1[i]+128);
		    x2[i]=floor(128*x2[i]+128);
		    x3[i]=floor(128*x3[i]+128);
		    x4[i]=floor(128*x4[i]+128);
		    x5[i]=floor(128*x5[i]+128);
		    x6[i]=floor(128*x6[i]+128);
	  }
	  
	  //Copy colors to return matrix
	  X[X.length]=rgb(x1[0],x1[1],x1[2]);
	  X[X.length]=rgb(x2[0],x2[1],x2[2]);
	  X[X.length]=rgb(x3[0],x3[1],x3[2]);
	  X[X.length]=rgb(x4[0],x4[1],x4[2]);
	  X[X.length]=rgb(x5[0],x5[1],x5[2]);
	  X[X.length]=rgb(x6[0],x6[1],x6[2]);
}


//cube
function cubeColors(X){
	  var i;
	  
	  //Set up base octahedron
	var l=1/sqrt(3);
	  var x1=[l,l,l];
	  var x2=[-l,-l,-l];
	  var x3=[l,-l,l];
	  var x4=[-l,l,-l];
	var x5=[-l,-l,l];
	var x6=[l,l,-l];
	var x7=[-l,l,l];
	var x8=[l,-l,-l];
	  //Rotate tetrahedron
	  var a=random()*2*pi;
	  var b=random()*2*pi;
	  var c=random()*2*pi;
	  var Rx=[[1,0,0],
		 [0,cos(a),-sin(a)],
		 [0,sin(a),cos(a)]];
	  
	  var Ry=[[cos(b),0,sin(b)],
		 [0,1,0],
		 [-sin(b),0,cos(b)]];
	  
	  var Rz=[[cos(c),-sin(c),0],
		 [sin(c),cos(c),0],
		 [0,0,1]];
	  applyMatrix(Rx,x1);applyMatrix(Ry,x1);applyMatrix(Rz,x1);
	  applyMatrix(Rx,x2);applyMatrix(Ry,x2);applyMatrix(Rz,x2);
	  applyMatrix(Rx,x3);applyMatrix(Ry,x3);applyMatrix(Rz,x3);
	  applyMatrix(Rx,x4);applyMatrix(Ry,x4);applyMatrix(Rz,x4); 
	  applyMatrix(Rx,x5);applyMatrix(Ry,x5);applyMatrix(Rz,x5); 
	  applyMatrix(Rx,x6);applyMatrix(Ry,x6);applyMatrix(Rz,x6); 
	  applyMatrix(Rx,x7);applyMatrix(Ry,x7);applyMatrix(Rz,x7); 
	  applyMatrix(Rx,x8);applyMatrix(Ry,x8);applyMatrix(Rz,x8); 
	  //Convert coordinates to RGB values
	  for (i=0;i<3;i++){
		    x1[i]=floor(128*x1[i]+128);
		    x2[i]=floor(128*x2[i]+128);
		    x3[i]=floor(128*x3[i]+128);
		    x4[i]=floor(128*x4[i]+128);
		    x5[i]=floor(128*x5[i]+128);
		    x6[i]=floor(128*x6[i]+128);
		    x7[i]=floor(128*x7[i]+128);
		    x8[i]=floor(128*x8[i]+128);
	  }
	  
	  //Copy colors to return matrix
	  X[X.length]=rgb(x1[0],x1[1],x1[2]);
	  X[X.length]=rgb(x2[0],x2[1],x2[2]);
	  X[X.length]=rgb(x3[0],x3[1],x3[2]);
	  X[X.length]=rgb(x4[0],x4[1],x4[2]);
	  X[X.length]=rgb(x5[0],x5[1],x5[2]);
	  X[X.length]=rgb(x6[0],x6[1],x6[2]);
	  X[X.length]=rgb(x7[0],x7[1],x7[2]);
	  X[X.length]=rgb(x8[0],x8[1],x8[2]);
}

//dodecahedron
function dodecaColors(X){
	  var i;
	  
	  //Set up base octahedron
	var l=1;
	var p=(1+sqrt(5))/2;
	
	var x1=[1/p,0,p];
	var x2=[-1/p,0,-p];
	
	var x3=[-1/p,0,p];
	var x4=[1/p,0,-p];

	var x5=[l,l,l];
	var x6=[-l,-l,-l];
	
	var x7=[l,-l,l];
	var x8=[-l,l,-l];
	
	var x9=[-l,-l,l];
	var x10=[l,l,-l];
	
	var x11=[-l,l,l];
	var x12=[l,-l,-l];
	
	var x13=[0,p,1/p];
	var x14=[0,-p,-1/p];
	
	var x15=[0,-p,1/p];
	var x16=[0,p,-1/p];
	
	var x17=[p,1/p,0];
	var x18=[-p,-1/p,0];
	
	var x19=[-p,1/p,0];
	var x20=[p,-1/p,0];
	
	//normalize
	l=sqrt(3);
	for (i=0;i<3;i++){
		x1[i]=x1[i]/l;
		x2[i]=x2[i]/l;
		x3[i]=x3[i]/l;
		x4[i]=x4[i]/l;
		x5[i]=x5[i]/l;
		x6[i]=x6[i]/l;
		x7[i]=x7[i]/l;
		x8[i]=x8[i]/l;
		x9[i]=x9[i]/l;
		x10[i]=x10[i]/l;
		x11[i]=x11[i]/l;
		x12[i]=x12[i]/l;
		x13[i]=x13[i]/l;
		x14[i]=x14[i]/l;
		x15[i]=x15[i]/l;
		x16[i]=x16[i]/l;
		x17[i]=x17[i]/l;
		x18[i]=x18[i]/l;
		x19[i]=x19[i]/l;
		x20[i]=x20[i]/l;
	}

	  //Rotate tetrahedron
	  var a=random()*2*pi;
	  var b=random()*2*pi;
	  var c=random()*2*pi;
	  var Rx=[[1,0,0],
		 [0,cos(a),-sin(a)],
		 [0,sin(a),cos(a)]];
	  
	  var Ry=[[cos(b),0,sin(b)],
		 [0,1,0],
		 [-sin(b),0,cos(b)]];
	  
	  var Rz=[[cos(c),-sin(c),0],
		 [sin(c),cos(c),0],
		 [0,0,1]];
	  applyMatrix(Rx,x1);applyMatrix(Ry,x1);applyMatrix(Rz,x1);
	  applyMatrix(Rx,x2);applyMatrix(Ry,x2);applyMatrix(Rz,x2);
	  applyMatrix(Rx,x3);applyMatrix(Ry,x3);applyMatrix(Rz,x3);
	  applyMatrix(Rx,x4);applyMatrix(Ry,x4);applyMatrix(Rz,x4); 
	  applyMatrix(Rx,x5);applyMatrix(Ry,x5);applyMatrix(Rz,x5); 
	  applyMatrix(Rx,x6);applyMatrix(Ry,x6);applyMatrix(Rz,x6); 
	  applyMatrix(Rx,x7);applyMatrix(Ry,x7);applyMatrix(Rz,x7); 
	  applyMatrix(Rx,x8);applyMatrix(Ry,x8);applyMatrix(Rz,x8); 
	  applyMatrix(Rx,x9);applyMatrix(Ry,x9);applyMatrix(Rz,x9); 
	  applyMatrix(Rx,x10);applyMatrix(Ry,x10);applyMatrix(Rz,x10); 
	  applyMatrix(Rx,x11);applyMatrix(Ry,x11);applyMatrix(Rz,x11); 
	  applyMatrix(Rx,x12);applyMatrix(Ry,x12);applyMatrix(Rz,x12); 
	  applyMatrix(Rx,x13);applyMatrix(Ry,x13);applyMatrix(Rz,x13); 
	  applyMatrix(Rx,x14);applyMatrix(Ry,x14);applyMatrix(Rz,x14); 
	  applyMatrix(Rx,x15);applyMatrix(Ry,x15);applyMatrix(Rz,x15); 
	  applyMatrix(Rx,x16);applyMatrix(Ry,x16);applyMatrix(Rz,x16); 
	  applyMatrix(Rx,x17);applyMatrix(Ry,x17);applyMatrix(Rz,x17); 
	  applyMatrix(Rx,x18);applyMatrix(Ry,x18);applyMatrix(Rz,x18); 
	  applyMatrix(Rx,x19);applyMatrix(Ry,x19);applyMatrix(Rz,x19); 
	  applyMatrix(Rx,x20);applyMatrix(Ry,x20);applyMatrix(Rz,x20); 
	  //Convert coordinates to RGB values
	  for (i=0;i<3;i++){
		    x1[i]=floor(128*x1[i]+128);
		    x2[i]=floor(128*x2[i]+128);
		    x3[i]=floor(128*x3[i]+128);
		    x4[i]=floor(128*x4[i]+128);
		    x5[i]=floor(128*x5[i]+128);
		    x6[i]=floor(128*x6[i]+128);
		    x7[i]=floor(128*x7[i]+128);
		    x8[i]=floor(128*x8[i]+128);
		    x9[i]=floor(128*x9[i]+128);
		    x10[i]=floor(128*x10[i]+128);
		    x11[i]=floor(128*x11[i]+128);
		    x12[i]=floor(128*x12[i]+128);
		    x13[i]=floor(128*x13[i]+128);
		    x14[i]=floor(128*x14[i]+128);
		    x15[i]=floor(128*x15[i]+128);
		    x16[i]=floor(128*x16[i]+128);
		    x17[i]=floor(128*x17[i]+128);
		    x18[i]=floor(128*x18[i]+128);
		    x19[i]=floor(128*x19[i]+128);
		    x20[i]=floor(128*x20[i]+128);
	  }
	  
	  //Copy colors to return matrix
	  X[X.length]=rgb(x1[0],x1[1],x1[2]);
	  X[X.length]=rgb(x2[0],x2[1],x2[2]);
	  X[X.length]=rgb(x3[0],x3[1],x3[2]);
	  X[X.length]=rgb(x4[0],x4[1],x4[2]);
	  X[X.length]=rgb(x5[0],x5[1],x5[2]);
	  X[X.length]=rgb(x6[0],x6[1],x6[2]);
	  X[X.length]=rgb(x7[0],x7[1],x7[2]);
	  X[X.length]=rgb(x8[0],x8[1],x8[2]);
	  X[X.length]=rgb(x9[0],x9[1],x9[2]);
	  X[X.length]=rgb(x10[0],x10[1],x10[2]);
	  X[X.length]=rgb(x11[0],x11[1],x11[2]);
	  X[X.length]=rgb(x12[0],x12[1],x12[2]);
	  X[X.length]=rgb(x13[0],x13[1],x13[2]);
	  X[X.length]=rgb(x14[0],x14[1],x14[2]);
	  X[X.length]=rgb(x15[0],x15[1],x15[2]);
	  X[X.length]=rgb(x16[0],x16[1],x16[2]);
	  X[X.length]=rgb(x17[0],x17[1],x17[2]);
	  X[X.length]=rgb(x18[0],x18[1],x18[2]);
	  X[X.length]=rgb(x19[0],x19[1],x19[2]);
	  X[X.length]=rgb(x20[0],x20[1],x20[2]);
}


//icosaecahedron
function icosaColors(X){
	  var i;
	  
	  //Set up base octahedron
	var l=1;
	var p=(1+sqrt(5))/2;
	
	var x1=[1,0,p];
	var x2=[-1,0,-p];
	var x3=[-1,0,p];
	var x4=[1,0,-p];
	var x5=[0,p,1];
	var x6=[0,-p,-1];
	var x7=[0,-p,1];
	var x8=[0,p,-1];
	var x9=[p,1,0];
	var x10=[-p,-1,0];
	var x11=[p,-1,0];
	var x12=[-p,1,0];
	
	//normalize
	l=sqrt(3);
	for (i=0;i<3;i++){
		x1[i]=x1[i]/l;
		x2[i]=x2[i]/l;
		x3[i]=x3[i]/l;
		x4[i]=x4[i]/l;
		x5[i]=x5[i]/l;
		x6[i]=x6[i]/l;
		x7[i]=x7[i]/l;
		x8[i]=x8[i]/l;
		x9[i]=x9[i]/l;
		x10[i]=x10[i]/l;
		x11[i]=x11[i]/l;
		x12[i]=x12[i]/l;
	}

	  //Rotate tetrahedron
	  var a=random()*2*pi;
	  var b=random()*2*pi;
	  var c=random()*2*pi;
	  var Rx=[[1,0,0],
		 [0,cos(a),-sin(a)],
		 [0,sin(a),cos(a)]];
	  
	  var Ry=[[cos(b),0,sin(b)],
		 [0,1,0],
		 [-sin(b),0,cos(b)]];
	  
	  var Rz=[[cos(c),-sin(c),0],
		 [sin(c),cos(c),0],
		 [0,0,1]];
	  applyMatrix(Rx,x1);applyMatrix(Ry,x1);applyMatrix(Rz,x1);
	  applyMatrix(Rx,x2);applyMatrix(Ry,x2);applyMatrix(Rz,x2);
	  applyMatrix(Rx,x3);applyMatrix(Ry,x3);applyMatrix(Rz,x3);
	  applyMatrix(Rx,x4);applyMatrix(Ry,x4);applyMatrix(Rz,x4); 
	  applyMatrix(Rx,x5);applyMatrix(Ry,x5);applyMatrix(Rz,x5); 
	  applyMatrix(Rx,x6);applyMatrix(Ry,x6);applyMatrix(Rz,x6); 
	  applyMatrix(Rx,x7);applyMatrix(Ry,x7);applyMatrix(Rz,x7); 
	  applyMatrix(Rx,x8);applyMatrix(Ry,x8);applyMatrix(Rz,x8); 
	  applyMatrix(Rx,x9);applyMatrix(Ry,x9);applyMatrix(Rz,x9); 
	  applyMatrix(Rx,x10);applyMatrix(Ry,x10);applyMatrix(Rz,x10); 
	  applyMatrix(Rx,x11);applyMatrix(Ry,x11);applyMatrix(Rz,x11); 
	  applyMatrix(Rx,x12);applyMatrix(Ry,x12);applyMatrix(Rz,x12); 
	  //Convert coordinates to RGB values
	  for (i=0;i<3;i++){
		    x1[i]=floor(128*x1[i]+128);
		    x2[i]=floor(128*x2[i]+128);
		    x3[i]=floor(128*x3[i]+128);
		    x4[i]=floor(128*x4[i]+128);
		    x5[i]=floor(128*x5[i]+128);
		    x6[i]=floor(128*x6[i]+128);
		    x7[i]=floor(128*x7[i]+128);
		    x8[i]=floor(128*x8[i]+128);
		    x9[i]=floor(128*x9[i]+128);
		    x10[i]=floor(128*x10[i]+128);
		    x11[i]=floor(128*x11[i]+128);
		    x12[i]=floor(128*x12[i]+128);
	  }
	  
	  //Copy colors to return matrix
	  X[X.length]=rgb(x1[0],x1[1],x1[2]);
	  X[X.length]=rgb(x2[0],x2[1],x2[2]);
	  X[X.length]=rgb(x3[0],x3[1],x3[2]);
	  X[X.length]=rgb(x4[0],x4[1],x4[2]);
	  X[X.length]=rgb(x5[0],x5[1],x5[2]);
	  X[X.length]=rgb(x6[0],x6[1],x6[2]);
	  X[X.length]=rgb(x7[0],x7[1],x7[2]);
	  X[X.length]=rgb(x8[0],x8[1],x8[2]);
	  X[X.length]=rgb(x9[0],x9[1],x9[2]);
	  X[X.length]=rgb(x10[0],x10[1],x10[2]);
	  X[X.length]=rgb(x11[0],x11[1],x11[2]);
	  X[X.length]=rgb(x12[0],x12[1],x12[2]);
}