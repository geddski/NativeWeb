define(['utils/css', 'utils/control', 'utils/pubsub', 'text!examples/flipcard/flipcard.html', 'text!examples/flipcard/flipcard.css'], function(css, control, pubsub, html, styles) {
    css.loadInternal(styles, 'examples/flipcard/flipcard.css');

    function FlipCard(id) {
        this.id = id;
        this.element = $(html);
        this.selected = false;
        var instance = this;

        //wire up fields mapped to DOM elements
        control.mapFields(this, this.element, ['title']);

        //events
        this.element.click(function() {
            instance.selected ? instance.deselect() : instance.select();
        });
    }

    //mixin pubsub capability
    pubsub.makePublisher(FlipCard.prototype);

    FlipCard.prototype.select = function(){
        this.element.addClass('active');
        this.selected = true;
        this.fire('flipcard-selected', this);
    };

    FlipCard.prototype.deselect = function(){
        if(this.selected){
            this.element.removeClass('active');
            this.selected = false;
        }
    };

    return FlipCard;
});

