var draw;
var colors = {
    1: '#ff0066',
    2: '#00ffff',
    3: '#ff0000',
    4: '#00ff00',
    5: '#0080ff',
    6: '#bf00ff',
    7: '#ffff00',
    8: '#ff8000'
};
var colorNumber = 1;

/**
 * Document ready actions
 */
$( document ).ready( function(){
    $('#wrapper').css('height', window.innerWidth);

    centerMainTopic();

    draw = SVG('paths').size('100%', '1000');

    /**
     * Add button events and positioning
     */
    $('#main-topic',).on('mouseover', function(){
        showAddButtons( $( this ) );
    });

    $('#main-topic').on('mouseleave', function (){
        $('.add-button').css('display', 'none');
    });

    $('.add-button').on('mouseover', function(){
        $( $( this )).css('display', 'block');
    });

    $('.add-button').on('mouseleave', function(){
        $('.add-button').css('display', 'none');
    });


    /**
     * Add child node events
     */
    $('.add-button').on('click', function() {
        var $parent = $('#' + $( this ).attr('data-node'));

        var $child = addChildNode(
            $parent,
            $( this ).attr('data-position')
        );

        $('li[type="node"]').on('mouseover', function(){
            showAddButtons( $( this ) );
        });

        $('li[type="node"]').on('mouseleave', function () {
            $('.add-button').css('display', 'none');
        });

        addPathToChild( $child, $parent );

        $child.draggable({
            stop: function(event, ui) {
                changePathPosition( $(this), $parent );
            }
        });
    });
});


/**
 * Move main topic node to the center of the page
 */
function centerMainTopic(){
    var $mainTopic = $('#main-topic');
    var width = parseInt($mainTopic.css('width'));
    var height = parseInt($mainTopic.css('height'));
    var position = {
        x: ((window.innerHeight - height) / 2),
        y: ((window.innerWidth - width) / 2)
    };

    $mainTopic.css('top', position.x);
    $mainTopic.css('left', position.y);
}


/**
 * Prepare and show addButtons for selected node
 *
 * @param $node
 */
function showAddButtons( $node ) {
    var addButtons = $('.add-button');

    $.each( addButtons, function( key, item ) {
        var $button = $('#' + item.getAttribute('id'));
        var position = getAddPosition(
            $node,
            item.getAttribute('data-position')
        );

        $button.css('top', position.top);
        $button.css('left', position.left);
        $button.attr('data-node', $node.attr('id'));
    });

    if( $node.is('#main-topic') ){
        addButtons.css('display', 'block');
    } else {
        var nodePosition = $node.attr('data-position');
        var button = $('.add-button[data-position="' + nodePosition + '"]');
        button.css('display', 'block');
    }
}


/**
 * Returns addButton positions for selected node
 *
 * @param $node
 * @param position
 * @returns {{top: number, left: number}}
 */
function getAddPosition( $node, position ){
    var offset = $node.offset();
    var addButtonSize = 26 / 2;
    var width = parseInt($node.css('width'));
    var height = parseInt($node.css('height'));


    if( position === 'left'){
        return {
            top: (offset.top + height / 2) - addButtonSize,
            left: offset.left  - addButtonSize,
            position: 'left',
            positionB: 'right'
        }
    }

    if( position === 'up'){
        return {
            top: offset.top  - addButtonSize,
            left: (offset.left + width / 2) - addButtonSize,
            position: 'up',
            positionB: 'bottom'
        }
    }

    if( position === 'bottom'){
        return {
            top: offset.top + height  - addButtonSize,
            left: (offset.left + width / 2) - addButtonSize,
            position: 'bottom',
            positionB: 'up'
        }
    }

    if( position === 'right'){
        return {
            top: (offset.top + height / 2) - addButtonSize,
            left: offset.left + width  - addButtonSize,
            position: 'right',
            positionB: 'left'
        }
    }
}


/**
 * Create and add child node to site
 *
 * @param $parent
 * @param position
 *
 * @returns object
 */
function addChildNode( $parent, position ) {
    //var childNode = $('<div type="node">Your text</div>');
    //TODO - changed to ul list
    if( getNumberOfChildren( $parent, position ) > 0 ){
        list = ;
    }

    var list = $('<ul></ul>');
    var childNode = $('<li type="node">Your text</li>');

    var childPosition = getChildPosition( $parent, position );
    var positionLeft = childPosition.left;
    var positionTop = childPosition.top;

    childNode.uniqueId();

    childNode.attr('data-parent', $parent.attr('id'));
    childNode.attr('class', 'node');
    childNode.attr('data-position', position);
    childNode.attr('data-level', parseInt($parent.attr('data-level')) + 1);
    childNode.css('left', positionLeft);
    childNode.css('top', positionTop);
    childNode.css('position', 'absolute');


    //TODO - changed
    list.append(childNode);
    $('#mind-map').append(list);

    return childNode;
}


