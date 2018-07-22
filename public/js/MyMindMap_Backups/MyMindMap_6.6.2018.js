var draw;

/**
 * Document ready actions
 */
$( document ).ready( function(){
    $('#wrapper').css('height', window.innerWidth);

    centerMainTopic();

    draw = SVG('paths').size('5000', '5000');

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
        $('.add-button').css('display', 'block');
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

        $('div[type="node"]').on('mouseover', function(){
            showAddButtons( $( this ) );
        });

        $('div[type="node"]').on('mouseleave', function () {
            $('.add-button').css('display', 'none');
        });

        addPathToChild( $child, $parent );
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

    if( $node.attr['type'] === 'main-node' ){
        alert('main');
    }

    //if( $node.attr['type'] === 'main-node' ){
        $('.add-button').css('display', 'block');
    /*} else {
        //var nodePosition = $node.attr('data-position');
        //$('.add-button[data-position="' + nodePosition + '"]').css('display', 'block');
    }*/
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
            left: offset.left  - addButtonSize
        }
    }

    if( position === 'right'){
        return {
            top: (offset.top + height / 2) - addButtonSize,
            left: offset.left + width  - addButtonSize
        }
    }

/*  if( position === 'up'){
        return {
            top: offset.top  - addButtonSize,
            left: (offset.left + width / 2) - addButtonSize
        }
    }

    if( position === 'bottom'){
        return {
            top: offset.top + height  - addButtonSize,
            left: (offset.left + width / 2) - addButtonSize
        }
    }*/
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
    /** Parent */
    var parentOffset = $parent.offset();
    var parentWidth = parseInt($parent.css('width'));
    var parentHeight = parseInt($parent.css('height'));

    /** Child */
    var childOffset = $child.offset();
    var childWidth = parseInt($child.css('width'));
    var childHeight = parseInt($child.css('height'));

    return {
        parentTop: Math.round(parentOffset.top + (parentHeight / 2)),
        parentLeft: Math.round(parentOffset.left + (parentWidth / 2)),
        childTop: Math.round(childOffset.top + (childHeight / 2)),
        childLeft: Math.round(childOffset.left + (childWidth / 2))
    };
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
    var childNode = $('<div type="node">Your text</div>');
    var parentPosition = $parent.offset();
    var parentWidth = parseInt($parent.css('width'));
    var parentHeight = parseInt($parent.css('height'));
    var positionLeft = parentPosition.left;
    var positionTop = parentPosition.top;
    var distance = 100;

    childNode.uniqueId();

    childNode.attr('data-parent', $parent.attr('id'));
    childNode.attr('class', 'node');
    childNode.attr('data-position', position);

    if(position === 'left'){
        positionLeft = positionLeft - 120 - distance;
    }

    if(position === 'right'){
        positionLeft = positionLeft + parentWidth + distance;
    }

    if(position === 'up'){
        positionTop = positionTop - distance;
    }

    if(position === 'bottom'){
        positionTop = positionTop + parentHeight + distance;
    }

    childNode.css('left', positionLeft);
    childNode.css('top', positionTop);
    childNode.css('position', 'absolute');

    $('#wrapper').append(childNode);

    return childNode;
}


/**
 *
 * @param $child
 * @param $parent
 */
function addPathToChild( $child, $parent ){
    var pathPosition = getPathPosition($child, $parent);

    var path = draw.path('M' + pathPosition.parentLeft + ' ' + pathPosition.parentTop + ' L' + pathPosition.childLeft + ' ' + pathPosition.childTop);
    path.fill('none');
    path.stroke({
        color: '#f06',
        width: 10,
        linecap: 'round',
        linejoin: 'round'
    });

    console.log('M' + pathPosition.parentLeft + ' ' + pathPosition.parentTop + ' L' + pathPosition.childLeft + ' ' + pathPosition.childTop);
}
