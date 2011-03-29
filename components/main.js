//Configure RequireJS
require({
    paths:{
//        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min'
        'jquery': 'jquery'
    },
    priority: ['jquery']
});

require(['jquery', 'utils/css', 'utils/pubsub', 'sammy-0.6.3.min', 'examples/flipcard/flipcard', 'text!../css/reset.css', 'text!../css/theme.css'], function($, css, pubsub, sammy, FlipCard, reset, theme){
    css.loadInternal(reset, '../css/reset.css', true);
    css.loadInternal(theme, '../css/theme.css');

    var container = $('#container'),
        flipCards = [];

    //-----instanciate FlipCards
    var flipCard = new FlipCard(1);
    flipCards.push(flipCard);
    container.append(flipCard.element);

    var flipCard2 = new FlipCard(2);
    flipCards.push(flipCard2);
    container.append(flipCard2.element);
    flipCard2.select();

    var flipCard3 = new FlipCard(3);
    flipCards.push(flipCard3);
    container.append(flipCard3.element);

    //-----subscribe to flipcard-select event
    pubsub.on('flipcard-selected', function(flipCard){
        //deselect other flipCards
        for(var i=0; i < flipCards.length; i += 1){
            if(flipCards[i] !== flipCard){
                flipCards[i].deselect();
            }
        }
        //todo: slide to the selected flipCard
    });
    
    //-----sammy single-page routes
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