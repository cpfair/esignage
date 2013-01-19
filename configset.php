<?php


$resource=fopen("config.json","r+");
flock($resource,LOCK_EX);
if (filesize("config.json")>0){
	$cdata=fread($resource,filesize("config.json"));
	$config=json_decode($cdata);
} else {
	$config=new stdClass;
}



$key=$_GET["key"];
$val=$_GET["val"];
$config->$key=$val;

ftruncate($resource,0);
fclose($resource);
$resource=fopen("config.json","w");
flock($resource,LOCK_EX);
fwrite($resource,json_encode($config));
fclose($resource);
