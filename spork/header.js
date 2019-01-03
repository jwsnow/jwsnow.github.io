function showHeader(){
	document.write('\
<div id="masterDiv">\
<div id="topNavDiv"> <div id="topNavDivContent">\
	  <a href="http://jwsnow.com"><span class="navButton" id="jwsButton">jwsnow.com</span></a>\
	| <a href="index.html"><span class="navButton" id="homeButton">spork</span></a>\
	| <a href="editor.html"><span class="navButton" id="editorButton">editor</span></a>\
</div></div>\
<div id="mainContentDiv">	\
	');
}

function writeShortHeader(){
	document.write('\
<div id="masterDiv">\
<div id="topNavDiv"> <div id="topNavDivContent">\
</div></div>\
<div id="mainContentDiv">	\
	');	
}
function showFooter(){
	document.write('</div><div id="bottomNavDiv"> </div></div>');
}