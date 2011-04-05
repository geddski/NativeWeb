define(['flipcard/flipcard'], function(FlipCard) {
    var hideleft = -380,
            left = -180,
            active = 300,
            right = 780,
            hideright = 960,
            container = $('#container'),
            flipCards = [];

    function deselectOtherFlipCards(flipCard) {
        for (var i = 0; i < flipCards.length; i += 1) {
            if (flipCards[i] !== flipCard) {
                flipCards[i].deselect();
            }
        }
    }

    function populate(data, callback) {
        var i, id, obj, flipCard,
                fragment = document.createDocumentFragment();

        for (i = 0; i < data.length; i += 1) {
            id = i + 1;
            obj = data[i];
            flipCard = new FlipCard(id);
            flipCard.title.html(obj.name);
            flipCard.image.attr('src', 'components/images/' + obj.image);
            flipCards.push(flipCard);
            if (i > 2) {
                flipCard.element.css('left', hideright);
            }
            //add the element (not the jQuery wrapper) to the doc fragment
            fragment.appendChild(flipCard.element.get(0));
        }

        //arrange flipcards' starting positions
        leftCard = flipCards[0].element.css('left', left);
        rightCard = flipCards[2].element.css('left', right);

        //insert into DOM
        container.append(fragment);

        //execute the callback function
        callback();
    }

    function getFlipCard(id) {
        for (var i = 0; i < flipCards.length; i += 1) {
            if (flipCards[i].id === parseInt(id)) {
                return flipCards[i];
            }
        }
    }

    function arrangeFlipCards(flipCard) {
        var index, card, i, length,
                newLeft = getFlipCard(flipCard.id - 1),
                newRight = getFlipCard(flipCard.id + 1);

        //apply the correct leftPosition to the newLeft, newRight, and flipCard
        if (newLeft) newLeft.element.css('left', left);
        flipCard.element.css('left', active);
        if (newRight) newRight.element.css('left', right);

        //hide left every card before the newLeft
        length = newLeft ? newLeft.id - 1 : 0;
        for (i = 0; i < length; i += 1) {
            card = flipCards[i];
            card.element.css('left', hideleft);
        }

        //hide right every card after the newRight
        index = newRight ? newRight.id : flipCards.length;
        for (index; index < flipCards.length; index += 1) {
            card = flipCards[index];
            card.element.css('left', hideright);
        }
    }

    //expose gallery module's public API
    return {
        deselectOtherFlipCards: deselectOtherFlipCards,
        arrangeFlipCards: arrangeFlipCards,
        populate: populate,
        getFlipCard: getFlipCard
    };
});