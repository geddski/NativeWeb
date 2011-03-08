define(["https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js", "qunit", "utils/control"], function(jQueryNull, qunitNull, control){
    $(document).ready(function(e){
        //sample test
        test("sample test", function() {
          ok( true, "this test is fine" );
          var value = "hello";
          equals( "hello", value, "We expect value to be hello" );
        });

        //test control.js
        module("control.js");
        test("mapFields test", function(){
            //setup
            var elem = $("<div><h1 data-field='title'>My Title</h1></div>");
            elem.appendTo('body');
            
            var module = { title: '' };
            //enable controlling
            control.mapFields(module, elem, ['title']);

            //test changing text value
            module.title.text('New Title');
            equals(module.title.text(), "New Title", "Title should be 'New Title'");

            //test changing css
            module.title.css('color', 'rgb(0, 255, 0)');
            equals(module.title.css('color'), "rgb(0, 255, 0)", "color should be rgb(0, 255, 0)");

            //teardown
            elem.remove();
        });
    });
});