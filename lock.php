<?php

class Lock {
	static $Lockout = false;
	static $Locked = false;
	static $UnlockTime = 0;
	private static $LockDuration = 86400;
	static function Check(){
		//lock handling
		self::$Locked = file_exists("control.lock.php") && filemtime("control.lock.php")>time()-self::$LockDuration;
		if (self::$Locked){
			$lockData=explode("\n", file_get_contents("control.lock.php"));
			self::$Lockout = @$_COOKIE["esignage_cp_key"]!=$lockData[1]; // first line is < ?php die;...? >
			self::$UnlockTime=filemtime("control.lock.php")+self::$LockDuration;
		} elseif (file_exists("control.lock.php")){
			unlink("control.lock.php");
		}
	}
	static function SetLock(){
		$key=sha1(mt_rand().uniqid());
		setcookie("esignage_cp_key",$key,time()+self::$LockDuration*2);//I guess if your clock goes wildly out of sync you're still safe?
		file_put_contents("control.lock.php", "<?php die;?>\n$key");
		self::$Locked = true;
		self::$UnlockTime=time()+self::$LockDuration;
	}
	static function UnsetLock(){
		if (unlink("control.lock.php")){
			setcookie("esignage_cp_key","",0);
			self::$Locked=false;
			self::$Lockout=false;
		}
	}
}

