define(['utils/css', 'utils/control', 'utils/pubsub', 'text!flipcard/flipcard.html', 'text!flipcard/flipcard.css'], function(css, control, pubsub, html, styles) {
    css.loadInternal(styles, 'flipcard/flipcard.css');

    function FlipCard(id) {
        this.id = id;
        this.element = $(html);
        this.selected = false;
        var instance = this;

        //wire up fields mapped to DOM elements
        control.mapFields(this, this.element, ['title', 'image']);

        //fire custom event when clicked
        this.element.click(function() {
            pubsub.fire('flipcard-selected', instance);
        });
    }

    FlipCard.prototype.select = function() {
        this.element.addClass('active');
        this.selected = true;
    };

    FlipCard.prototype.deselect = function() {
        if (this.selected) {
            this.element.removeClass('active');
            this.selected = false;
        }
    };

    return FlipCard;
});

