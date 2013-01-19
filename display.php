<?php
$config=json_decode(file_get_contents("config.json"));
?>
<!doctype html>
<html>
<head>
	<link rel="stylesheet" href="display.css">
	<title>Digital Signage Player</title>
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	
	<script type="text/javascript" src="shared.js"></script>
	<script type="text/javascript" src="display.js"></script>
	<?php if ($config->snow=="true"){?>
	<script type="text/javascript" src="snowstorm.js"></script>
	<?php } ?>
</head>
<body>
	<div id="loadingCover"></div>
	<div id="containment">
		<div id="flashCover"></div>
		<div id="messagingCover"><table><tr><td>WBlack Black Black Blasdasjdh esuryius ndhgfdjhg</td></tr></table></div>
		
		<div id="messagingBar" >The signage is broken</div>
		<div id="imgHolder"><img src="<?php echo $config->src;?>" id="signageImg"/></div>
	</div>
</body>
</html>