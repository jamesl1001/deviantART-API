function getDeviations(url, limit, start, cacheAge) {
    var deviations = [];
    var limit      = limit || null;
    var start      = start || 0;
    var cacheAge   = cacheAge || 86400;

    (function queryYQL() {
        // thanks http://stackoverflow.com/a/7369516/1696757
        window['callback'] = callback;
        var s = document.createElement('script');
        s.src = "http://query.yahooapis.com/v1/public/yql?q=" + escape('select * from xml where url="' + url + '"') + "&_maxage=" + cacheAge + "&format=json&callback=callback";
        document.body.appendChild(s);
        
        function callback(feed) {
            var items = feed.query.results.rss.channel.item;

            for(var i = 0, l = items.length; i < l; i++) {
                if(i < start) { continue; }
                if(!!limit && i == start + limit) break;

                var object = {};

                object.title         = items[i].title[0];
                object.link          = items[i].link;
                object.date          = items[i].pubDate;
                object.desc          = items[i].description[0].content;
                object.thumbS        = items[i].thumbnail[0].url;
                object.thumbL        = items[i].thumbnail[1].url;
                object.image         = items[i].content.url;
                object.rating        = items[i].rating;
                object.categoryUrl   = items[i].category.url;
                object.category      = items[i].category.label;
                object.deviantName   = items[i].credit[0].content;
                object.deviantAvatar = items[i].credit[1].content;
                object.deviantUrl    = items[i].copyright.url;
                object.copyright     = items[i].copyright.content;

                deviations.push(object);
            }

            // async function is complete, move on
            processDeviations(deviations);
        }
    })();

    return deviations;
}