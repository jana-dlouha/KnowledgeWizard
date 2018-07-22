/**
 * Document ready actions
 */
$( document ).ready( function(){
    var center = {
        x: 500,
        y: 320
    };

    var svg = $('<svg style="width: 100%; height: 800px; "></svg>');

    svg.uniqueId();
    $('body').append(svg);
});


