define(["https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js", "qunit", "utils/control"], function(jQueryNull, qunitNull, control){
    $(document).ready(function(e){
        //sample test
        test("sample test", function() {
          ok( true, "this test is fine" );
          var value = "hello";
          equals( "hello", value, "We expect value to be hello" );
        });

        //test control.js
        test("mapFields test", function(){
            //put some html into the dom
            var html = "<div data-field=title>My Title</div>";
            var elem = $('body').append(html);
            var module = {
                title: ''
            }
            //enable controlling
            control.mapFields(module, elem, ['title']);

            //test changing text value
            module.title.text('New Title');
            equals("New Title", module.title.text(), "Title should be 'New Title'");

            //test changing css
            module.title.css('color', 'rgb(0, 255, 0)');
            equals("rgb(0, 255, 0)", module.title.css('color'), "color should be rgb(0, 255, 0)");
        });
    });
});