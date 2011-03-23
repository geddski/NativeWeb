define(['text!examples/flipcard/flipcard.html', 'utils/control', 'examples/testmodule/testmodule', 'css!examples/flipcard/flipcard.css,examples/flipcard/test2.css,examples/flipcard/test3.css,examples/flipcard/test4.css'], function(html, control, testmodule, css){
//define(['text!examples/flipcard/flipcard.html', 'utils/control'], function(html, control){
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

