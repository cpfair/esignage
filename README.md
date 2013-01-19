esignage
========

Super-simple digital signage. What more is there to say. Remotely overlay messages, change which image is shown, add snow, and more.

Setup
-----
0. Upload the contents of this directory to your web server
0. Make sure PHP has write access to the directory to create the necessary configuration files
0. Upload your signage images to `signage/`
0. Visit `control.php` and select an image to display
0. In another window, open `index.php` and head into fullscreen

Notes
-----
 * Signage images should be exactly the dimensions of your display surface
 * Use Google Chrome. Just trust me on this.


Security
--------
Click the invisible "Lock control panel" link that's hidden in the bottom white margin of the control panel (`Ctrl-A` will find it) - this will lock the control panel to the browser and computer you are using for the next 24 hours. If you need to change browsers, you can immediately unlock the control panel then re-lock it. If you clear your cookies, browser crashes, etc. and you find yourself locked out, just delete the `control.lock.php` file that will have been created in the main directory. 

Why is this feature hidden in the lamest way possible? I don't want anyone clicking it just to see what it does, only to find themselves - or the legitimate operator - locked out, that's why.

Alternatively, renaming `control.php` to something less obvious (`definitelynotcontrol.php` ?) will probably be just as effective. 


No hosting?
-----------
No problem! Visit [signage.cpfx.ca](http://signage.cpfx.ca) - it's (practically) the same system.