define(['utils/css', 'text!examples/testmodule/testmodule.css'], function(css, styles){
    console.log("testmodule.js");
    css.loadInternal(styles, 'examples/testmodule/testmodule.css');
    return {};
});