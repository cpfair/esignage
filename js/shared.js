var Shared = {};
Shared.SetConfig=function(key,val,callback){
	$.get("configset.php?key="+encodeURI(key)+"&val="+encodeURI(val),callback);
	if (Shared.ConfigCache) Shared.ConfigCache[key]=val;
};

Shared.LoadConfig=function(callback){
	$.getJSON("config.json?"+(new Date()).getTime(),function(data){
		Shared.ConfigCache=data;
		callback();
	});
};

Shared.GetConfig=function(key){
	var val=Shared.ConfigCache[key];
	if (val=="true") return true; //haxx
	if (val=="false") return false;
	return val;
};