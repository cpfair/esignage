var Display = {};

$(document).ready(function(){
	
	Shared.SetConfig("Reload",false);//unset
	
	Display.CurrentImage=$("#signageImg").attr("src");
});

$(window).load(function(){
	$("#containment").css("height",$("#signageImg").outerHeight()+"px");
	$("#containment").css("width",$("#signageImg").outerWidth()+"px");
	Display.Update();
	setInterval(Display.Update,1500);
	setInterval(Display.FlashBorder,500);
	
});

Display.FirstLoad=true;
Display.CurrentImage="";
Display.OldMessageBarContents="";

Display.DoFlashBorder=false;
Display.FlashBorderState=false;

Display.Update = function(){
	Shared.LoadConfig(Display.UpdateLoaded);
};

Display.UpdateLoaded = function(){
	
	if (Shared.GetConfig("Reload")){
		Display.Reload();
		Display.UpdateLoaded=function(){};//stop doing stuff
	} else {
		if (Shared.GetConfig("Black")){
			if (Display.FirstLoad){
				$("#loadingCover").fadeIn(1000);
			} else {
				$("#loadingCover").show();//make sure it's not diplayed
				Display.FirstLoad=false;
			}
		} else if (Display.FirstLoad==false) {//not to mess this up
			$("#loadingCover").fadeOut(1000);
		}
		if (Shared.GetConfig("Src")!=Display.CurrentImage && Shared.GetConfig("Src")!==undefined){
			Display.Reload();//to avoid ugly loading artefacts (sp?)
		}
		if (Shared.GetConfig("MessageBar")){
			if (Shared.GetConfig("MessageBarBottom")){
				$("#messagingBar").addClass("messagingBarBottom");
			} else {
				$("#messagingBar").removeClass("messagingBarBottom");
			}
			if (Display.OldMessageBarContents!=Shared.GetConfig("MessageBarText")){
				Display.OldMessageBarContents=Shared.GetConfig("MessageBarText");
				$("#messagingBar").fadeOut(function(){
					$("#messagingBar").html(Shared.GetConfig("MessageBarText"));
					$("#messagingBar").fadeIn();
				});
			} else {
				$("#messagingBar").fadeIn();
			}
		} else {
			$("#messagingBar").fadeOut();
		}
		
		if (Shared.GetConfig("Emerg")){
			$("#messagingCover").fadeIn();
			$("#messagingCover td").html(Shared.GetConfig("EmergText"));
			var newFlashRate=0;
			var altTheme=false;
			Display.DoFlashBorder=false;
			switch (Shared.GetConfig("EmergProfile")){
				case "normal":
					//...
				break;
				case "flash15":
					newFlashRate=15000;
				break;
				case "flash5":
					newFlashRate=5000;
				break;
				case "emerg":
					newFlashRate=5123;
					altTheme=true;
					Display.DoFlashBorder=true;
				break;
			}
			if (altTheme){
				$("#messagingCover").addClass("srsmode");
			} else {
				$("#messagingCover").removeClass("srsmode");
			}
			if (newFlashRate>0){
				if (Display.FlashRate!=newFlashRate){
					Display.SetupFlash(newFlashRate);
					Display.FlashRate=newFlashRate;
				}
			} else {
				if (Display.FlashTimer) {clearInterval(Display.FlashTimer);Display.FlashTimer=null;}
			}
		} else {
			$("#messagingCover").fadeOut();
			if (Display.FlashTimer) {clearInterval(Display.FlashTimer);Display.FlashTimer=null;}
			Display.DoFlashBorder=false;
		}
	}
	
	if (Display.FirstLoad){
		Display.FirstLoad=false;
		setTimeout(function(){
			$("#loadingCover").fadeOut(1000);
		},500);
		
	}
	
};

Display.FlashBorder=function(){
	if (Display.DoFlashBorder){
		Display.FlashBorderState=!Display.FlashBorderState;
		if (Display.FlashBorderState){
			$("#messagingCover").addClass("altBorder");
		} else {
			$("#messagingCover").removeClass("altBorder");
		}
		
	}
};

Display.SetupFlash = function(interval){
	if (Display.FlashTimer) {clearInterval(Display.FlashTimer);Display.FlashTimer=null;}
	Display.FlashTimer=setInterval(Display.FlashScreen,interval);
	Display.FlashScreen();
};

Display.FlashScreen = function(){
	$("#flashCover").show();
	$("#flashCover").fadeOut(400);
};

Display.Reload = function(){
	$("#loadingCover").fadeIn(1000,function(){
		setTimeout(Display.PageReload,100);
	});
};

Display.PageReload = function(){
	window.location="?"+(new Date()).getTime();
};