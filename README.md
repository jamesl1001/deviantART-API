Deviant-Art-CMS
===============
Use DeviantArt's RSS/XML feeds as a CMS to dynamically embed deviation galleries on your website.

DeviantArt users can create Gallery Folders to organise their deviations (e.g. http://fu51on.deviantart.com/gallery/)

This script returns the [data](#what-data-does-the-feed-provide) from all the deviations from the specified folder.

Demo: http://jalproductions.co.uk/projects/DeviantArtCMS/



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
    require_once('getDeviations.php');
    $deviations = getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361');
?>
```

`getDeviations()` returns an array of objects containing all the data from that gallery folder.

You can use a foreach loop to loop through the array and extract the data you require:
```
<?php
    $i = 0;

    foreach($deviations as $deviation): ?>
        <p><?= $deviations[$i]->title; ?></p>
        <img src="<?= $deviations[$i]->image; ?>"/>
<?php
        $i++;
    endforeach;
?>
```

**Options**
```
getDeviations($url, $limit, $start);
```

`$url`:   DeviantArt feed url `http://backend.deviantart.com/rss.xml?q=gallery:[deviant name]/[gallery]`

`$limit`: Limit the number of deviations returned

`$start`: How many deviations to skip before returning