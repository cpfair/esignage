
$(document).ready(function(){
		
	LoadConfig(UISyncState);
	
	$("#emergMsg").bind("keypress",function(e){EnterHandler(e,SetEmerg);});
	$("#messageBarMsg").bind("keypress",function(e){EnterHandler(e,SetMessageBar);});
	
	$("#imgSelect").change(UIPreviewImage);
	UIPreviewImage();
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

function UIPreviewImage(){
	$("#previewImg").attr("src",$("#imgSelect").val());
}

function UISetConfig(k,v){
	
	$("#loadingModal").show();
	var res=SetConfig(k,v,UIFinishedLoading);
	UISyncState();
	return res;
}

function UIFinishedLoading(){
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

	UIToggle(GetConfig("MessageBar"),"btnEnableMsgBar","btnDisableMsgBar");
	
	UIToggle(GetConfig("MessageBarBottom"),"msgBarBottom","msgBarTop");
	
	$("#ovvrGroup input").removeClass("active");
	$("#btnProfile"+GetConfig("EmergProfile")).addClass("active");
	UIToggle(GetConfig("Emerg"),"btnEnableEmerg","btnDisableEmerg");
}