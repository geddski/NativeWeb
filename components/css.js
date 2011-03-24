define(function(){
    function insertStyleTag(styles, resourceName){
        if(typeof window !== "undefined" && window.navigator && window.document){
            //prevent adding new style tag if it already exists
            var existingStyles = document.getElementsByTagName("style");
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0, max = existingStyles.length; i < max; i+=1) {
                if(existingStyles[i].getAttribute("data-name") === resourceName){
                    //already loaded css file, stopping here
                    return;
                }
            }
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = styles;
            style.setAttribute("data-name", resourceName);
//            document.getElementsByTagName("head")[0].appendChild(style);
            
            head.insertBefore(style, head.firstChild);
        }
    }

    function load(name, req, load, config) {
        var resources = name.split(','),
            loadingCount = resources.length;
        //loop in reverse so that left to right becomes top to bottom ordering
        for(var i = loadingCount - 1; i >= 0; i--){
            var resourceName = resources[i];
            loadCSSInternal(resourceName, req, load);
        }
        load(null);
    }

    function loadCSSInternal(resourceName, req){
        //load as internal CSS , uses the text plugin
        req(['text!' + resourceName], function (styles) {
                insertStyleTag(styles, resourceName);
            });
    }


    return {
        load: load
    }
});