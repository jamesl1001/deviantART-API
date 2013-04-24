<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<meta name="description" content="How to utilise DeviantArt's feeds as a CMS"/>
	<meta name="author" content="James Alexander Lee"/>
	<title>DeviantArt CMS</title>
</head>
<body>
	<h1>DeviantArt CMS</h1>
	<p>Feed: <a href="http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361" target="_blank">http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361</a></p>

	<hr>

	<?php
	    include 'getDeviations.php';
	    $html = getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361', 8);
	    echo $html;
	?>
</body>
</html>