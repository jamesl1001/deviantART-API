function getDeviations(url, limit, start) {
    var deviations = [];
    var limit      = limit || null;
    var start      = start || 0;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://backend.deviantart.com/rss.xml?q=gallery:fu51on/27123391');
    xhr.send();

    xhr.onload = function() {
        let json1 = xml2json(new DOMParser().parseFromString(xhr.response, 'text/xml'));
        let json2 = JSON.parse('{' + json1.slice(11));
        let items = json2.rss.channel.item;

        for(var i = 0, l = items.length; i < l; i++) {
            if(i < start) { continue; }
            if(!!limit && i == start + limit) break;

            var object = {};

            object.title         = items[i].title;
            object.link          = items[i].link;
            object.date          = items[i].pubDate;
            object.desc          = items[i]['media:description']['#text'];
            object.thumbS        = items[i]['media:thumbnail']?.[0]['@url'] || null;
            object.thumbL        = items[i]['media:thumbnail']?.[1]['@url'] || null;
            object.image         = items[i]['media:content']?.['@url'] || null;
            object.rating        = items[i]['media:rating'];
            object.category      = items[i]['media:category']['#text'];
            object.categoryUrl   = 'https://www.deviantart.com/' + object.category;
            object.deviantName   = items[i]['media:credit'][0]['#text'];
            object.deviantAvatar = items[i]['media:credit'][1]['#text'];
            object.deviantUrl    = items[i]['media:copyright']['@url'];
            object.copyright     = items[i]['media:copyright']['#text'];

            deviations.push(object);
        }

        // async function is complete, move on
        processDeviations(deviations);
    };
}

/*  This work is licensed under Creative Commons GNU LGPL License.
    License: http://creativecommons.org/licenses/LGPL/2.1/
    Version: 0.9
    Author:  Stefan Goessner/2006
    Web:     http://goessner.net/ 
*/
function xml2json(e,n){var t={toObj:function(e){var n={};if(1==e.nodeType){if(e.attributes.length)for(var i=0;i<e.attributes.length;i++)n["@"+e.attributes[i].nodeName]=(e.attributes[i].nodeValue||"").toString();if(e.firstChild){for(var r=0,o=0,l=!1,a=e.firstChild;a;a=a.nextSibling)1==a.nodeType?l=!0:3==a.nodeType&&a.nodeValue.match(/[^ \f\n\r\t\v]/)?r++:4==a.nodeType&&o++;if(l)if(r<2&&o<2){t.removeWhite(e);for(a=e.firstChild;a;a=a.nextSibling)3==a.nodeType?n["#text"]=t.escape(a.nodeValue):4==a.nodeType?n["#cdata"]=t.escape(a.nodeValue):n[a.nodeName]?n[a.nodeName]instanceof Array?n[a.nodeName][n[a.nodeName].length]=t.toObj(a):n[a.nodeName]=[n[a.nodeName],t.toObj(a)]:n[a.nodeName]=t.toObj(a)}else e.attributes.length?n["#text"]=t.escape(t.innerXml(e)):n=t.escape(t.innerXml(e));else if(r)e.attributes.length?n["#text"]=t.escape(t.innerXml(e)):n=t.escape(t.innerXml(e));else if(o)if(o>1)n=t.escape(t.innerXml(e));else for(a=e.firstChild;a;a=a.nextSibling)n["#cdata"]=t.escape(a.nodeValue)}e.attributes.length||e.firstChild||(n=null)}else 9==e.nodeType?n=t.toObj(e.documentElement):alert("unhandled node type: "+e.nodeType);return n},toJson:function(e,n,i){var r=n?'"'+n+'"':"";if(e instanceof Array){for(var o=0,l=e.length;o<l;o++)e[o]=t.toJson(e[o],"",i+"\t");r+=(n?":[":"[")+(e.length>1?"\n"+i+"\t"+e.join(",\n"+i+"\t")+"\n"+i:e.join(""))+"]"}else if(null==e)r+=(n&&":")+"null";else if("object"==typeof e){var a=[];for(var d in e)a[a.length]=t.toJson(e[d],d,i+"\t");r+=(n?":{":"{")+(a.length>1?"\n"+i+"\t"+a.join(",\n"+i+"\t")+"\n"+i:a.join(""))+"}"}else r+="string"==typeof e?(n&&":")+'"'+e.toString()+'"':(n&&":")+e.toString();return r},innerXml:function(e){var n="";if("innerHTML"in e)n=e.innerHTML;else for(var t=function(e){var n="";if(1==e.nodeType){n+="<"+e.nodeName;for(var i=0;i<e.attributes.length;i++)n+=" "+e.attributes[i].nodeName+'="'+(e.attributes[i].nodeValue||"").toString()+'"';if(e.firstChild){n+=">";for(var r=e.firstChild;r;r=r.nextSibling)n+=t(r);n+="</"+e.nodeName+">"}else n+="/>"}else 3==e.nodeType?n+=e.nodeValue:4==e.nodeType&&(n+="<![CDATA["+e.nodeValue+"]]>");return n},i=e.firstChild;i;i=i.nextSibling)n+=t(i);return n},escape:function(e){return e.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")},removeWhite:function(e){e.normalize();for(var n=e.firstChild;n;)if(3==n.nodeType)if(n.nodeValue.match(/[^ \f\n\r\t\v]/))n=n.nextSibling;else{var i=n.nextSibling;e.removeChild(n),n=i}else 1==n.nodeType?(t.removeWhite(n),n=n.nextSibling):n=n.nextSibling;return e}};9==e.nodeType&&(e=e.documentElement);var i=t.toJson(t.toObj(t.removeWhite(e)),e.nodeName,"\t");return"{\n"+n+(n?i.replace(/\t/g,n):i.replace(/\t|\n/g,""))+"\n}"}