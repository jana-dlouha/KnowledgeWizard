let $wrapper, $paths, $mainTopic, oldOffset, newOffset, $addLeft, $addRight, nodes;
let colors = {
    1: '#462771',
    2: '#B89AE2',
    3: '#704F9F',
    4: '#1E093C',
    5: '#2B3273',
    6: '#9EA5E3',
    7: '#555CA1',
    8: '#732069',
    9: '#E393D9',
    10: '#A24997',
    11: '#3D0536',
    12: '#0E000C',
};
/*let colors = {
    1: 'rgb(158,1,66)',
    2: 'rgb()',
    3: 'rgb()',
    4: 'rgb()',
    5: 'rgb()',
    6: 'rgb()',
    7: 'rgb()',
    8: 'rgb()',
    9: 'rgb()',
    10: 'rgb()',
    11: 'rgb()',
    12: 'rgb()',
};*/


/**
 * EVENTS and ACTIONS
 */

/**
 * FUNCTIONS
 */


/**
 *
 */
function newMindMap(){
    $paths = $('<div id="paths" />');

    $wrapper = $('#wrapper')
        .data('mind-map-id', 1)
        .data('mind-map-name', 'MyMindMap')
        .draggable()
        .append($paths)
        .position({
            my: "center",
            at: "center+125",
            of: $(window)
        });

    draw = SVG('paths').size('100%', '100%');

    newMainTopic();
}


/**
 *
 */
function newMainTopic(){
    $mainTopic = $('<div>Main topic</div>')
        .attr('id', 'main-topic')
        .addClass('node-menu-one')
        .addClass('node')
        .attr('data-level', 0)
        .draggable({
            start: function() {
                $('.add-button').remove();
            }
        })
        .appendTo($wrapper)
        .position({
            my: "center",
            at: "center",
            of: "#wrapper"
        });

    newContainer( $mainTopic, 'left' );
    newContainer( $mainTopic, 'right' );

    return $mainTopic;
}


/**
 *
 * @param $parent
 * @param side
 */
function newNode( $parent, side ){
    let $parentContainer = $('ul[data-parent = "'
        + $parent.attr('id') + '"]'
        + '[data-side = "' + side + '"]'
    );

    let $node = $('<li class="node">New node</li>')
        .attr('data-side', side)
        .uniqueId()
        .appendTo( $parentContainer );

    getNodePosition( $parentContainer, $parent, $node, side );
    newContainer( $node, side );
}


/**
 *
 * @param $parentContainer
 * @param $parent
 * @param $node
 * @param side
 * @returns {*|jQuery|HTMLElement}
 */
function getNodePosition( $parentContainer, $parent, $node, side ) {
    let children = $parentContainer.children().length - 1;

    if(children){
        let nodeHeight = parseInt($node.css('height'));
        let oldContainerHeight = parseInt($parentContainer.css('height'));
        let newContainerHeight = oldContainerHeight + nodeHeight + 40;
        $parentContainer.height(newContainerHeight);

        if($parentContainer.data('centering')){
            $parentContainer.position({
                my: getOppositeSide(side) + " center",
                at: side + " center",
                of: $parent
            });
        }
    }

    console.log(side);
    console.log((side === "left") ? "left" : "right");
    console.log(side + "+" + (children * 40));
    console.log($parentContainer);

    $node.position({
        my: (side === "left") ? "left+200" : "right+200",
        at: side + " top+" + (children * 40),
        of: $parentContainer
    });
}


/**
 *
 *
 * @param $node
 * @param side
 */
function newContainer( $node, side ){
    console.log($node);


    return $('<ul></ul>')
        .addClass('container')
        .attr('id', 'container-' + side + '-' + $node.attr('id'))
        .attr('data-parent', $node.attr('id'))
        .attr('data-side', side)
        .attr('data-level', $node.data('level') + 1)
        .css('height', parseInt($node.css('height')))
        .data('centering', true)
        .draggable({
            start: function( event ) {
                $(event.target).data('centering', false)
            }
        })
        .appendTo( $node )
        .position({
            my: getOppositeSide(side),
            at: side,
            of: $node
        })
        .css('background-color', 'ghostwhite')
        .css('border', '1px solid gray');
}


/**
 *
 * @param $node
 */
function switchSide( $node ){

}


/**
 *
 * @param side
 * @returns {string}
 */
function getOppositeSide( side ){
    return side === "left" ? "right" : "left";
}




/**
 *
 * @param $node
 * @param side
 */
function showAddButtons( $node, side ){
    let style = { backgroundColor: $node.css('background-color') };

    let $addButton = $('<div class="add-button">+</div>')
        .attr('id', 'add-' + side)
        .data('side', side)
        .css(style)
        .on('click', function(){
            newNode( $node, side);
        });

    $node.append($addButton);

    $addButton.position({
        my: "center",
        at: side + " center",
        of: $node
    });
}


/**
 * DOCUMENT READY ACTIONS
 */
$( document ).ready( function(){
    newMindMap();
    /** Get users mind maps from database - AJAX - create dropdown */

    /** Create buttons */
    /** NODE - add */
    /** save map */
    /** clear map */
    /** load map */
    /** delete map */
    /** duplicate map */

    /** Events and actions? */

        /** SCREEN */
            /** resize */

        /** WRAPPER */
            /** drag */

        /** MIND MAP COMBOBOX */
            /** click, change */

        /** MAIN TOPIC */


        $('.node').on({
            mouseenter: function( event ) {
                let $target = $(event.target);

                if( $target.attr('id') === 'main-topic' ){
                    showAddButtons($target, 'left');
                    showAddButtons($target, 'right');
                } else if ($target.hasClass('node')) {
                    showAddButtons($target, $target.attr('data-side'));
                }
            },
            mouseleave: function() {
                $('.add-button').remove();
            },
            /** drag */
            /** click */
            /** double click */
            /** hover */
            /** right click */
        });

        /** ADD BUTTONS */
        $('.add-button').on({
            click: function() {
                console.log($(this));
                newNode($(this));
            },
            mouseenter: function() {
                showAddButtons($(this));
            }
        });

        /** CLEAR, NEW, SAVE BUTTONS? */


    /** CONTEXT MENU and DIALOGS */
        /** WRAPPER */

        /** NODES */
            /** change text */
            /** change background */
            /** change border */
            /** change shape */
            /** change url */
            /** go to url */
            /** expand */
            /** collapse */

        /** PATHS */
            /** change color */

});