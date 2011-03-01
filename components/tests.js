define(["https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js", "qunit"], function(qunitNull){
    $(document).ready(function(e){
        //sample test
        test("sample test", function() {
          ok( true, "this test is fine" );
          var value = "hello";
          equals( "hello", value, "We expect value to be hello" );
        });
    });
});