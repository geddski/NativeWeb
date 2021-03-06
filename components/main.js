//Configure RequireJS
require({
    paths:{ 'jquery': 'jquery' },
    priority: ['jquery']
});

require(['jquery', 'utils/css', 'utils/pubsub', 'sammy', 'gallery', 'text!css/reset.css', 'text!css/theme.css'], function($, css, pubsub, sammy, gallery, reset, theme) {
    css.loadInternal(reset, 'css/reset.css', true);
    css.loadInternal(theme, 'css/theme.css');

    //get data and populate
    $.ajax({
        //url: "data/baby-animals.json",
        url: "data/baby-animals-with-audio.json",
        dataType: "json",
        success: function(data) {
            gallery.populate(data, setupHistory);
        }
    });


    /*  Example of how to load modules on demand.
     *  This helps speed up page load time
     *  by not loading code/markup/styles that aren't  needed yet
    */ 
    //$('#feedback').click(function(e){
    //   require(['feedback'], function(feedback){
    //      //use the feedback module now that it is loaded    
    //   });
    //});

    //-----subscribe to flipcard-select event
    pubsub.on('flipcard-selected', function(flipCard) {
        //change the history hash, let the Sammy route do the rest
        window.location.hash = "/flipcard/" + flipCard.id;
    });

    function setupHistory() {
        var singlePageApp = $.sammy(function() {
            //select a flipcard based on the URL
            this.get('#/flipcard/:flipcard', function() {
                var flipCard = gallery.getFlipCard(this.params['flipcard']);
                flipCard.select();
                gallery.deselectOtherFlipCards(flipCard);
                gallery.arrangeFlipCards(flipCard);
            });
        });
        singlePageApp.run();
    }
});