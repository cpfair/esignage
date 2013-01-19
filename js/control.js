var Control = {};

$(document).ready(function(){
		
	Shared.LoadConfig(Control.SyncUI);
	
	$("#emergMsg").bind("keypress",function(e){Control.EnterHandler(e,Control.SetEmerg);});
	$("#messageBarMsg").bind("keypress",function(e){Control.EnterHandler(e,Control.SetMessageBar);});
	
	$("#imgSelect").change(Control.PreviewImage);
	Control.PreviewImage();
});

Control.EnterHandler = function(e,handler){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { //Enter keycode
		handler();
	}
};

Control.SetImage = function(){
	Control.SetConfig("Src",$("#imgSelect").val());
};

Control.SetMessageBar = function(){
	Control.SetConfig("MessageBarText",$("#messageBarMsg").val());
	Control.SetConfig("MessageBar",true);
};

Control.SetEmerg = function(){
	Control.SetConfig("EmergText",$("#emergMsg").val());
	Control.SetConfig("Emerg",true);
};

Control.PreviewImage = function(){
	$("#previewImg").attr("src",$("#imgSelect").val());
};

Control.SetConfig = function(k,v){
	$("#loadingModal").show();
	var res=Shared.SetConfig(k,v,Control.FinishedSettingConfig);
	Control.SyncUI();
	return res;
};

Control.FinishedSettingConfig = function(){
	$("#loadingModal").hide();
};

Control.UIToggleSet = function(bool,idOn,idOff){
	if (bool){
		$("#"+idOn).addClass("active");
		$("#"+idOff).removeClass("active");
	} else {
		$("#"+idOff).addClass("active");
		$("#"+idOn).removeClass("active");
	}
};

Control.SyncUI = function(){
	$("#imgSelect").val(Shared.GetConfig("Src"));
	Control.PreviewImage();
	
	if (Shared.GetConfig("Black")){
		$("#btnOff").addClass("active");
		$("#btnOn").removeClass("active");
	} else {
		$("#btnOn").addClass("active");
		$("#btnOff").removeClass("active");
	}
	
	Control.UIToggleSet(Shared.GetConfig("Snow"),"btnSnow","btnNoSnow");

	Control.UIToggleSet(Shared.GetConfig("MessageBar"),"btnEnableMsgBar","btnDisableMsgBar");
	
	Control.UIToggleSet(Shared.GetConfig("MessageBarBottom"),"msgBarBottom","msgBarTop");
	
	$("#ovvrGroup input").removeClass("active");
	$("#btnProfile"+Shared.GetConfig("EmergProfile")).addClass("active");
	Control.UIToggleSet(Shared.GetConfig("Emerg"),"btnEnableEmerg","btnDisableEmerg");
};