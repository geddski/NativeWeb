define(['require'], function(require) {
    /**
     * CSS Loading Module
     * limitation: relative CSS files must be within your app's baseUrl directory.
     */
    
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
            //only fix relative paths. 
            if(originalURL.indexOf('/') === 0 || originalURL.indexOf('http://') === 0){ return 'url(' + originalURL + ')'; }
            var index = originalURL.lastIndexOf("."),
                    modName = originalURL.substring(0, index),
                    ext = '.' + originalURL.substring(index + 1, originalURL.length),
                    baseName = resourceName.slice(0, resourceName.lastIndexOf('/')) + '/',
                    fullName = baseName + modName,
                    fixedURL = require.nameToUrl(fullName, ext);
            //console.log("old url : " , originalURL);
            //console.log("modName : " , modName);
            //console.log("ext : " , ext);
            //console.log("fullName : " , fullName);
            //console.log("fixedURL : " , fixedURL);
            return 'url(' + fixedURL + ')';
        });
        return fixedStyles;
    }

    function loadInternal(styles, resourceName, isPlacedAtTop) {
        styles = fixPaths(styles, resourceName);
        insertStyleTag(styles, resourceName, isPlacedAtTop);
    }

    function insertLinkTag(url) {
        var link = document.createElement("link");
        link.rel = 'stylesheet';
        link.href = url;
        head.appendChild(link);
    }

    function loadExternal(url) {
        //note: no guarantee of order tested yet. 
        insertLinkTag(url);
    }

    return {
        loadInternal: loadInternal,
        loadExternal: loadExternal
    }
});