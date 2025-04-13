// storage --------------------------------------------------------------------------------------------------------------------------------
var storedProgram = new Array();
var storedName = new Array();


function backup(){
	var fileName = 'SNOW|backup';
	localStorage[fileName]=latexEditor.value;	
}
function saveCode(){
	var fileName = 'SNOW|'+theName.value;
	if (localStorage[fileName] != undefined){
		if (confirm("Overwrite "+theName.value+"?"))
			localStorage[fileName]=latexEditor.value;
	}
	else 
		localStorage[fileName]=latexEditor.value;
}
function display(i){
	latexEditor.value=storedProgram[i];
	theName.value= storedName[i];
//	theLoadDiv.innerHTML ='';
	theLoadDiv.style.display='none';
}
function append(i){
	latexEditor.value=latexEditor.value+'\r'+storedProgram[i];
	theName.value= storedName[i];
//	theLoadDiv.innerHTML ='';
	theLoadDiv.style.display='none';
}
function deleteSNOW(i){
	localStorage.removeItem('SNOW|'+storedName[i]);
//	theLoadDiv.innerHTML ='';
	theLoadDiv.style.display='none';
}
function loadCode(){
//	theCode.value = localStorage['runCode'];

	var l = localStorage.length;
	var j, key, splitKey, k;
	k=0;
	for (j=0;j<l;j++){
		key=localStorage.key(j);
		splitKey = key.split('|');
		if ((splitKey[0] == 'SNOW')){
			storedName[k]=splitKey[1];
			storedProgram[k]=localStorage[key];
			k++;
		}
	}
	if (k==0)
		theLoadDiv.innerHTML = '<button onclick=\'theLoadDiv.style.display=\"none\";\'>Cancel</button><br>No programs were found.';
	else{
		var outputString="<button onclick='theLoadDiv.style.display=\"none\";'>Cancel</button><ul>";
		for (j=0;j<k;j++)
			outputString+="<li>"+storedName[j]+" <a class='menu' href='javascript:display("+j+");'>Replace</a> or <a class='menu' href='javascript:append("+j+");'>Append</a> or <a class='menu' href='javascript:deleteSNOW("+j+");'>Delete</a>";
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
		if ((splitKey[0] == 'SNOW')){
			storedName[k]=splitKey[1];
			storedProgram[k]=localStorage[key];
			k++;
		}
	}
	if (k==0)
		theLoadDiv.innerHTML = '<button onclick=\'theLoadDiv.style.display=\"none\";\'>Cancel</button><br>No programs were found.';
	else{
		var outputString="<button onclick='theLoadDiv.style.display=\"none\";'>Cancel</button><br>";
		for (j=0;j<k;j++)
			outputString+="%%%"+storedName[j]+"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%<pre>"+storedProgram[j]+"</pre>";
		theLoadDiv.innerHTML=outputString;
	}
	theLoadDiv.style.display='block';
	
}
// end storage ---------------------------------------------------------------------------------------------------------------------------