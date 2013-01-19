<?php
include "lock.php";
Lock::Check();
if (Lock::$Lockout){
	die("The control panel is locked");
} else {
	if (!Lock::$Locked && isset($_GET["lock"])){
		Lock::SetLock();
	} elseif (Lock::$Locked && isset($_GET["unlock"])) {
		Lock::UnsetLock();
	}
}

$config=@json_decode(file_get_contents("config.json"));
if ($config==null){
	$config=new stdClass;
	file_put_contents("config.json", json_encode($config));
}


$imgs=glob("signage/*.*"); //exclude the placeholder file

?>
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="control.css">
<link rel="text/css" href="control.mob.css" media="only screen and (max-width: 480px)" >
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="shared.js"></script>
<script type="text/javascript" src="control.js"></script>
</head>
<body>
	<div id="loadingModal"><table><tr><td></td></tr></table></div>
	<div id="container">
		<div id="containerInner">
			<h1>Signage Control</h1>
			<div class="group">
				<h2>Set Image</h2>
				<img id="previewImg"/>
				<select id="imgSelect">
					<?php
					foreach ($imgs as $img){
						$display=str_replace("signage/","",$img);
						echo "<option value=\"$img\">$display</option>";
					}?>
				</select><input type="button" value="Set &raquo;" onclick="SetImage()"/>
			</div>
			<div class="group">
				<h2>Control</h2>
				<input type="button" id="btnReload" value="Reload" onclick="UISetConfig('Reload',true);"/><input type="button" id="btnOn" value="On" onclick="UISetConfig('Black',false);"/><input type="button" id="btnOff" onclick="UISetConfig('Black',true);" value="Off"/>
			</div>
			<div class="group">
				<h2>Snow</h2>
				<input type="button" id="btnSnow" value="Make it snow!" onclick="UISetConfig('Snow',true);UISetConfig('Reload',true);"/><input type="button" id="btnNoSnow" value="Turn Off" onclick="UISetConfig('Snow',false);UISetConfig('Reload',true);"/>
			</div>
			<div class="group">
				<h2>Message Bar</h2>
				<input type="text" id="messageBarMsg" value="<?php echo @$config->MessageBarText;?>"/><input type="button" value="Set &raquo;" onclick="SetMessageBar();" id="btnEnableMsgBar"/><input type="button" value="Turn Off" onclick="UISetConfig('MessageBar',false)" id="btnDisableMsgBar"/><br/>
				<input type="button" id="msgBarTop" value="Show Top" onclick="UISetConfig('MessageBarBottom',false)"/><input type="button" onclick="UISetConfig('MessageBarBottom',true)" id="msgBarBottom" value="Show Bottom"/>
			</div>
			<div class="group" id="ovvrGroup">
				<h2>Override</h2>
				<input type="text" id="emergMsg" value="<?php echo @$config->EmergText;?>"/><input type="button" value="Set &raquo;" onclick="SetEmerg();" id="btnEnableEmerg"/><input type="button" value="Turn Off" onclick="UISetConfig('Emerg',false);" id="btnDisableEmerg"/><br/>
				<input type="button" value="Normal" id="btnProfilenormal" onclick="UISetConfig('EmergProfile','normal')"/><input type="button" value="Slow Flash" onclick="UISetConfig('EmergProfile','flash15')" id="btnProfileflash15"/><input type="button" value="Fast Flash" onclick="UISetConfig('EmergProfile','flash5')" id="btnProfileflash5"/><input type="button" value="Urgent" onclick="UISetConfig('EmergProfile','emerg')" id="btnProfileemerg"/>
			</div>
			<?php if (Lock::$Locked) { ?>
			<div class="group">
				<h2>Control Panel Lock</h2>
				The control panel will be locked until <?php echo date("g:i A",Lock::$UnlockTime).(date("Ymd",time())!=date("Ymd",Lock::$UnlockTime)?" tomorrow":" today");?>
				<input type="button" value="Unlock Now" id="btnProfilenormal" onclick="window.location='?unlock=1'"/> <!-- should be a link styled as a button -->
			</div>
			<?php } else { ?>
			<a href="?lock=1" style="color:white;font-size:50%;position:absolute;" onclick="confirm('Locking the control panel will prevent it from being used from a different browser or computer for the next 24 hours. Do you wish to continue?')">Lock control panel</a>
			<?php } ?>
		</div>
	</div>
</body>
</html>