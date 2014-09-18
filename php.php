<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="Use DeviantArt's RSS/XML feeds as a CMS to dynamically embed deviation galleries on your website"/>
    <meta name="author" content="James Alexander Lee"/>
    <title>deviantART-API</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body>
    <h1>deviantART-API</h1>
    <p><a href="https://github.com/jamesl1001/deviantART-API" target="_blank">https://github.com/jamesl1001/deviantART-API</a></p>
    <h2>PHP | <a href="javascript">JavaScript</a></h2>
    <p>Use DeviantArt's RSS/XML feeds as a CMS to dynamically embed deviation galleries on your website.</p>
    <p>Feed: <a href="http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391" target="_blank">http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391</a></p>

    <hr>

    <div class="deviations">
    <?php
        require_once('getDeviations.php');
        $deviations = getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391');

        foreach($deviations as $key => $deviation): ?>
            <div class="deviation">
                <div class="col col-p">
                    <a href="<?= $deviations[$key]->url; ?>"><h2><?= $deviations[$key]->title; ?></h2></a>
                    <img src="<?= $deviations[$key]->image; ?>" alt="<?= $deviations[$key]->title; ?>" class="deviation_image"/>
                    <p>Thumbnail src: <a href="<?= $deviations[$key]->thumbS; ?>">150px</a> | <a href="<?= $deviations[$key]->thumbL; ?>">300px</a>
                </div>
                <div class="col col-s">
                    <h2>Deviation Info</h2>
                    <p><small><?= $deviations[$key]->date; ?></small></p>
                    <p><strong><?= $deviations[$key]->desc; ?></strong></p>
                    <p>Rating: <?= $deviations[$key]->rating; ?></p>
                    <p>Category: <a href="http://browse.deviantart.com/<?= $deviations[$key]->categoryUrl; ?>"><?= $deviations[$key]->category; ?></a></p>
                    <p>By <a href="<?= $deviations[$key]->deviantUrl; ?>"><?= $deviations[$key]->deviantName; ?></a></p>
                    <img src="<?= $deviations[$key]->deviantAvatar; ?>"/>
                    <p><?= $deviations[$key]->copyright; ?></p>
                </div>
            </div>
    <?php
        endforeach;
    ?>
    </div>
</body>
</html>