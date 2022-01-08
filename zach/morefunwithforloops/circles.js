function alexis(X,Y,R){
  save();
  translate(X,Y);
  scale(R/200);
  color('white');
  fillcolor('white');
  circle(0,0,200);
  fill();
    var angle;
    for(angle=0;angle<360;angle=angle+20){
      save();
      rotate(angle);
      line(0,0,0,200);
      triangle(0,200,10,185,-10,185);
      fillcolor('blue');
      fill();
      restore();
    }
    circle(0,0,150);
    fillcolor('red');
    fill();
    var x;
    for(x=0;x<360;x=x+20){
      save();
      rotate(x);
      circle(0,150,20);
      fillcolor('orange');
      fill();
      circle(0,150,10);
      fillcolor('yellow');
      fill();
      restore();
    }
    var y;
    for(y=0;y<360;y=y+20){
      save();
    rotate(y);
    rect(25,75,50,25);
    fillcolor('blue');
    fill();
    restore();
    }
    var z;
    for(z=0;z<360;z=z+20){
      save();
      rotate(z);
      ellipse(55,35,10,5);
      fillcolor('orange');
      fill();
      restore();
    }
    var a;
    for(a=0;a<360;a=a+20){
      save();
      circle(0,0,50);
      fillcolor('yellow');
      fill();
      restore();
    }
    var b;
    for(b=0;b<360;b=b+20){
      save();
      rotate(b);
      triangle(0,15,5,40,-5,40);
      fillcolor('black');
      fill();
      restore();
    }
    circle(0,0,10);
    fillcolor('blue');
    fill();
  restore();
  }
