function SetConfig(key,val,callback){
	$.get("configset.php?key="+encodeURI(key)+"&val="+encodeURI(val),callback);
	if (ccache) ccache[key]=val;
}
var ccache;
function LoadConfig(callback){
	$.getJSON("config.json?"+(new Date()).getTime(),function(data){
		ccache=data;
		callback();
	});
}
function GetConfig(key){
	var val=ccache[key];
	if (val=="true") return true; //haxx
	if (val=="false") return false;
	return val;
}