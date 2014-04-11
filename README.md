deviantART-API
===============
Use DeviantArt's RSS/XML feeds as a CMS to dynamically embed deviation galleries on your website.

DeviantArt users can create Gallery Folders to organise their deviations (e.g. http://fu51on.deviantart.com/gallery/)

This script returns the [data](#what-data-does-the-feed-provide) from all the deviations from the specified folder.

- PHP Demo: http://jalproductions.co.uk/projects/deviantArt-API/php.php
- Javascript Demo: http://jalproductions.co.uk/projects/deviantArt-API/javascript.php



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



Usage - PHP
-----------

**Example**
```
<?php
    require_once('getDeviations.php');
    $deviations = getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391');
?>
```

`getDeviations()` returns an array of objects containing all the data about each deviation from the provided gallery folder.

You can use a foreach loop to extract the data you require:
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

`$url`: DeviantArt feed url `http://backend.deviantart.com/rss.xml?q=gallery:[deviant name]/[gallery]`

`$limit`: Limit the number of deviations to be displayed

`$start`: How many deviations to skip before displaying the rest



Usage - Javascript
------------------

`processDeviations()` is called once `getDeviations()` is complete which returns an array of objects containing all the data about each deviation from the provided gallery folder.

You can use a for loop to extract the data you require:

**Example**
```
<script src="getDeviations.js"></script>
<script>
    getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391', null, 0, 86400);

    function processDeviations(deviations) {
        for(var i = 0, l = deviations.length; i < l; i++) {
            console.log(deviations[i].link);
            console.log(deviations[i].title);
            console.log(deviations[i].image);
        }
    }
</script>
```

**Options**
```
getDeviations(url, limit, start, cacheAge);
```

`url`: DeviantArt feed url `http://backend.deviantart.com/rss.xml?q=gallery:[deviant name]/[gallery]`

`limit`: Limit the number of deviations to be displayed, default is `null`

`start`: How many deviations to skip before displaying the rest, default is 0

`cacheAge`: Number of seconds to cache the result, default is 1 day
