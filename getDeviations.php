<?php
function getDeviations($url, $limit = null, $start = 0) {
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_USERAGENT, 'JaL-User-Agent');
    curl_setopt($curl, CURLOPT_ENCODING, 'gzip,deflate');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $feed       = simplexml_load_string(curl_exec($curl));
    $channel    = $feed->channel;
    $i          = 0;
    $deviations = array();

    foreach($channel->item as $item) {
        if($i < $start) { $i++; continue; }
        if(isset($limit) && $i == $start + $limit) break;

        $object = (object)array(
            "title"         => $item->title,
            "url"           => $item->link,
            "date"          => $item->pubDate,
            "desc"          => $item->children('media', true)->description,
            "thumbS"        => $item->children('media', true)->thumbnail->{0}->attributes()->url,
            "thumbL"        => $item->children('media', true)->thumbnail->{1}->attributes()->url,
            "image"         => $item->children('media', true)->content->attributes()->url,
            "rating"        => $item->children('media', true)->rating,
            "categoryUrl"   => $item->children('media', true)->category,
            "category"      => $item->children('media', true)->category->attributes()->label,
            "deviantName"   => $item->children('media', true)->credit->{0},
            "deviantAvatar" => $item->children('media', true)->credit->{1},
            "deviantUrl"    => $item->children('media', true)->copyright->attributes()->url,
            "copyright"     => $item->children('media', true)->copyright
        );

        array_push($deviations, $object);
        $i++;
    }
    return $deviations;
}