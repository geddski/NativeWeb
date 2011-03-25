define(['utils/css', 'utils/control', 'text!examples/flipcard/flipcard.html', 'examples/testmodule/testmodule'], function(css, control, html, testmodule, flipcardStyles, styles2, styles3, styles4 ){
    console.log("flipcard.js is throwing an error in safari! ha!");
    css.loadInternal('examples/flipcard/flipcard.css');
   css.loadInternal('examples/flipcard/test2.css');
   css.loadInternal('examples/flipcard/test3.css');
   css.loadInternal('examples/flipcard/test4.css');

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

