define(function(){
    function loadCSSInternal(styles, name){
        //prevent adding new style if it already exists
        var existingStyles = document.getElementsByTagName("style");
        console.log("styles.length", existingStyles.length);
        for (var i = 0, max = existingStyles.length; i < max; i+=1) {
            if(existingStyles[i].getAttribute("data-name") === name){
                //already loaded css file, stopping here
                return;
            }
        }
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = styles;
        style.setAttribute("data-name", name);
        document.getElementsByTagName("head")[0].appendChild(style);
    }

    function loadCSSExternal(url){
        //prevent loading file already loaded
        var stylesheets = document.getElementsByTagName("link");
        for (var i = 0, max = stylesheets.length; i < max; i += 1){
            if (stylesheets[i].getAttribute("href") === url){ return; }
        }

        //load styesheet
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    function load(name, req, load, config) {
        var parts
        if(name.indexOf(":") != -1 && name.split(':')[0] === 'external'){
            parts = name.split(':');
            loadCSSExternal(parts[1]);
            load(null);//todo
        }
        else{
            //load as internal css by default, uses the text plugin
            req(['text!' + name], function (styles) {
                loadCSSInternal(styles, name);
                load(styles);
            });
        }
    }

    return {
        load: load
    }
});