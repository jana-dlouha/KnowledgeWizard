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
    let $node = $('<li class="node">New node</li>')
        .attr('data-side', side)
        .attr('data-level', parseInt($parent.attr('data-level')) + 1)
        .uniqueId()
        .draggable({});

    getParentContainer( $parent, side).append( $node );
    reCenterParentContainer( $parent, $node, side );
    newContainer( $node, side );
    getNodePosition( $parent, $node, side );
    getPath( $parent, $node );
}


/**
 *
 * @param $parent
 * @param side
 *
 * @returns {*|jQuery|HTMLElement}
 */
function getParentContainer( $parent, side ){
    return $('ul[data-parent = "'
        + $parent.attr('id') + '"]'
        + '[data-side = "' + side + '"]'
    );
}


/**
 *
 * @param $parent
 * @param $node
 * @param side
 */
function reCenterParentContainer( $parent, $node, side ){
    let $parentContainer = getParentContainer( $parent, side );

    if(! $parentContainer.data('centering')){
        return;
    }

    let nodeHeight = parseInt($node.css('height'));
    let oldContainerHeight = parseInt($parentContainer.css('height'));
    let newContainerHeight = oldContainerHeight + nodeHeight + 40;
    $parentContainer.height(newContainerHeight);

    $parentContainer.position({
        my: getOppositeSide(side) + " center",
        at: side + " center",
        of: $parent
    });

    return $parentContainer;
}


/**
 *
 * @param $parent
 * @param $node
 * @param side
 *
 * @returns {*|jQuery|HTMLElement}
 */
function getNodePosition( $parent, $node, side ) {
    let $parentContainer = getParentContainer( $parent, side );
    let children = $parentContainer.children().length - 1;

    $node.position({
        my: getOppositeSide(side),
        at: side + " center+" + (children * 40),
        of: $parentContainer
    });

    return $node;
}


/**
 *
 *
 * @param $node
 * @param side
 */
function newContainer( $node, side ){
    return $('<ul></ul>')
        .addClass('container')
        .attr('id', 'container-' + side + '-' + $node.attr('id'))
        .attr('data-parent', $node.attr('id'))
        .attr('data-side', side)
        .attr('data-level', parseInt($node.attr('data-level')) + 1)
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
        });
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
 *
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


function getPath( $parent, $node ){
    let pathPosition = getPathPosition($node, $parent);
    let pathColor = 'purple';//getColor($parent);

    console.log('old position');
    console.log(pathPosition);

    /** TODO */
    let path = draw.path(
        'M' + pathPosition.parentLeft + ' ' +
        pathPosition.parentTop + ' L' +
        pathPosition.childLeft + ' ' +
        pathPosition.childTop
    );
    /** TODO */

    path.fill('none')
        .stroke({
        color: pathColor,
        width: 10,
        linecap: 'round',
        linejoin: 'round'
    })
    .attr('data-parent', $parent.attr('id'))
    .attr('data-child', $node.attr('id'));

    $node.attr('data-branch-color', pathColor);
}


function getPathPosition( $node, $parent ){
    let wrapperOffset = $('#wrapper').offset();
    let $start = $('<div style="width: 10px; height: 1px;" />')
        .appendTo( $parent );
    let $end = $('<div style="width: 10px; height: 1px;" />')
        .appendTo( $node );

    $start.position({
        my: "center",
        at: $node.attr('data-side') + " center",
        of: $parent
    });

    $end.position({
        my: "center",
        at: getOppositeSide( $node.attr('data-side') ) + " center",
        of: $node
    });

    return {
        parentTop: $start.offset().top - wrapperOffset.top,
        parentLeft: $start.offset().left - wrapperOffset.left,
        childTop: $end.offset().top - wrapperOffset.top,
        childLeft: $end.offset().left - wrapperOffset.left
    };
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