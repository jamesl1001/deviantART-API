# deviantART-API

Use DeviantArt's RSS/XML feeds as a CMS to dynamically embed deviation galleries on your website.

DeviantArt users can create Gallery Folders to organise their deviations (e.g. http://fu51on.deviantart.com/gallery/)

This script returns the [data](#what-data-does-the-feed-provide) from all the deviations from the specified folder.

## What is the URL of the feed and its parameters?

The RSS URL always begins with: `https://backend.deviantart.com/rss.xml` followed by some query parameters, e.g. https://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391

[DeviantArt's RSS documentation](https://www.deviantart.com/developers/rss) only provides a couple of examples of how to construct RSS URLs.

Here is an expanded list of query parameters:

| Query params | Example | Description |
| :- | :- | :- |
| `q=by:[deviant name]` | `q=by:fu51on` |
| `q=gallery:[deviant name]` | `q=gallery:fu51on` |
| `q=gallery:[deviant name]/[gallery]` | `q=gallery:fu51on/27123391` |
| `q=[search term]` | `q=frogs` |
| `q=in:[category]` | `q=in:visual_art` |
| `offset=[number]` | `offset=60` |
| `order=[number]` | `order=5` | Order by newest |
| `order=[number]` | `order=9` | Order by all-time popularity |
| `limit=[number]` | `limit=10` | 1-60 |

## How can I get the Featured and Scraps galleries?

Please see https://github.com/jamesl1001/deviantART-API/issues/4#issuecomment-1951384692

## What data does the feed provide?

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

## Usage - PHP

**Example**
```
<?php
    require_once('getDeviations.php');
    $deviations = getDeviations('https://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391');
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

`$url`: DeviantArt feed url `https://backend.deviantart.com/rss.xml?q=gallery:[deviant name]/[gallery]`

`$limit`: Limit the number of deviations to be displayed

`$start`: How many deviations to skip before displaying the rest

## Usage - Javascript

`processDeviations()` is called once `getDeviations()` is complete which returns an array of objects containing all the data about each deviation from the provided gallery folder.

You can use a for loop to extract the data you require:

**Example**
```
<script src="getDeviations.js"></script>
<script>
    getDeviations('https://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391', null, 0);

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
getDeviations(url, limit, start);
```

`url`: DeviantArt feed url `https://backend.deviantart.com/rss.xml?q=gallery:[deviant name]/[gallery]`

`limit`: Limit the number of deviations to be displayed, default is `null`

`start`: How many deviations to skip before displaying the rest, default is 0