/**
 *
 * @param $parent
 * @param position
 * @returns {{left: *, top: *}}
 */
function getChildPosition( $parent, position ){
    var distance = 100;
    var parentWidth = parseInt($parent.css('width'));
    var margin = 20;
    var parentPosition = $parent.offset();
    var positionLeft = parentPosition.left;
    var siblings = getArrayOfChildren( $parent, position );
    var positionTop = parentPosition.top - margin;

    if(position === 'left'){
        positionLeft = positionLeft - 120 - distance;
    }

    if(position === 'right'){
        positionLeft = positionLeft + parentWidth + distance;
    }

    if( siblings.length > 0 ){
        var lastChild = $(siblings[siblings.length - 1]);
        var childPosition = lastChild.offset();

        positionTop = childPosition.top + parseInt(lastChild.css('height'));
    }

    return {left: positionLeft, top: positionTop };
}


/**
 * Returns array of child node objects
 *
 * @param $parent
 * @param position
 * @returns {*|jQuery|HTMLElement}
 */
function getArrayOfChildren( $parent, position ){
    return $('li[type="node"][data-parent="' +
        $parent.attr('id') + '"][data-position="' +
        position + '"'
    );
}


/**
 * Returns array of child node objects
 *
 * @param $parent
 * @param position
 * @returns integer
 */
function getNumberOfChildren( $parent, position ){
    var children = $('li[type="node"][data-parent="' +
        $parent.attr('id') + '"][data-position="' +
        position + '"'
    );

    return children.length();
}

/**
 * Returns path positions for selected node and child
 *
 * @param $parent
 * @param $child
 *
 * @returns {{top: number, left: number}}
 */
function getPathPosition( $child, $parent ){
    var position = $child.attr('data-position');

    /** Parent */
    var parentOffset = $parent.offset();
    var parentWidth = parseInt($parent.css('width'));
    var parentHeight = parseInt($parent.css('height'));
    var parentLeft = Math.round(parentOffset.left);


    /** Child */
    var childOffset = $child.offset();
    var childWidth = parseInt($child.css('width'));
    var childHeight = parseInt($child.css('height'));
    var childLeft = Math.round(childOffset.left + (childWidth));

    if( position === 'right' ){
        parentLeft = parentLeft + parentWidth;
        childLeft = childLeft - childWidth;
    }

    return {
        parentTop: Math.round(parentOffset.top + (parentHeight / 2)),
        parentLeft: parentLeft,
        childTop: Math.round(childOffset.top + (childHeight / 2)),
        childLeft: childLeft
    };
}


/**
 * Connects parent and child node with line
 *
 * @param $child
 * @param $parent
 */
function addPathToChild( $child, $parent ){
    var pathPosition = getPathPosition($child, $parent);

    var path = draw.path(
        'M' + pathPosition.parentLeft + ' ' +
        pathPosition.parentTop + ' L' +
        pathPosition.childLeft + ' ' +
        pathPosition.childTop
    );
    path.fill('none');
    path.stroke({
        color: colors[colorNumber],
        width: 10,
        linecap: 'round',
        linejoin: 'round'
    });
    path.attr('data-parent', $parent.attr('id'));
    path.attr('data-child', $child.attr('id'));

    if(colorNumber === Object.keys(colors).length){
        colorNumber = 0;
    }

    colorNumber++;
}


/**
 * Connects parent and child node with line
 *
 *  TODO    - NOT WORKING
 *
 * @param $child
 * @param $parent
 */
function changePathPosition( $child, $parent ){
    var children = $('path[data-child="' + $parent.attr('id') + '"]');
    var parents = $('path[data-parent="' + $parent.attr('id') + '"]');
    var paths = $.merge(children, parents);

    console.log(children);
    console.log($child.attr('id'));
    console.log($parent.attr('id'));
    console.log('path[data-child="' + $child.attr('id') + '"]');
    console.log('path[data-parent="' + $child.attr('id') + '"]');

    $.each( paths, function( key, item ) {
        var pathPosition = getPathPosition($child, $parent);

        $(this).attr('d',
            'M' + pathPosition.parentLeft + ' ' +
            pathPosition.parentTop + ' L' +
            pathPosition.childLeft + ' ' +
            pathPosition.childTop
            );
    });
}
