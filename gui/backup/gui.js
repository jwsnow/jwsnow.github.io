		var mouseX=0;
		var mouseY=0;
		var offsetX=0;
		var offsetY=0;
		var mouseDown=false;
		var draggableDivs;
		var handles;
		var resizers;
		var closers;
		var dragging=false;
		var resizing=false;
		var divToDrag;
		var N;
		var maxZ=0;
		var icons;
		
		function getCoords(e){
			mouseX=e.clientX;
			mouseY=e.clientY;
		}

		function mouseDownFunction (e){
			e.preventDefault();
			t=e.target;
			mouseDown=true;
			if (e.touches)
				getCoords(e.touches[0]);
			else
				getCoords(e);
			divToDrag = document.getElementById(t.dataset.container);
			var brect =  divToDrag.getBoundingClientRect();
			offsetX=mouseX-brect.left;
			offsetY=mouseY-brect.top;
			dragging=true;
		}
		function mouseDownResizeFunction(e){
			e.preventDefault();
			t=e.target;
			mouseDown=true;
			if (e.touches)
				getCoords(e.touches[0]);
			else
				getCoords(e);
			divToDrag = document.getElementById(t.dataset.container);
			var brect =  divToDrag.getBoundingClientRect();
			offsetX=brect.right-mouseX;
			offsetY=brect.bottom-mouseY;
			resizing=true;		
		}
		function mouseUpFunction(e){
			mouseDown=false;
			dragging=false;
			resizing=false;
		}
		
		function movingFunction(e){
			var brect;
			if (mouseDown){
				if (e.touches)
					getCoords(e.touches[0]);
				else
					getCoords(e);
				if (dragging){
					if (mouseY <= 0){
						mouseUpFunction();
						divToDrag.style.top='0px';
						divToDrag.style.bottom='0px';
						divToDrag.style.left='0px';
						divToDrag.style.right='0px';
						divToDrag.style.width='100%';
						divToDrag.style.height='100%';
					}
					else if (mouseX <= 0){
						mouseUpFunction();
						divToDrag.style.top='0px';
						divToDrag.style.bottom='0px';
						divToDrag.style.left='0px';
						divToDrag.style.right='50%';
						divToDrag.style.width='50%';
						divToDrag.style.height='100%';
					}
					else{
						if (mouseX>=window.innerWidth-5){
							mouseUpFunction();
							divToDrag.style.top='0px';
							divToDrag.style.bottom='0px';
							divToDrag.style.left='50%';
							divToDrag.style.right='0px';
							divToDrag.style.width='50%';
							divToDrag.style.height='100%';
						}
						else if (mouseY>=window.innerHeight-5){
							mouseUpFunction();
							divToDrag.style.top='90%';
						}
						else{
							divToDrag.style.top=(mouseY-offsetY)+'px';
							divToDrag.style.left=(mouseX-offsetX)+'px';
						}
					}
				}
				else if (resizing){
					brect =  divToDrag.getBoundingClientRect();
					divToDrag.style.height=(mouseY-brect.top+offsetY)+'px';
					divToDrag.style.width=(mouseX-brect.left+offsetX)+'px';
				}
			}
		}

		function focusOn(e){
			var c;
			if (e.target.dataset.container != undefined)
				c=document.getElementById(e.target.dataset.container);
			else
				c=e.target;
			c.style.zIndex=++maxZ;
		}
		function clickClose(e){
			t=e.target;
			var divToClose=document.getElementById(t.dataset.container);
			divToClose.style.display='none';
			mouseDown=false;
			dragging=false;
			resizing=false;
		}
		function showWindow(e){
			var d = document.getElementById(e.target.dataset.target);
			d.style.display='block';
			d.style.zIndex=++maxZ;
		}
		function showWindowById(theID){
			var d = document.getElementById(theID);
			d.style.display='block';
			d.style.zIndex=++maxZ;			
		}
		window.onload = function(){
			var temp,temp2,l,t;
			document.onmouseup = mouseUpFunction;
			document.ontouchend =mouseUpFunction;
			document.onmousemove=movingFunction;
			document.ontouchmove=movingFunction;
			
			draggableDivs = document.getElementsByClassName('draggable');
			icons = document.getElementsByClassName('icon');
			l=draggableDivs.length;
			for (i=0;i<l;i++){
					draggableDivs[i].onmousedown = focusOn;
					draggableDivs[i].ontouchstart = focusOn;
					temp=draggableDivs[i].innerHTML;
					temp2="<div class='closer' data-container='"+draggableDivs[i].id+"'><button class='closerButton' data-container='"+draggableDivs[i].id+"'>X</button></div><div class='handle' data-container='"+draggableDivs[i].id+"'>";
					if (draggableDivs[i].dataset.title!=undefined)
						temp2+="&nbsp;"+draggableDivs[i].dataset.title;
					temp2+="</div><div class='content'  data-container='"+draggableDivs[i].id+"'>"+temp+"</div><div class='resizer'  data-container='"+draggableDivs[i].id+"'></div>";
					draggableDivs[i].innerHTML=temp2;
			}
			handles = document.getElementsByClassName('handle'); 
			resizers = document.getElementsByClassName('resizer');
			closers = document.getElementsByClassName('closerButton');
			for (i in handles){
				handles[i].onmousedown = mouseDownFunction;
				handles[i].ontouchstart = mouseDownFunction;
			}
			for (i in resizers){
				resizers[i].onmousedown = mouseDownResizeFunction;
				resizers[i].ontouchstart = mouseDownResizeFunction;
			}
			for (i in closers){
				closers[i].onclick = clickClose;
			}
			for (i in icons){
				icons[i].onclick=showWindow;
				if (icons[i].dataset != undefined){
					t=document.getElementById(icons[i].dataset.target);
					t.style.display='none';
				}
			}
		}

