define(function(){
    function loadCSSInternal(styles, name){
        //prevent adding new style tag if it already exists
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

    function load(name, req, load, config) {
        //load as internal CSS , uses the text plugin
        req(['text!' + name], function (styles) {
            loadCSSInternal(styles, name);
            load(styles);
        });
    }

    return {
        load: load
    }
});