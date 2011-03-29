//Configure RequireJS
require({
    paths:{
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min'
//        'jquery': 'jquery'
    },
    priority: ['jquery']
});

require(['jquery', 'utils/css', 'sammy-0.6.3.min', 'examples/flipcard/flipcard', 'text!../css/reset.css', 'text!../css/theme.css'], function($, css, sammy, FlipCard, reset, theme){
    css.loadInternal(reset, '../css/reset.css', true);
    css.loadInternal(theme, '../css/theme.css');

    var container = $('#container');

    var flipCard = new FlipCard(1);
    container.append(flipCard.element);

    var flipCard2 = new FlipCard(2);
//    flipCard2.element.addClass('active');
    container.append(flipCard2.element);

    var flipCard3 = new FlipCard(3);
    container.append(flipCard3.element);

    //sammy single-page routes
    var app = $.sammy(function() {
        this.get('#/', function() {
            //todo home
        });

        this.get('#/flipcard/:flipcard', function() {
            console.log(this.params['flipcard']);
        });
    });
    app.run();
    
});