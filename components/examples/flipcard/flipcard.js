define(['text!examples/flipcard/flipcard.html', 'utils/control', 'examples/testmodule/testmodule', 'css!examples/flipcard/flipcard.css', 'css!examples/flipcard/test2.css', 'css!examples/flipcard/test3.css', 'css!examples/flipcard/test4.css'], function(html, control){
//define(['text!examples/flipcard/flipcard.html', 'utils/control'], function(html, control){
   function FlipCard(id){
        this.id = id;
        this.element = $(html);
        var instance = this;
        control.mapFields(this, this.element, ['title']);
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

