<?php
$config=@json_decode(@file_get_contents("config.json"));
if ($config==null){
	//will keep everyone satisfied for now
	$config=new stdClass;
	$config->Black=true;
	$config->Snow=false;
	$config->Src="";
}
?>
<!doctype html>
<html>
<head>
	<link rel="stylesheet" href="display.css">
	<title>Digital Signage Player</title>
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	
	<script type="text/javascript" src="shared.js"></script>
	<script type="text/javascript" src="display.js"></script>
	<?php if (@$config->Snow=="true"){?>
	<script type="text/javascript" src="snowstorm.js"></script>
	<?php } ?>
</head>
<body>
	<div id="loadingCover"></div>
	<div id="containment">
		<div id="flashCover"></div>
		<div id="messagingCover"><table><tr><td></td></tr></table></div>
		
		<div id="messagingBar" ></div>
		<div id="imgHolder"><img src="<?php echo @$config->Src;?>" id="signageImg"/></div>
	</div>
</body>
</html>