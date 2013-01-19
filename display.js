$(document).ready(function(){
	
	SetConfig("Reload",false);//unset
	
	CurrentImg=$("#signageImg").attr("src");
});
$(window).load(function(){
	$("#containment").css("height",$("#signageImg").outerHeight()+"px");
	$("#containment").css("width",$("#signageImg").outerWidth()+"px");
	Update();
	setInterval(Update,1500);
	setInterval(FlashBorder,500);
	
});
var FirstLoad=true;
var CurrentImg="";
var OldMessageBar="";

var FlashTimer;
var FlashRate;

var DoFlashBorder=false;
var FlashBorderState=false;

function Update(){
	LoadConfig(UpdateLoaded);
}

function UpdateLoaded(){
	
	if (GetConfig("Reload")){
		UIReload();
		UpdateLoaded=function(){};//stop doing stuff
	} else {
		if (GetConfig("Black")){
			if (FirstLoad){
				$("#loadingCover").fadeIn(1000);
			} else {
				$("#loadingCover").show();//make sure it's not diplayed
				FirstLoad=false;
			}
		} else if (FirstLoad==false) {//not to mess this up
			$("#loadingCover").fadeOut(1000);
		}
		if (GetConfig("Src")!=CurrentImg && GetConfig("Src")!==undefined){
			UIReload();//to avoid ugly loading artefacts (sp?)
		}
		if (GetConfig("MessageBar")){
			if (GetConfig("MessageBarBottom")){
				$("#messagingBar").addClass("messagingBarBottom");
			} else {
				$("#messagingBar").removeClass("messagingBarBottom");
			}
			if (OldMessageBar!=GetConfig("MessageBarText")){
				OldMessageBar=GetConfig("MessageBarText");
				$("#messagingBar").fadeOut(function(){
					$("#messagingBar").html(GetConfig("MessageBarText"));
					$("#messagingBar").fadeIn();
				});
			} else {
				$("#messagingBar").fadeIn();	
			}
		} else {
			$("#messagingBar").fadeOut();
		}
		
		if (GetConfig("Emerg")){
			$("#messagingCover").fadeIn();
			$("#messagingCover td").html(GetConfig("EmergText"));
			var NewFlashRate=0;
			var AltTheme=false;
			DoFlashBorder=false;
			switch (GetConfig("EmergProfile")){
				case "normal":
					//...
				break;
				case "flash15":
					NewFlashRate=15000;
				break;
				case "flash5":
					NewFlashRate=5000;
				break;
				case "emerg":
					NewFlashRate=5123;
					AltTheme=true;
					DoFlashBorder=true;
				break;
			}
			if (AltTheme){
				$("#messagingCover").addClass("srsmode");
			} else {
				$("#messagingCover").removeClass("srsmode");
			}
			if (NewFlashRate>0){
				if (FlashRate!=NewFlashRate){
					SetupFlash(NewFlashRate);
					FlashRate=NewFlashRate;
				}
			} else {
				if (FlashTimer) {clearInterval(FlashTimer);FlashTimer=null;}
			}
		} else {
			$("#messagingCover").fadeOut();
			if (FlashTimer) {clearInterval(FlashTimer);FlashTimer=null;}
			DoFlashBorder=false;
		}
	}
	
	if (FirstLoad){
		FirstLoad=false;
		setTimeout(function(){
			$("#loadingCover").fadeOut(1000);
		},500);
		
	}
	
}
function FlashBorder(){
	if (DoFlashBorder){
		FlashBorderState=!FlashBorderState;
		if (FlashBorderState){
			$("#messagingCover").addClass("altBorder");
		} else {
			$("#messagingCover").removeClass("altBorder");
		}
		
	}
}
function SetupFlash(interval){
	if (FlashTimer) {clearInterval(FlashTimer);FlashTimer=null;}
	FlashTimer=setInterval(FlashScreen,interval);
	FlashScreen();
}
function FlashScreen(){
	$("#flashCover").show();
	$("#flashCover").fadeOut(400);
}

function UIReload(){
	$("#loadingCover").fadeIn(1000,function(){
		setTimeout(PageReload,100);
	});
}
function PageReload(){
	window.location="?"+(new Date()).getTime();
}