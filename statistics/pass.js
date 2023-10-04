function toAlpha(s){
	var aValue = "a".charCodeAt(0);
	var l = s.length;
	var i,a,b,c;
	var r = '';
	for (i=0;i<l;i++){
		c=s.charCodeAt(i);
		a=c%16;
		b=(c-a)/16;
		r+=String.fromCharCode(aValue+a)+String.fromCharCode(aValue+b);
		}
	return(r);
	}
function fromAlpha(s){
	var aValue = "a".charCodeAt(0);
	var l = s.length;
	var i,a,b,c;
	var r = '';
	for (i=0;i<l;i+=2){
		a=s.charCodeAt(i)-aValue;
		b=s.charCodeAt(i+1)-aValue;
		c=a+16*b;
		r+=String.fromCharCode(c);
		}
	return(r);
	}
function atbash(plaintext){
	var aValue = "a".charCodeAt(0);
	var ciphertext="";
	plaintext=plaintext.toLowerCase();
	for (i=0;i<plaintext.length;i++)
		ciphertext += String.fromCharCode(aValue+(25-(plaintext.charCodeAt(i)-aValue)));
	return ciphertext;
	}
function ivig(instring, key){
	var k = key.length;
	var n = instring.length;
	var outstring='';
	var i;
	for (i=0;i<n;i++)
		outstring+=String.fromCharCode( key.charCodeAt(i % k) - instring.charCodeAt(i));
	return outstring;
	}
function getPassword(address){
	var aValue = "a".charCodeAt(0);
	var aparts = address.toLowerCase().split('@');
	var firstLast = aparts[0].split('.');
	var first = toAlpha(firstLast[0]);
	var last = toAlpha(firstLast[1]);
	var n1 = first.length;
	var n2 = last.length;
	var base = 'nnxodofn';
	var mix = '';
	for (i=0;i<8;i++)
		mix += String.fromCharCode(aValue+(( (first.charCodeAt(i%n1) + last.charCodeAt(i%n2) + base.charCodeAt(i) - 3*aValue) )% 26 ));
	return(mix);
	}
