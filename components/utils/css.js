define(function(){
    var loadedStyleTags = [];
    var head = document.getElementsByTagName("head")[0];
    
    function insertStyleTag(styles, resourceName){
        if(typeof window !== "undefined" && window.navigator && window.document){
            //prevent adding new style tag if it already exists
            if(loadedStyleTags.indexOf(resourceName) != -1){
                return;
            }
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = styles;
            style.setAttribute("data-name", resourceName);
            head.appendChild(style);
            loadedStyleTags.push(resourceName);
        }
    }

    function loadInternal(resourceName){
        //note: order appears to be working, needs further testing
        //load as internal CSS , uses the text plugin
        require(['text!' + resourceName], function (styles) {
            insertStyleTag(styles, resourceName);
        });
    }

    function insertLinkTag(url){
        var link = document.createElement("link");
        link.rel = 'stylesheet';
        link.href = url;
        head.appendChild(link);
    }

    function loadExternal(url){
        //note: no guarantee of order yet.
        insertLinkTag(url);
    }

    return {
        loadInternal: loadInternal,
        loadExternal: loadExternal
        //todo loadExternal(url)
    }
});