define(['utils/css', 'utils/control', 'text!examples/flipcard/flipcard.html', 'text!examples/flipcard/flipcard.css'], function(css, control, html, styles){
    css.loadInternal(styles, 'examples/flipcard/flipcard.css');

   function FlipCard(id){
        this.id = id;
        this.element = $(html);
        var instance = this;

       //wire up fields mapped to DOM elements
        control.mapFields(this, this.element, ['title']);

       //events
        this.element.click(function(){
            instance.element.toggleClass('active');
            //todo fire custom event
            //todo move this out into a history controller or something (fire event first)
            var state = {
                object: 'flipcard',
                number: instance.id
            };
//           window.history.pushState(state, '', '/flipcard/' + state.number);
        });
    }
    return FlipCard;
});

