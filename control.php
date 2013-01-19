<?php

$config=json_decode(file_get_contents("config.json"));

$imgs=glob("signage/*");


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
				<input type="button" id="btnSnow" value="Make it snow!" onclick="UISetConfig('snow',true);UISetConfig('Reload',true);"/><input type="button" id="btnNoSnow" value="Turn Off" onclick="UISetConfig('snow',false);UISetConfig('Reload',true);"/>
			</div>
			<div class="group">
				<h2>Message Bar</h2>
				<input type="text" id="messageBarMsg" value="<?php echo $config->MessageBarText;?>"/><input type="button" value="Set &raquo;" onclick="SetMessageBar();"/><input type="button" value="Turn Off" onclick="UISetConfig('MessageBar',false)"/><br/>
				<input type="button" id="msgBarTop" value="Show Top" onclick="UISetConfig('MessageBarBottom',false)"/><input type="button" onclick="UISetConfig('MessageBarBottom',true)" id="msgBarBottom" value="Show Bottom"/>
			</div>
			<div class="group" id="ovvrGroup">
				<h2>Override</h2>
				<input type="text" id="emergMsg" value="<?php echo $config->EmergText;?>"/><input type="button" value="Set &raquo;" onclick="SetEmerg();"/><input type="button" value="Turn Off" onclick="UISetConfig('Emerg',false);"/><br/>
				<input type="button" value="Normal" id="btnProfilenormal" onclick="UISetConfig('EmergProfile','normal')"/><input type="button" value="Slow Flash" onclick="UISetConfig('EmergProfile','flash15')" id="btnProfileflash15"/><input type="button" value="Fast Flash" onclick="UISetConfig('EmergProfile','flash5')" id="btnProfileflash5"/><input type="button" value="Urgent" onclick="UISetConfig('EmergProfile','emerg')" id="btnProfileemerg"/>
			</div>
		</div>
	</div>
</body>
</html>
