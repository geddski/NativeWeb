define(function(){
    var loadedStyleTags = [];
    var head = document.getElementsByTagName("head")[0];
    
    function insertStyleTag(styles, resourceName, isPlacedAtTop){
        if(typeof window !== "undefined" && window.navigator && window.document){
            //prevent adding new style tag if it already exists
            if(loadedStyleTags.indexOf(resourceName) != -1){ return; }
            
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = styles;
            style.setAttribute("data-name", resourceName);
            if(isPlacedAtTop){
                head.insertBefore(style, head.firstChild);
            }
            else{
                head.appendChild(style);
            }
            loadedStyleTags.push(resourceName);
        }
    }

    function loadInternal(styles, resourceName, isPlacedAtTop){
        insertStyleTag(styles, resourceName, isPlacedAtTop);
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