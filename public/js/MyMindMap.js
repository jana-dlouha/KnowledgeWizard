/**
 * OPTIONS
 */

/** global ariables */
let $wrapper, $paths, $mainTopic, oldOffset, newOffset, $addLeft, $addRight, nodes;

/** vertical spacing between nodes */
let spacing = 50;

/** branches color scheme */
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
 *
 * @param nodeId string
 */
function showTextInputDialog( nodeId ){
    let node = document.getElementById(nodeId).childNodes[0];
    let text = node.textContent;
    let $input = $('#text-input');

    $input.val( text );

    let dialog = $( "#text-input-dialog" ).dialog({
        autoOpen: true,
        modal: true,
        text: 'Přidejte text',
        buttons: {
            "OK": function(){
                node.textContent = $input.val();
                $input.val('');
                dialog.dialog( "close" );
            },
            Cancel: function() {
                $input.val('');
                dialog.dialog( "close" );
            }
        }
    });
}


/**
 * TODO - url selector using symfony
 *
 * @param $node
 */
function showUrlInputDialog( $node ){
    let dialog = $( "#url-input-dialog" ).dialog({
        autoOpen: true,
        modal: true,
        buttons: {
            "OK": function(){
                $node.attr('data-url', $('#url-input').val());
                dialog.dialog( "close" );
            },
            Cancel: function() {
                dialog.dialog( "close" );
            }
        }
    });
}


/**
 *
 * @param $parent
 */
function collapseBranch( $parent ){
    let children = $parent.children().find('li');

    $.each( children, function() {
        $(this).css('display', 'none');

        let $path = $('path' +
            '[data-parent="' + $parent.attr('id') + '"]' +
            '[data-child="' +  $(this).attr('id') + '"]');

        $path.remove();

        collapseBranch( $(this) );
    });
}


/**
 *
 * @param $parent
 */
function expandBranch( $parent ){
    let children = $parent.children().find('> li');

    $.each( children, function() {
        $(this).css('display', 'block');

        getPath( $parent, $(this) );

        expandBranch( $(this) );
    });
}


/**
 *
 * @param $parent
 */
function deleteBranch( $parent ){
    let children = $parent.children().find('li');
    let $parentPath = $('path' +
        '[data-child="' + $parent.attr('id') + '"]');

    $.each( children, function() {
        let $childPath = $('path' +
            '[data-parent="' + $parent.attr('id') + '"]' +
            '[data-child="' +  $(this).attr('id') + '"]');

        $childPath.remove();

        $(this).remove();

        deleteBranch( $(this) );
    });

    $parentPath.remove();
    $parent.remove();
}


/**
 *
 */
$(function() {
    $.contextMenu({
        selector: '.node-context-menu',
        callback: function(key, options) {
            if(key === "collapse"){
                collapseBranch($(this));
            }

            if(key === "expand"){
                expandBranch($(this));
            }

            if(key === "delete"){
                deleteBranch($(this));
            }

            if(key === "addUrl"){
                showUrlInputDialog($(this));
            }

            if(key === "save"){
                saveMindMap();
            }
        },
        items: {
            "collapse": {name: "Collapse", icon: "add"},
            "expand": {name: "Expand", icon: "add"},
            "delete": {name: "Delete", icon: "delete"},
            "addUrl": {name: "Add url", icon: "add"},
            "goTo": {name: "Go to url", icon: "goTo"},
            "save": {name: "Save", icon: "save"},
            "quit": {name: "Quit", icon: function(){
                    return 'context-menu-icon context-menu-icon-quit';
                }}
        }
    });

    $('.node-context-menu').on('click', function(e){
        event.preventDefault();
    })
});



/**
 *
 * @param $node
 */