//================================================================	
function megan(X,Y,R){
  save();
	    translate(X,Y);
  scale(R/200);
  color('white');
  fillcolor('white');
  circle(0,0,180);
  fill();

    //OneRed
    var a

        for(d=180;d>0;d=d-10){

          for(a=360;a>0;a=a-10){
          save();
       		rotate(a);
            color("red");
      		circle(170,0,10);
            fillcolor("red");
            fill();
      	  restore();
      	  }
        }

    //OneBlack
    var a

        for(d=180;d>0;d=d-10){

          for(a=360;a>0;a=a-20){
          save();
       		rotate(a);
            color("black");
      		circle(170,0,20);
            fillcolor("black");
            fill();
      	  restore();
      	  }
        }

    //lines
    var a

        for(d=180;d>0;d=d-10){

          for(a=360;a>0;a=a-10){
          save();
       		rotate(a);
            color("black");
      		line(0,0,0,158);
      	  restore();
      	  }
        }

    //TwoRed
    var a

        for(d=180;d>0;d=d-10){

          for(a=360;a>0;a=a-10){
          save();
       		rotate(a);
            color("red");
      		circle(135,0,10);
            fillcolor("red");
            fill();
      	  restore();
      	  }
        }

    //ThreeBlack
    var a

        for(d=180;d>0;d=d-10){

          for(a=360;a>0;a=a-10){
          save();
       		rotate(a);
            color("black");
            triangle(0,120,10,90,-10,90);
            fillcolor("black");
            fill();
      	  restore();
      	  }
        }

    var angle;

      for (angle=0;angle<360;angle=angle+20){

        save();
          rotate(angle);
          line(0,0,0,180);
          triangle(0,166,20,185,-20,185);
          fillcolor("black");
          fill();
        restore();
      }

    //FourRed
     var a

        for(d=180;d>0;d=d-10){

          for(a=360;a>0;a=a-10){
          save();
       		rotate(a);
            color("red");
      		circle(70,0,5);
            fillcolor("red");
            fill();
      	  restore();
      	  }
        }

    //FiveBlack
    var a

        for(d=180;d>0;d=d-10){

          for(a=360;a>0;a=a-10){
          save();
            rotate(a);
            color("black");
      		triangle(0,40,5,50,-5,50);
            fillcolor("black");
            fill();
      	  restore();
      	  }
        }

    circle(0,0,20);
    color("red");
    fillcolor("red");
    fill();
restore();
}
//===========================================================================
  function corrianne(x,y,r){
  save();
  translate(x,y);
  scale(r/200);
    color('white');
    fillcolor('white');
    circle(0,0,197);
    fill();
  //
  var c;
    for(c=0;c<=360;c=c+16){
      save();
      rotate(c);
      color ("navy")
      circle(5,5,1);
      fillcolor("white");
      fill();
      restore();
    }
   for (c=0;c<=360;c=c+1){
     save();
     rotate(c);
     color("mediumturquoise");
     line(10,10,15,15);
     restore();
}
  for (c=0;c<=360;c=c+1){
     save();
     rotate(c);
     color("greenyellow");
     circle(15,15,4);
     fillcolor("greenyellow")
     fill();
     restore();
}
for (c=0;c<=360;c=c+10){
    save();
    rotate(c);
    color("navy");
    triangle(20,20,20,30,30,30);
    restore();
}
for (c=0;c<=360;c=c+1){
    save();
    rotate(c);
    color("darkturquoise");
    circle(35,35,1);
    restore();
}
for (c=0;c<=360;c=c+10){
    save();
    rotate(c);
    color("lightsteelblue");
    circle(42,42,5);
    restore();
}
for (c=0;c<=360;c=c+1){
    save();
    rotate(c);
    color("lightseagreen");
    line(47,47,55,55);
    restore();
}
for (c=0;c<=360;c=c+5){
    save();
    rotate(c);
    color('lime');
    line(58,58,65,65);
    restore();
}
for (c=0;c<=360;c=c+10){
    save();
    rotate(c);
    color('midnightblue');
    circle(75,75,10);
    fillcolor('midnightblue');
    fill();
    restore();
}
for (c=0;c<=360;c=c+0.9){
    save();
    rotate(c);
    color('aquamarine');
    circle(90,90,10)
    restore();
}
for (c=0;c<=360;c=c+10){
    save();
    rotate(c);
    color('lawngreen');
    triangle(120,97,97,120,97,97);
    fillcolor('lawngreen');
    fill();
    restore();
}
for (c=0;c<=360;c=c+1){
    save();
    rotate(c);
    color("cyan");
    line(110,110,130,130);
    restore();
}
for (c=0;c<=360;c=c+5){
    save();
    rotate(c);
    color('turquoise');
    ellipse(135,135,4,9);
    fillcolor('turquoise');
    fill();
    restore();
}

//
restore();
}
//========================================================================    
  function circlepattern(x,y,r){
    save();
    translate(x,y);
    scale(r/200);
     circle(0,0,180);
      fillcolor('black');
      fill();
     var a;
  //Orange triangles
    for (a=0;a<360;a=a+10){
      save();
      rotate(a);
      color('yellow');
      fillcolor('yellow');
      triangle(180,0,165,10,175,-10);
      fill();
       restore();
    }
    //Orange circle
    save();
    color('orange');
    linewidth(5);
    circle(0,0,160);
    restore();

    //< shapes
    for (a=0;a<360;a=a+10){
      save();
      rotate(a);
      color('red');
      line(150,5,155,0,150,-5);
       restore();
    }
     //Blue circle
    save();
    color(0,0,210);
    linewidth(3);
    circle(0,0,150);
    restore();

    //White lines
    for (a=0;a<360;a=a+10){
      save();
      rotate(a);
      color('white');
      rect(-100,-100,200,200);
       restore();
    }
     //Red rectangle
    for (a=0;a<360;a=a+22.5){
    save();
      rotate(a);
    color(0,0,100);
    rect(-70,-70,140,140);
      fillcolor(0,0,100);
      fill();
    restore();
    }

    //Circle
     save();
    color('orange');
    linewidth(1);
    circle(0,0,40);
    restore();

    //Circle
     save();
    color('orange');
    linewidth(2);
    circle(0,0,45);
    restore();


    //Circle
     save();
    color('orange');
    linewidth(3);
    circle(0,0,50);
    restore();


    //Circle
     save();
    color('orange');
    linewidth(4);
    circle(0,0,55);
    restore();


    //Circle
     save();
    color('orange');
    linewidth(5);
    circle(0,0,60);
    restore();

   //Red Lines
    for (a=0;a<360;a=a+10){
      save();
      rotate(a);
      color('red');
      rect(70,2,10,4);
      fillcolor('red');
      fill();
       restore();
    }
    restore();
  }
  function marissa (x,y,r){
     circlepattern(x,y,r);
     circlepattern(x,y,r/4);
     circlepattern(x,y,r/16);

  }
  //=================================================================
   function daniel(x,y,r){
    save();
  translate(x,y);
    scale(r/200);
     
  var x

  circle(0,0,5);
  fillcolor("blue");
  fill();

  for(x=5;x<=360;x=x+5){
  save();
  linewidth(5);
  color("gray");
    fillcolor("white");
    fill();
  circle(0,0,195);
  restore();
  }

  save();
  linewidth(2.5);
  color("orange");
  circle(0,0,3);
  restore();

  save();
  linewidth(10);
  color("blue");
  circle(0,0,10);
  restore();

  save();
  linewidth(12);
  color("pink");
  circle(0,0,15);
  restore();

  save();
  linewidth(10);
  color("pink");
  circle(0,0,186);
  restore();

  for(x=0;x<=360;x=x+10){
  save();
  linewidth(2.5);
  color("orange");
  rotate(x);
  circle(0,35,10);
  restore();
  }

  for(x=0;x<=360;x=x+4){
  save();
  linewidth(3);
  color("blue");
  rotate(x);
  line(45,25,45,50);
  restore();
  }

  for(x=0;x<=360;x=x+30){
  save();
  linewidth(6);
  color("darkorange");
    fillcolor("blue");
  rotate(x);
  circle(0,84,11);
    fill();
  restore();
  }

  for(x=0;x<=360;x=x+30){
  save();
  linewidth(7);
  color("darkorange");
    fillcolor("blue");
  rotate(x);
  triangle(54,54,70,70,70,70);
    fill();
  restore();
  }

  save();
  linewidth(2);
  color("gray");
  circle(0,0,70);
  restore();

  save();
  linewidth(5);
  color("gray");
  circle(0,0,108);
  restore();

  for(x=0;x<=360;x=x+10){
  save();
  linewidth(6);
  color("orange");
      fillcolor("blue");
  rotate(x);
  circle(110,95,10);
    fill();
  restore();
  }

  for(x=5;x<=360;x=x+5){
  save();
  linewidth(3);
  color("blue");
  rotate(x);
  line(120,50,110,30);
  restore();
  }

  save();
  linewidth(2);
  color("gray");
  circle(0,0,70);
  restore();

  save();
  linewidth(7);
  color("orange");
  circle(0,0,175);
  restore();

  save();
  linewidth(7);
  color("blue");
  circle(0,0,165);
  restore();
    restore();
  } 
 //===============================================================
