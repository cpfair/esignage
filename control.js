$(document).ready(function(){
	//$("#imgSelect").change(SetImage);
		
	LoadConfig(UISyncState);
	
	$("#emergMsg").bind("keypress",function(e){EnterHandler(e,SetEmerg);});
	$("#messageBarMsg").bind("keypress",function(e){EnterHandler(e,SetMessageBar);});
	
});
function EnterHandler(e,handler){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { //Enter keycode
		handler();
	}
}
function SetImage(){
	UISetConfig("Src",$("#imgSelect").val());
}

function SetMessageBar(){
	UISetConfig("MessageBarText",$("#messageBarMsg").val());
	UISetConfig("MessageBar",true);
}

function SetEmerg(){
	UISetConfig("EmergText",$("#emergMsg").val());
	UISetConfig("Emerg",true);
}

function UISetConfig(k,v){
	$("#container").fadeTo(300,0.25,function(){UISyncState();});
	$("#loadingModal").show();
	return SetConfig(k,v,UIFinishedLoading);
}

function UIFinishedLoading(){
	$("#container").fadeTo(300,1,function(){

	});
	
	$("#loadingModal").hide();
}

function UIToggle(bool,idOn,idOff){
	if (bool){
		$("#"+idOn).addClass("active");
		$("#"+idOff).removeClass("active");
	} else {
		$("#"+idOff).addClass("active");
		$("#"+idOn).removeClass("active");
	}
}
function UISyncState(){
	
	if (GetConfig("Black")){
		$("#btnOff").addClass("active");
		$("#btnOn").removeClass("active");
	} else {
		$("#btnOn").addClass("active");
		$("#btnOff").removeClass("active");
	}
	
	UIToggle(GetConfig("Snow"),"btnSnow","btnNoSnow");
	
	UIToggle(GetConfig("MessageBarBottom"),"msgBarBottom","msgBarTop");
	
	$("#ovvrGroup input").removeClass("active");
	$("#btnProfile"+GetConfig("EmergProfile")).addClass("active");

}