function showhidelinks(){
	if (links.style.display=='block')
		links.style.display='none';
	else
		links.style.display='block';
}

function writeHeader(){
	document.write("<div class='topnav'><img src='png/meander.png' class='navimg'> <a href='index.html'>jwsnow.com</a><button class='bars' onclick='showhidelinks();'><hr><hr><hr></button></div><div id='links' class='links'><ul class='linklist'><li><a href='art.html'>Art</a></li><li><a href='spork/index.html'>Spork</a></li><li><a href='research.html'>Research</a></li><li><a href='calculusVideos.html'>Calculus Videos</a></li><li><a href='stuff/de.html'>DE Solver</a></li><li><a href='stuff.html'>Random Stuff</a></li><li><a href='https://drive.google.com/drive/folders/1GNSqfOb0LZS6BeAuc1tqPDZWKkPk11KT'>Mastery Grading Resources</a></li><li><a href='index.html'>Home</a></li></ul></div>");
}

function writeFooter(){}