function cassie(X,Y,R){
  save();
  translate(X,Y);
  scale(R/180);
  
  var a;//variables for the angle to which we will rotate
  color('white');
  circle(0,0,180);
  fillcolor('white');
  fill();

  for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('red');
    line(150,0,180,0);
    restore();
  }
  for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('blue');
    circle(135,0,10,0);
    restore();
  }
    for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('green');
    circle(135,0,5,0);
    restore();
  }
    for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('red');
    line(110,0,120,20);
    restore();
  }

    for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('purple');
    triangle(90,40,50,95,5,80);
    restore();
  }
   for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('green');
    circle(60,0,10,0);
    restore();
  }
   for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('red');
    line(150,0,180,0);
    restore();
  }
  for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('blue');
    circle(135,0,10,0);
    restore();
  }
    for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('green');
    circle(135,0,5,0);
    restore();
  }
    for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('green');
    line(110,0,120,20);
    restore();
  }

    for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('purple');
    triangle(90,40,50,95,5,80);
    restore();
  }
   for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('red');
    circle(60,0,10,0);
    restore();
  }
  //
   for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('purple');
    line(35,0,45,0);
    restore();
  }
  for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('blue');
    circle(30,0,2,0);
    restore();
  }
    for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    color('green');
    line(15,0,18,-20);
    restore();
  }

   for (a=0;a<360;a=a+5){
    save();
    rotate(a);
    color('purple');
    circle(5,0,5,0);
    restore();
  }
  restore();
}
//=========================================================
function zachary(X,Y,R){
  save();
  
        translate(X,Y);
  scale(R/200);

  var x

  save();
  linewidth(1);
  color(0,0,0,0);
  circle(0,0,183);
  fillcolor("white");
  fill();
  restore();

  circle(0,0,10);
  fillcolor("darkblue");
  fill();

  save();
  linewidth(10);
  color("darkgreen");
  circle(0,0,20);
  restore();

  for(x=5;x<=360;x=x+10){
  save();
  linewidth(3);
  color("lightblue");
  rotate(x);
  line(20,20,width/6,5);
  restore();
  }

  for(x=5;x<=360;x=x+10){
  save();
  linewidth(3);
  color("darkblue");
  rotate(x);
  circle(0,80,10);
  restore();
  }

  for(x=5;x<=360;x=x+5){
  save();
  linewidth(3);
  color("darkgreen");
  rotate(x);
  line(110,50,100,30);
  restore();
  }
  save();
  linewidth(7);
  color("lightgreen");
  circle(0,0,97);
  restore();

  save();
  linewidth(3);
  color("lightblue");
  circle(0,0,126);
  restore();

  for(x=5;x<=360;x=x+10){
  save();
  linewidth(3);
  color("darkblue");
    fillcolor("lightgreen")
  rotate(x);
  circle(0,140,10);
    fill();
  restore();
  }

  for(x=5;x<=360;x=x+5){
  save();
  linewidth(5);
  color("darkgreen");
  rotate(x);
  line(150,100,120,100);
  restore();
  }
  restore();
      }
