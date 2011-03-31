define(['require'], function(require) {
    var loadedStyleTags = [];
    var head = document.head || (document.head = document.getElementsByTagName("head")[0]);

    function insertStyleTag(styles, resourceName, isPlacedAtTop) {
        if (typeof window !== "undefined" && window.navigator && window.document) {
            //prevent adding new style tag if it already exists
            if (loadedStyleTags.indexOf(resourceName) != -1) {
                return;
            }

            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = styles;
            style.setAttribute("data-name", resourceName);
            if (isPlacedAtTop) {
                head.insertBefore(style, head.firstChild);
            }
            else {
                head.appendChild(style);
            }
            loadedStyleTags.push(resourceName);
        }
    }

    function fixPaths(styles, resourceName){
        var fixedStyles = styles.replace(/url\(([^)]+)\)/g, function(fullMatch, originalURL){
            console.log("old url : " , originalURL);
            var index = originalURL.lastIndexOf("."),
                    modName = originalURL.substring(0, index),
                    ext = '.' + originalURL.substring(index + 1, originalURL.length);

            console.log("modName : " , modName);
            console.log("ext : " , ext);

            var baseName = resourceName.slice(0, resourceName.lastIndexOf('/')) + '/';
            var fullName = baseName + modName;
            console.log("fullName : " , fullName);

            var fixedURL = require.nameToUrl(fullName, ext);
            console.log("fixedURL : " , fixedURL);
            return 'url(' + fixedURL + ')';
        });
        return fixedStyles;
    }

    function loadInternal(styles, resourceName, isPlacedAtTop) {
//        console.log("resourceName : " , resourceName);
        var index = resourceName.indexOf(".");
        var modName = resourceName.substring(0, index);
//        var ext = resourceName.substring(index + 1, name.length);
//        console.log("modName : " , modName);
//        console.log("ext : " , ext);

//        var url = require.nameToUrl(modName, ' ');
//        console.log("url : " , url);
        




        styles = fixPaths(styles, resourceName, '../components/');
        insertStyleTag(styles, resourceName, isPlacedAtTop);
    }

    function insertLinkTag(url) {
        var link = document.createElement("link");
        link.rel = 'stylesheet';
        link.href = url;
        head.appendChild(link);
    }

    function loadExternal(url) {
        //note: no guarantee of order yet.
        insertLinkTag(url);
    }

//    function convertURL(base, res) {
//        var dirs = 0;
//        var bits = res.split('../');
//        var res_path = '';
//        for (var i = 0; i < bits.length; i++) {
//            if (bits[i] == '') {
//                dirs++;
//            } else {
//                res_path += bits[i];
//            }
//        }
//
//        var base_bits = base.split('/');
//        var path = '';
//        for (var j = 0; j < base_bits.length - dirs - 1; j++) {
//            path += base_bits[j] + '/';
//        }
//        path += res_path;
//        return path
//    }

    return {
        loadInternal: loadInternal,
        loadExternal: loadExternal
        //todo loadExternal(url)
    }
});