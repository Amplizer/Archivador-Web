if(!window['ve_lang']) window['ve_lang'] = [];
let lang = String(document.currentScript.src).split("."); lang.pop();
lang = lang.join(".");
if(window['ve_lang'][lang]){
	window['ve_lang'][lang] = {
		"searchElement" : "Search elements"
	}
}