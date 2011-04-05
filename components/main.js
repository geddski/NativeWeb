//Configure RequireJS
require({
    paths:{
//        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min'
        'jquery': 'jquery'
    },
    priority: ['jquery']
});

require(['jquery', 'utils/css', 'utils/pubsub', 'sammy-0.6.3.min', 'flipcard/flipcard', 'text!css/reset.css', 'text!css/theme.css'], function($, css, pubsub, sammy, FlipCard, reset, theme){
    css.loadInternal(reset, 'css/reset.css', true);
    css.loadInternal(theme, 'css/theme.css');

    var container = $('#container'),
        flipCards = [];

    //-----instanciate FlipCards from json data
    $.ajax({
        url: "data/baby-animals.json",
        dataType: "json",
        success: function(response) {
            for (var i = 0; i < response.length; i += 1) {
                var id = i + 1;
                var obj = response[i];
//                console.log("obj : " , obj);
                var flipCard = new FlipCard(id);
                flipCard.title.html(obj.name);
                flipCard.image.attr('src', 'components/images/' + obj.image);
                flipCards.push(flipCard);
                container.append(flipCard.element);
            }

            //arrange flipcards
            flipCards[0].element.addClass('left');
            flipCards[2].element.addClass('right');
        }
    });

//    var flipCard = new FlipCard(1);
//    flipCard.element.addClass('left');
//    flipCard.title.html("FlipCard1");
//    flipCards.push(flipCard);
//    container.append(flipCard.element);

//    var flipCard2 = new FlipCard(2);
//    flipCard2.title.html("FlipCard2");
//    flipCard2.image.attr('src', 'components/images/crocodile.jpg');
//    flipCards.push(flipCard2);
//    container.append(flipCard2.element);
//    flipCard2.select();
//    console.log("flipCard2.title : " , flipCard2.title);
//    console.log("flipCard2.image : " , flipCard2.image);
//
//    var flipCard3 = new FlipCard(3);
//    flipCard3.title.html("FlipCard3");
//    flipCards.push(flipCard3);
//    flipCard3.element.addClass('right');
//    container.append(flipCard3.element);

    //-----subscribe to flipcard-select event
    pubsub.on('flipcard-selected', function(flipCard){
        deselectOtherFlipCards(flipCard);
    });
    
    //-----sammy single-page routes
//    var app = $.sammy(function() {
//        this.get('#/flipcard/:flipcard', function() {
//            alert(this.params['flipcard']);
//            var flipcard = getFlipCard(this.params['flipcard']);
//            flipcard.select();
//            deselectOtherFlipCards(flipcard);
//        });
//    });
//    app.run();

    //-----application code needed for example
    function getFlipCard(id){
        for(var i=0; i < flipCards.length; i += 1){
            if(flipCards[i].id === id){
                return flipCards[i];
            }
        }
    }

    function deselectOtherFlipCards(flipCard){
        for(var i=0; i < flipCards.length; i += 1){
            if(flipCards[i] !== flipCard){
                flipCards[i].deselect();
            }
        }
    }
    
});