//============================================================================
    function javier(x,y,r){
      save();
      translate(x,y);
      scale(r/200);
      fillcolor('white');
      color('white');
      circle(0,0,195);
      fill();

      var angle,color_1,color_2, color_3, color_4;

      color_1 = "rgb(70,32,102)";
      color_2 = "rgb(255,184,95)";
      color_3 = "rgb(255,122,90)";
      color_4 = "rgb(0,170,160)";

      linewidth(2);
      color(color_1);
      fillcolor(color_1);
      circle(0,0,10);
      fill();

      for (angle=0;angle<360;angle=angle+10){
        save();
        rotate(angle);
        color(color_1);
        fillcolor(color_1);
        arc(100,0,10,0,180)
        fill();
        ellipse(150,70,20,5);
        fill();
        restore();
      }

      for (angle=0;angle<360;angle=angle+20){
        save();
        linewidth(2);
        rotate(angle);
        color(color_2);
        fillcolor(color_2);
        line(8,8,15,35,15,10);
        linewidth(5);
        circle(55,53,10);
        circle(0,0,147);
        restore();
      }

      for (angle=0;angle<360;angle=angle+10){
        save();
        linewidth(2);
        rotate(angle);
        color(color_3);
        fillcolor(color_3);
        circle(0,0,90);
        rotate(5);
        linewidth(4);
        line(10,90,10,120);
        linewidth(5);
        circle(0,0,183);
        line(20,183,5,195);
        line(5,183,-10,195);
        restore();
      }

      for (angle=0;angle<360;angle=angle+10){
        save();
        rotate(angle);
        color(color_4);
        fillcolor(color_4);
        line(35,55,10,50);
        circle(30,30,10);
        triangle(10,120,30,140,50,120);
        fill();
        restore();
      }
      restore();
    }
//======================================================================      
function samuel(X,Y,R){
  var x,y;

save();
  translate(X,Y);
  scale(R/200);

 //WHITE CIRCLE ON THE OUTSIDE
  	linewidth(1);
  	color("white");
  fillcolor('white');
  	circle(0,0,200);
fill();
  //Red Lines
  for(x=0; x<=360; x=x+3){
   	save();
   	rotate(x);
    linewidth(2);
    color('red');
    line(0,0,200,0);
    restore();
  }
  //Fill Circle Inside Red Lines
  linewidth(0);
  color("white");
  circle(0,0,180);
  fillcolor("white");
  fill();
  clip();

  //Blue Circle Layer
  for(x=0; x<=360; x=x+6){
    save();
    rotate(x);
    linewidth(2);
    color("blue");
    circle(170,0,9);
    restore();
  }

  //Fill Circle Inside Blue Circles
  linewidth(0);
  color("white");
  circle(0,0,160);
  fillcolor("white");
  fill();
  clip();

  //Outside Purple Solid Line
  linewidth(5);
  color("purple");
  circle(0,0,157.5);

  //Solid Green Line
  linewidth(10);
  color("green");
  circle(0,0,147.5);

  //Inside Purple Solid Line
  linewidth(5);
  color("purple");
  circle(0,0,137.5);

  //Inside Blue Circle Layer
  for(x=0; x<=360; x=x+4){
    save();
    rotate(x);
    linewidth(2);
    color("blue");
    circle(122.5,0,9);
    restore();
  }

  //Fill Circle Inside SmallBlue Circles
  linewidth(0);
  color("white");
  circle(0,0,110);
  fillcolor("white");
  fill();
  clip();

  //Inside Red Lines
  for(x=0; x<=360; x=x+5){
   	save();
   	rotate(x);
    linewidth(2);
    color('red');
    line(0,0,200,0);
    restore();
  }

  //Outer Purple Quardrilateral
  linewidth(5);
  color('purple');
  quad(83,0,0,-83,-83,0,0,83);
  fillcolor("white");
  fill();
  clip();

   // Green Quardrilateral
  linewidth(9);
  color('green');
  quad(73.5,0,0,-73.5,-73.5,0,0,73.5);
  clip();

  // Inner Purple Quardrilateral
  linewidth(5);
  color('purple');
  quad(60,0,0,-60,-60,0,0,60);
  fillcolor("white");
  fill();
  clip();

  //Most Inside Red Lines
  for(x=0; x<=360; x=x+5){
   	save();
   	rotate(x);
    linewidth(2);
    color('red');
    line(0,0,200,0);
    restore();
  }

 //Most Inside Fill Red Lines
  linewidth(0);
  color("white");
  circle(0,0,30);
  fillcolor("white");
  fill();
  clip();

 //INNER Blue Circle Layer
  for(x=0; x<=360; x=x+20){
    save();
    rotate(x);
    linewidth(2);
    color("blue");
    circle(26.5,0,3.5);
    restore();
  }

  //HOTPINK CIRCLE
  circle(0,0,20);
  fillcolor("purple");
  fill();
  restore();
} 
//=======================================================================

