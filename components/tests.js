//Configure RequireJS
require({
    paths:{
        'jquery': 'jquery'
    },
    priority: ['jquery']
});

require(["jquery", "qunit", "utils/control", "utils/css"], function($, qunitNull, control, css){
    $(document).ready(function(e){
        //sample test
        test("sample test", function() {
          ok( true, "this test is fine" );
          var value = "hello";
          equals( "hello", value, "We expect value to be hello" );
        });

        //-----test control.js
        module("control.js");
        test("mapFields test", function(){
            //setup
            var elem = $("<div><h1 data-field='title'>My Title</h1></div>");
            elem.appendTo('body');
            
            var object = { title: '' };
            //enable controlling
            control.mapFields(object, elem, ['title']);

            //test changing text value
            object.title.text('New Title');
            equals(object.title.text(), "New Title", "Title should be 'New Title'");

            //test changing css
            object.title.css('color', 'rgb(0, 255, 0)');
            equals(object.title.css('color'), "rgb(0, 255, 0)", "color should be rgb(0, 255, 0)");

            //teardown
            elem.remove();
        });

        //-----test flipcard.js
        module("flipcard.js");
        test("FlipCard tests", function(){
            //do some tests
        });
    });
});