/*function showUrlInputDialog( $node ){
    let dialog = $( "#url-input-dialog" ).dialog({
        autoOpen: true,
        modal: true,
        buttons: {
            "OK": function(){
                $node.attr('data-url', $('#url-input').val());
                dialog.dialog( "close" );
            },
            Cancel: function() {
                dialog.dialog( "close" );
            }
        }
    });
}*/


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
            },
            stop: function() {
                movePaths( $(this) );
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
        .attr('data-parent', $parent.attr('id'))
        .addClass('node-context-menu')
        .uniqueId()
        .draggable({
            stop: function(){
                if( checkSide( $( this ) )){
                    switchSide( $( this ) );
                }
                movePaths( $( this ) );
            }
        });

    getParentContainer( $parent, side).append( $node );
    reCenterParentContainer( $parent, $node, side, spacing );
    newContainer( $node, side );
    getNodePosition( $parent, $node, side, spacing );
    getPath( $parent, $node );
    movePaths( $parent );
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
 * @param spacing
 */
function reCenterParentContainer( $parent, $node, side, spacing = 0 ){
    let $parentContainer = getParentContainer( $parent, side );

    if(! $parentContainer.data('centering')){
        return;
    }

    let nodeHeight = parseInt($node.css('height'));
    let oldContainerHeight = parseInt($parentContainer.css('height'));
    let newContainerHeight = oldContainerHeight + nodeHeight + spacing;
    $parentContainer.height(newContainerHeight);

    return setContainerPosition( $parentContainer, side, $parent );
}


/**
 *
 * @param $parentContainer
 * @param side
 * @param $parent
 *
 * @returns {*}
 */
function setContainerPosition( $parentContainer, side, $parent ){
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
 * @param spacing
 *
 * @returns {*|jQuery|HTMLElement}
 */
function getNodePosition( $parent, $node, side, spacing = 0 ) {
    let $parentContainer = getParentContainer( $parent, side );

    //TODO - better solution
    if( spacing ){
        let children = $parentContainer.children().length;
        spacing = ( children ? (children - 1) : 0 ) * spacing;
    }

    $node.position({
        my: getOppositeSide(side),
        at: side + " center+" + spacing,
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
            },
            stop: function() {
                movePaths( $node );
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
 * @param $element
 * @returns {boolean}
 */
function checkSide( $element ){
    let side = $element.attr('data-side');
    let nodeOffset = $element.offset().left;
    let centerOffset = $('#main-topic').offset().left;

    return (
        ( side === 'left' && ( nodeOffset > centerOffset ) ) ||
        ( side === 'right' && ( nodeOffset < centerOffset ) )
    )
}


/**
 *
 * @param $node
 */
function switchSide( $node ){
    let $parent = $( document.getElementById( $node.attr('id') ) );
    let $container = getParentContainer( $parent, $node.attr('data-side'));
    let $childNodes = $node.children('ul').children('li');
    let newSide = getOppositeSide( $node.attr('data-side') );

    $node.attr('data-side', newSide);
    $container.attr('data-side', newSide);

    $childNodes.each( function(){
        let difference = parseInt( $( this ).css('left') );
        let correction = $node.offset().left - $( this ).offset().left;

        switchSide( $( this ) );

        $( this ).css('left', difference + correction);
    } );

    getNodePosition( $parent, $node, newSide );
    setContainerPosition( $container, newSide, $parent );
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


/**
 *
 * @param $node
 */
function getSide( $node ){
    let mainOffset = $('#main-topic').offset().left;
    let mainCenter = $('#main-topic').width() / 2;

    if( (mainOffset - mainCenter - $node.offset().left) >= 0 ){
        return 'left';
    }

    return 'right';
}


/**
 *
 * @param $parent
 * @param $node
 */
function getPath( $parent, $node ){
    let pathColor = 'purple';//getColor($parent);
    let pathPosition = getPathPosition( $parent, $node );

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


/**
 *
 * @param $parent
 * @param $node
 */
function removePath( $parent, $node ){
    $parent.children('div.start-point').remove();
    $node.children('div.end-point').remove();

    $('path' +
        '[data-parent=' + $parent.attr('id') + ']' +
        '[data-child=' + $node.attr('id') + ']'
    ).remove();
}


/**
 *
 * @param $node
 * @param $parent
 *
 * @returns {{parentTop: number, parentLeft: number, childTop: number, childLeft: number}}
 */
function getPathPosition( $parent, $node ){
    let wrapperOffset = $('#wrapper').offset();
    let $start = $('<div class="start-point" />')
        .attr('data-parent', $parent.attr('id'))
        .appendTo( $parent );
    let $end = $('<div class="end-point" />')
        .attr('data-parent', $node.attr('id'))
        .appendTo( $node );
    let side = getSide( $node );

    $start.position({
        my: "center",
        at: side + " center",
        of: $parent
    });

    $end.position({
        my: "center",
        at: getOppositeSide( side ) + " center",
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
 *
 * @param $node
 */
function movePaths( $node ){
    if( $node.attr('id') != 'main-topic' ){
        let $parent = document.getElementById( $node.attr('data-parent') );

        removePath( $($parent), $node );
        getPath( $($parent), $node );
    }

    let $children = $node.children('ul').children('li');

    $children.each( function(){
            movePaths($(this));
        }
    );
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
            dblclick: function( event ) {
                let $target = $(event.target);
                let targetId = $target.attr('id');

                if( $target.is('li') || targetId === 'main-topic'){
                    showTextInputDialog( targetId );
                }
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