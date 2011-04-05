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

    var flipCards = [],
        leftCard,
        centerCard,
        rightCard,
        hideleft = -380,
        left = -180,
        active = 300,
        right = 780,
        hideright = 960,
        container = $('#container');

    //get data and populate
    $.ajax({
            url: "data/baby-animals.json",
            dataType: "json",
            success: populate
        });

    //-----subscribe to flipcard-select event
    pubsub.on('flipcard-selected', function(flipCard){
//        deselectOtherFlipCards(flipCard);
//        centerFlipCard(flipCard);
        //change the history hash, let the Sammy route do the rest
        window.location.hash = "/flipcard/" + flipCard.id;
    });
    
    function populate(data){
        var i, id, obj, flipCard,
              fragment = document.createDocumentFragment();

        for (i = 0; i < data.length; i += 1) {
            id = i + 1;
            obj = data[i];
            flipCard = new FlipCard(id);
            flipCard.title.html(obj.name);
            flipCard.image.attr('src', 'components/images/' + obj.image);
            flipCards.push(flipCard);
            //TODO refactor to avoid duplicate code doing the arranging
            if(i > 2){
                flipCard.element.css('left', hideright);
            }
            //add the element (not the jQuery wrapper) to the doc fragment
            fragment.appendChild(flipCard.element.get(0));
        }

        //arrange flipcards
        leftCard = flipCards[0].element.css('left', left);
        rightCard = flipCards[2].element.css('left', right);

        //insert into DOM
        container.append(fragment);

        //setup history now that data is available
        //TODO seems to be calling twice on page load. active check no longer the way?
        setupHistory();
    }

    function setupHistory(){
        //-----sammy single-pageness
        var singlePageApp = $.sammy(function() {

            //select a flipcard based on the URL
            this.get('#/flipcard/:flipcard', function() {
                var flipCard = getFlipCard(this.params['flipcard']);
                console.log("flipCard : " , flipCard);
//                if(!flipCard.selected){
                    flipCard.select();
                    deselectOtherFlipCards(flipCard);
                    centerFlipCard(flipCard);
//                }
            });

        });
        singlePageApp.run();
    }

    function getFlipCard(id){
        for(var i=0; i < flipCards.length; i += 1){
            if(flipCards[i].id === parseInt(id)){
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

    function centerFlipCard(flipCard){
        console.log("centerFlipCard()");
        var newLeft = getFlipCard(flipCard.id -1);
        var newRight = getFlipCard(flipCard.id + 1);
        //apply the correct leftPosition to the newLeft, newRight, and flipCard
        if (newLeft) newLeft.element.css('left', left);
        flipCard.element.css('left', active);
        if (newRight) newRight.element.css('left', right);

        //hide left every card before the newLeft
        var length = newLeft ? newLeft.id - 1 : 0;
        for (var i = 0; i < length; i += 1){
            var card = flipCards[i];
            card.element.css('left', hideleft);
        }
        
        //hide right every card after the newRight
        var index = newRight ? newRight.id : flipCards.length;
        for (index; index < flipCards.length; index += 1){
            var card = flipCards[index];
                card.element.css('left', hideright);
        }
    }
});