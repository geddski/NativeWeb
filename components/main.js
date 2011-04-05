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
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < response.length; i += 1) {
                var id = i + 1;
                var obj = response[i];
                var flipCard = new FlipCard(id);
                flipCard.title.html(obj.name);
                flipCard.image.attr('src', 'components/images/' + obj.image);
                flipCards.push(flipCard);
                //add the element (not the jQuery wrapper) to the doc fragment
                fragment.appendChild(flipCard.element.get(0));
            }

            //arrange flipcards
            flipCards[0].element.addClass('left');
            flipCards[2].element.addClass('right');

            //insert into DOM
            container.append(fragment);
        }
    });

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