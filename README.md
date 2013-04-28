Deviant-Art-CMS
===============
How to utilise DeviantArt's feeds as a CMS

Demo: http://jalproductions.co.uk/projects/DeviantArtCMS/

DeviantArt allows us to create Gallery Folders to organise our deviations: http://fu51on.deviantart.com/gallery/

**If only we could grab the feed for these folders and use it to dynamically populate our website...**

What is the URL of the feed?
----------------------------

`http://backend.deviantart.com/rss.xml?q=gallery:[deviant name]/[gallery]`

e.g. http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391

What data does the feed provide?
--------------------------------

- title
- link
- permalink
- date
- keywords (doesn't seem to return anything at the moment)
- rating
- category
- deviant's name
- deviant's avatar
- copyright
- description
- thumbnail (w: 150)
- thumbnail (w: 300)
- deviation

Usage
-----

**Example**
```
<?php
    include 'getDeviations.php';
    $html = getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361');
    echo $html;
?>
```

**Options**
```
getDeviations($url, $limit, $start);
```

`$url`:   DeviantArt feed url `http://backend.deviantart.com/rss.xml?q=gallery:[deviant name]/[gallery]`

`$limit`: Limit the number of deviations returned

`$start`: How many deviations to skip before returning