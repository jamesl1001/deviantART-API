<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="How to utilise DeviantArt's feeds as a CMS"/>
    <meta name="author" content="James Alexander Lee"/>
    <title>DeviantArtCMS</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
</head>
<body>
    <h1>DeviantArtCMS</h1>
    <p>Use DeviantArt's RSS/XML feeds as a CMS to dynamically embed deviation galleries on your website.</p>
    <p>Feed: <a href="http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361" target="_blank">http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361</a></p>

    <hr>

    <?php
        require_once('getDeviations.php');
        $deviations = getDeviations('http://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123361');
        $i = 0;

        foreach($deviations as $deviation): ?>
            <div class="deviation">
                <div class="col col-p">
                    <a href="<?= $deviations[$i]->url; ?>"><h2><?= $deviations[$i]->title; ?></h2></a>
                    <img src="<?= $deviations[$i]->image; ?>" alt="<?= $deviations[$i]->title; ?>" class="deviation_image"/>
                    <p>Thumbnail src: <a href="<?= $deviations[$i]->thumbS; ?>">150px</a> | <a href="<?= $deviations[$i]->thumbL; ?>">300px</a>
                </div>
                <div class="col col-s">
                    <h2>Deviation Info</h2>
                    <p><small><?= $deviations[$i]->date; ?></small></p>
                    <p><strong><?= $deviations[$i]->desc; ?></strong></p>
                    <p>Rating: <?= $deviations[$i]->rating; ?></p>
                    <p>Category: <a href="http://browse.deviantart.com/<?= $deviations[$i]->categoryUrl; ?>"><?= $deviations[$i]->category; ?></a></p>
                    <p>By <a href="<?= $deviations[$i]->deviantUrl; ?>"><?= $deviations[$i]->deviantName; ?></a></p>
                    <img src="<?= $deviations[$i]->deviantAvatar; ?>"/>
                    <p><?= $deviations[$i]->copyright; ?></p>
                </div>
            </div>
    <?php
            $i++;
        endforeach;
    ?>
</body>
</html>