//Configure RequireJS
require({
    paths:{
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min'
    },
    priority: ['jquery']
});

require(['jquery', 'utils/css', 'examples/flipcard/flipcard'], function($, css, FlipCard){
    css.loadInternal('../css/theme.css');

    var container = $('#container');

    var flipCard = new FlipCard(1);
    container.append(flipCard.element);

    var flipCard2 = new FlipCard(2);
    flipCard2.element.addClass('active');
    container.append(flipCard2.element);

    var flipCard3 = new FlipCard(3);
    container.append(flipCard3.element);

    window.addEventListener("popstate", function(event){
//        //todo call the method that shows the correct flipcard
    }, false);
});