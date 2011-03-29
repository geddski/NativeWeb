define(['utils/css', 'text!examples/testmodule/testmodule.css'], function(css, styles){
    css.loadInternal(styles, 'examples/testmodule/testmodule.css');
    return {};
});