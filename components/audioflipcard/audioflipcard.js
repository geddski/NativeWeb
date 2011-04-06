define(['flipcard/flipcard', 'utils/control', 'utils/css', 'text!audioflipcard/audioflipcard.css'], function(FlipCard, control, css, styles){
    //override some styles
    css.loadInternal(styles, 'audioflipcard/audioflipcard.css');

    function AudioFlipCard(id){
        this.audioSource = "";
        //delegate to the FlipCard constructor
        FlipCard.apply(this, arguments);

        //add a new html field
        this.element.find('.info').append('<audio data-field="audio" controls loop="loop"></audio>');
        control.mapFields(this, this.element, ['audio']);
    }

    //inherit functionality from FlipCard's prototype
    AudioFlipCard.prototype = new FlipCard();

    //decorate the select method
    AudioFlipCard.prototype.select = function(){
        //load the audio file if not already loaded
        if(!this.audio.attr('src')){
            this.audio.attr('src', this.audioSource);
        }
        FlipCard.prototype.select.call(this);
    };
    
    return AudioFlipCard;
});