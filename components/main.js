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
        flipCards = [],
        leftCard,
        rightCard;

    //get data and populate
    $.ajax({
            url: "data/baby-animals.json",
            dataType: "json",
            success: populate
        });

    //-----subscribe to flipcard-select event
    pubsub.on('flipcard-selected', function(flipCard){
        deselectOtherFlipCards(flipCard);
        centerFlipCard(flipCard);
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
            //add the element (not the jQuery wrapper) to the doc fragment
            fragment.appendChild(flipCard.element.get(0));
        }

        //arrange flipcards
        leftCard = flipCards[0].element.addClass('left');
        rightCard = flipCards[2].element.addClass('right');

        //insert into DOM
        container.append(fragment);
    }

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

    function centerFlipCard(flipCard){
        //new selection removes left or right class if applicable
        flipCard.element.removeClass('left right');

        //previous sibling gets class of 'left'
        var prev = flipCard.element.prev().removeClass('hide-left hide-right').addClass('left');
//        leftCard = prev;

        //next sibling gets class of 'right'
        var next = flipCard.element.next().removeClass('hide-left hide-right').addClass('right');
//        rightCard = next;

        //previous left gets hideleft
        console.log("prev : " , prev);
        console.log("leftCard : " , leftCard);
        console.log(prev.get(0) === leftCard.get(0));
        
        if(flipCard.element !== leftCard && prev.get(0) !== leftCard.get(0)){
            leftCard.addClass('hide-left').removeClass('left right');
        }

        //previous right gets hideright
        if(flipCard.element !== rightCard && next.get(0) !== rightCard.get(0)){
            rightCard.addClass('hide-right').removeClass('left right');
        }
    }
    
});