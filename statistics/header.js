function showHeader(){
	document.write('\
<div id="masterDiv">\
<div id="topNavDiv"> <div id="topNavDivContent">\
	  <button class="navButton" id="jwshomeButton" onclick="top.location=\'http://jwsnow.com\';"> jwsnow.com </button>\
	| <button class="navButton" id="homeButton" onclick="top.location=\'index.html\';"> home </button> \
	| <button class="navButton" id="calendarButton" onclick="top.location=\'calendar.html\';"> calendar </button> \
	| <button class="navButton" id="calculatorButton" onclick="top.location=\'calc.html\';"> calculator </button> \
</div></div>\
<div id="mainContentDiv">	\
	');
}

function writeShortHeader(){
	document.write('\
<div id="masterDiv">\
<div id="topNavDiv"> <div id="topNavDivContent">math 142\
</div></div>\
<div id="mainContentDiv">	\
	');	
}
function showFooter(){
	document.write('</div><div id="bottomNavDiv"> </div><div id="banner"><img id="bannerImg" src="png/banner.png"></div></div>');
}