function kim(X,Y,R){
	    var x;
    var d;

    save();
    translate(X,Y);
  
scale(R/170);
  color('wite');
  fillcolor('white');
  circle(0,0,170);
  fill();
  //blue center cirle
     circle(0,0,30);
     fillcolor(0,0,128);
     fill();

   //green triangle lines
    save();
    for (x=50;x<width;x=x+15){
      rotate(150*x);
      color("lightgreen");
      linewidth(3);
      line(25,25,50,30,35,10);
    }
    restore();

  //inner first ring (doesn't work)
    save();
   	color("lightblue");
    	linewidth(3);
    	circle(0,0,65);
    restore();

  //inner second ring (doesn't work)
    save();
   	color("magenta");
    	linewidth(3);
   	 circle(0,0,80);
    restore();

  //yellow circles
    for (x=0;x<360;x=x+15){
      save();
      rotate(x);
      circle(120,0,10);
      color("gold");
      fillcolor("gold");
      fill();
      restore();
    }

  //outside blue circles
    for (x=0;x<360;x=x+20){
      save();
      rotate(x);
      circle(150,0,5);
      color("lightblue");
      fillcolor("lightblue");
      fill();
      restore();
    }

  //pink lines
    for (x=50;x<width;x=x+15){
    save();
    color("pink");
    rotate(x);
      linewidth(3);
    line(0,-105,0,-85);
    restore();
    }

  //outermost ring
    save();
   	color("orange");
    	linewidth(3);
    circle(0,0,170);
    restore();


    restore();

  }
//===========================================================================
  function emily(X,Y,R){
  save();
  translate(X,Y);
  scale(R/200);

  circle(0,0,200)
  fillcolor("white");
  fill();

  linewidth(10);
  color('yellow')
  circle(0,0,160)
  var a

  for (a=0;a<360;a=a+10){
    save();
    rotate(a);
    circle(150,125,9);
    fillcolor(a,0,255-a);
    fill();
    restore();

     save();
    rotate(a);
    linewidth(5);
    color('red');
    line(150,110,100,100);
    restore();

     save();
    rotate(a);
    linewidth(3);
    color('blue');
    line(120,100,75,75);
    restore();

    save();
    rotate(a);
    color('purple');
    linewidth(3);
    circle(100,80,9);
    restore();

    save();
    rotate(a);
    color('yellow');
    linewidth(3);
    circle(90,60,9);
    restore();

     save();
    rotate(a);
    circle(70,65,4);
    fillcolor(a,0,255-a);
    fill();
    restore();

     save();
    rotate(a);
    linewidth(5);
    color('red');
    line(50,30,10,10);
    restore();

     save();
    rotate(a);
    linewidth(3);
    color('blue');
    line(20,15,8,8);
    restore();

    save();
    rotate(a);
    color('purple');
    linewidth(3);
    circle(10,8,9);
    restore();


  }

  circle(0,0,10)
  fillcolor('yellow');
  fill();
  restore();
}