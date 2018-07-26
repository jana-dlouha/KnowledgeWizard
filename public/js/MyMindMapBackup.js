let draw;
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
let colorNumber = 1;

/**
 * Document ready actions
 */
$( document ).ready( function(){

    /** DONE */
    /*draw = SVG('paths').size('100%', '100%');

    $('#wrapper').css('top', (-2500 + (screen.height / 2) - 300));
    $('#wrapper').css('left', (-2500 + (screen.width / 2) - 500));
    $('#wrapper').attr('mind-map-id', 1); //TODO - mind map id ajax
    $('#wrapper').attr('mind-map-name', 'MyMindMap'); //TODO - mind map id ajax
*/
    // let oldOffset, newOffset;
    /*
        $('#wrapper').draggable({
            //stop: function() {}
        });*/

    /*$('#main-topic').draggable({
        start: function() {
            $('.add-button').css('display', 'none');
            oldOffset = $( this ).offset();
        },
        stop: function() {
            newOffset = $( this ).offset();
            changeChildrenPositions( $(this), oldOffset, newOffset );
            changeChildrenPathsPosition( $(this) );
        }
    });*/


    /**
     * Add button events and positioning
     */
    $('#main-topic')
        /*.on('mouseover', function(){
            showAddButtons( $( this ) );
        })
        .on('mouseleave', function (){
            $('.add-button').css('display', 'none');
        })*/
        .on('dblclick', function (){
            showTextInputDialog( $(this) );
        })
        /*.on('mouseover', function(){
            $( $( this )).css('display', 'block');
        })
        .on('mouseleave', function(){
            $('.add-button').css('display', 'none');
        });*/


    /**
     * Add child node events
     */
    $('.add-button').on('click', function() {
        /*let $parent = $('#' + $( this ).attr('data-node'));
        let $child = addChildNode(
            $parent,
            $( this ).attr('data-position')
        );

        /!**
         * Show and hide add buttons for new child
         *!/
        $('div[type="node"]').on('mouseover', function(){
            showAddButtons( $( this ) );
        });

        $('div[type="node"]').on('mouseleave', function () {
            $('.add-button').css('display', 'none');
        });*/

        /** Change node text */
        $('div[type="node"]').on('dblclick', function () {
            showTextInputDialog( $(this) );
        });

        /*addPathToChild( $child, $parent );

        let oldOffset, newOffset;

        $child.draggable({
            start: function() {
                oldOffset = $( this ).offset();
            },
            stop: function() {
                newOffset = $( this ).offset();
                changeChildrenPositions( $(this), oldOffset, newOffset );
                changeParentPathPosition( $(this), $parent );
                changeChildrenPathsPosition( $(this), $parent );
            }
        });*/
    });
});


/**
 * DONE
 *
 * Returns addButton positions for selected node
 *
 * @param $node
 * @param position
 *
 * @returns {{top: number, left: number}}
 */
function getAddPosition( $node, position ){
    let nodeOffset = $node.offset();
    let wrapperOffset = $('#wrapper').offset();

    let offsetTop = nodeOffset.top - wrapperOffset.top;
    let offsetLeft = nodeOffset.left - wrapperOffset.left;
    let addButtonSize = parseInt($node.css('height')) / 2;
    let width = parseInt($node.css('width'));
    let height = parseInt($node.css('height'));

    if( position === 'left' ){
        return {
            top: offsetTop + (height / 2),
            left: offsetLeft  - addButtonSize,
            position: 'left'
        }
    }

    if( position === 'right' ){
        return {
            top: (offsetTop + height / 2),
            left: offsetLeft + width  - addButtonSize,
            position: 'right'
        }
    }
}


/**
 * DONE
 *
 * Prepare and show addButtons for selected node
 *
 * @param $node
 */
function showAddButtons( $node ) {
    let addButtons = $('.add-button');

    $.each( addButtons, function( key, item ) {
        let $button = $('#' + item.getAttribute('id'));
        let position = getAddPosition(
            $node,
            item.getAttribute('data-position')
        );

        $button.css('top', position.top);//position.top);
        $button.css('left', position.left);//position.left);
        $button.attr('data-node', $node.attr('id'));
    });

    if( $node.is('#main-topic') ){
        addButtons.css('display', 'block');
    } else {
        let nodePosition = $node.attr('data-position');
        let button = $('.add-button[data-position="' + nodePosition + '"]');
        button.css('display', 'block');
    }
}




/**
 * DONE
 *
 * Create and add child node to site
 *
 * @param $parent
 * @param position
 *
 * @returns object
 */
function addChildNode( $parent, position ) {
    let wrapperOffset = $('#wrapper').offset();
    let childNode = $('<div type="node">Your text</div>');
    let childPosition = getChildPosition( $parent, position );
    childPosition.left -= wrapperOffset.left;
    childPosition.top -= wrapperOffset.top;

    childNode.uniqueId();

    childNode.attr('data-parent', $parent.attr('id'));
    childNode.attr('class', 'node');
    childNode.addClass('node-context-menu');
    childNode.attr('data-position', position);
    childNode.attr('data-level', parseInt($parent.attr('data-level')) + 1);
    childNode.css('left', childPosition.left);
    childNode.css('top', childPosition.top);
    childNode.css('position', 'absolute');
    childNode.css('background-color', getColor($parent));
    childNode.css('border', '2px solid white');

    $('#wrapper').append(childNode);

    return childNode;
}


/**
 * DONE
 *
 * @param $parent
 * @param position
 *
 * @returns {{left: *, top: *}}
 */
function getChildPosition( $parent, position ){
    let distance = 50;
    let margin = 20;
    let parentWidth = parseInt($parent.css('width'));
    let parentPosition = $parent.offset();
    let positionTop = parentPosition.top - margin;
    let positionLeft = parentPosition.left;
    let siblings = getArrayOfChildren( $parent, false, position );

    if(position === 'left'){
        positionLeft = positionLeft - 120 - distance;
    }

    if(position === 'right'){
        positionLeft = positionLeft + parentWidth + distance;
    }

    positionTop = positionTop - 100;

    if( siblings.length > 0 ){

        let lastChild = $(siblings[siblings.length - 1]);
        let childPosition = lastChild.offset();

        positionTop = childPosition.top + parseInt(lastChild.css('height'));
    }

    return {
        left: positionLeft,
        top: positionTop
    };
}


/**
 * DONE
 *
 *
 * @param $node
 * @param oldOffset
 * @param newOffset
 */
function changeChildrenPositions( $node, oldOffset, newOffset ){
    let wrapperOffset = $('#wrapper').offset();
    let diffLeft = newOffset.left - oldOffset.left;
    let diffTop = newOffset.top - oldOffset.top;
    let children = getArrayOfChildren( $node );
    let childOffset, leftMargin, topMargin;

    if( !children || children.length < 1){
        return;
    }

    $.each( children, function() {
        childOffset = $( this ).offset();
        leftMargin = parseInt( $( this ).css('margin-left') );
        topMargin = parseInt( $( this ).css('margin-top') );

        $( this ).css('left',
            (childOffset.left - wrapperOffset.left + diffLeft - leftMargin)
        );
        $( this ).css('top',
            (childOffset.top - wrapperOffset.top + diffTop - topMargin)
        );

        /** Recursive for branch */
        changeChildrenPositions( $( this ), oldOffset, newOffset );
    });
}




/**
 * TODO - will I need this?
 *
 * Returns array of child node objects
 *
 * @param $parent
 * @param main true if node is main topic
 * @param position
 *
 * @returns {*|jQuery|HTMLElement}
 */
function getArrayOfChildren( $parent, main = false, position = $parent.attr('data-position') ){
    if(main){
        return $('div[type="node"][data-parent="main-topic"]');
    }

    return $('div[type="node"][data-parent="' +
        $parent.attr('id') + '"][data-position="' +
        position + '"'
    );
}




/**
 * DONE
 *
 * Connects parent and child node with line
 *
 * @param $child
 * @param $parent
 */
function addPathToChild( $child, $parent ){
    let pathPosition = getPathPosition($child, $parent);
    let pathColor = getColor($parent);

    let path = draw.path(
        'M' + pathPosition.parentLeft + ' ' +
        pathPosition.parentTop + ' L' +
        pathPosition.childLeft + ' ' +
        pathPosition.childTop
    );
    path.fill('none');
    path.stroke({
        color: pathColor,
        width: 10,
        linecap: 'round',
        linejoin: 'round'
    });
    path.attr('data-parent', $parent.attr('id'));
    path.attr('data-child', $child.attr('id'));
    $child.attr('data-branch-color', pathColor);
}


/**
 * DONE
 *
 * Returns path positions for selected node and child
 *
 * @param $parent
 * @param $child
 *
 * @returns {{parentTop: number, parentLeft: number, childTop: number, childLeft: number}}
 */
function getPathPosition( $child, $parent ){
    let position = $child.attr('data-position');
    let wrapperOffset = $('#wrapper').offset();

    /** Parent */
    let parentOffset = $parent.offset();
    parentOffset.left = parentOffset.left - wrapperOffset.left;
    parentOffset.top = parentOffset.top - wrapperOffset.top;
    let parentWidth = parseInt($parent.css('width'));
    let parentHeight = parseInt($parent.css('height'));
    let parentLeft = parentOffset.left;


    /** Child */
    let childOffset = $child.offset();
    childOffset.left = childOffset.left - wrapperOffset.left;
    childOffset.top = childOffset.top - wrapperOffset.top;
    let childWidth = parseInt($child.css('width'));
    let childHeight = parseInt($child.css('height'));
    let childLeft = childOffset.left + childWidth;

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
 * TODO - get branch color
 *
 *
 * @param $node
 * @returns {*}
 */
function getColor( $node ){
    let branchColor;

    if( branchColor = $node.attr('data-branch-color')){
        return branchColor;
    }

    if(colorNumber === Object.keys(colors).length){
        colorNumber = 0;
    }

    colorNumber++;

    return colors[colorNumber];
}


/**
 * DONE
 *
 * Connects parent and child node with line
 *
 * @param $child
 * @param $parent
 */
function changeParentPathPosition( $child, $parent ) {
    let childId = $child.attr('id');
    let parentId = $parent.attr('id');

    /** Parent path */
    let pathPosition = getPathPosition($child, $parent);
    let parentPath = $('path' +
        '[data-parent="' + parentId + '"]' +
        '[data-child="' + childId + '"]');

    parentPath.attr('d',
        'M' + pathPosition.parentLeft + ' ' +
        pathPosition.parentTop + ' L' +
        pathPosition.childLeft + ' ' +
        pathPosition.childTop
    );
}


/**
 * DONE
 *
 * Connects parent and child node with line
 *
 * @param $child
 * @param $parent
 */
function changeChildrenPathsPosition( $child, $parent = 0 ){
    let childId, parentId;
    let children = getArrayOfChildren( $child );

    $.each( children, function() {
        childId = $( this ).attr('id');
        parentId = $child.attr('id');

        let pathPosition = getPathPosition( $( this ), $child);
        let parentPath = $('path' +
            '[data-parent="' + parentId + '"]' +
            '[data-child="' +  childId + '"]');

        parentPath.attr('d',
            'M' + pathPosition.parentLeft + ' ' +
            pathPosition.parentTop + ' L' +
            pathPosition.childLeft + ' ' +
            pathPosition.childTop
        );

        /** Recursive for branch */
        changeChildrenPathsPosition( $( this ), $child );
    });
}


/**
 * TODO - collapse branch
 *
 * @param $parent
 */
function collapseBranch( $parent ){
    let children = getArrayOfChildren($parent);

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
 * TODO - expand branch
 *
 * @param $parent
 */
function expandBranch( $parent ){
    let children = getArrayOfChildren($parent);

    $.each( children, function() {
        $(this).css('display', 'block');

        addPathToChild( $(this), $parent);

        expandBranch( $(this) );
    });
}


/**
 * TODO
 *
 * @param $parent
 */
function deleteBranch( $parent ){
    let children = getArrayOfChildren($parent);
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


/** ------------------------------------------------ */
/** ------------------- DIALOGS -------------------- */
/** ------------------------------------------------ */

/**
 * TODO - text input dialog
 *
 * @param $node
 */
function showTextInputDialog( $node ){
    let dialog = $( "#text-input-dialog" ).dialog({
        autoOpen: true,
        modal: true,
        buttons: {
            "OK": function(){
                $node.text($('#text-input').val());
                dialog.dialog( "close" );
            },
            Cancel: function() {
                dialog.dialog( "close" );
            }
        }
    });
}


/**
 * TODO - URL input dialog
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
 * TODO - context menu
 *
 * Nodes context menu
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

    })
});


/** TODO */
/** ------------------------------------------------ */
/** --------------------- API ---------------------- */
/** ------------------------------------------------ */

//TODO - last access pro foreach map so i can delete old maps
//TODO - and i can delete untitled maps

function newMindMap() {
    //TODO - create untitled map in database so i can save
    //TODO - nodes to existing map
}


/**
 * TODO
 */
function saveMindMap(){
    let url = $('#wrapper').attr('data-script');
    let nodes = $('#main-topic, .node');
    let data;
    let convertedArray = [];
    let wrapperOffset = $('#wrapper').offset();

    nodes.push($('#main-topic'));
    nodes.push($('.node'));

    $.each( nodes, function() {
        data = {
            "id": $(this).attr('id'),
            "class": $(this).attr('class'),
            "parent": $(this).attr('data-parent'),
            "position": $(this).attr('data-position'),
            "level": $(this).attr('data-level'),
            "branch-color": $(this).attr('data-branch-color'),
            "position-top": parseInt($(this).css('top')),
            "position-left": parseInt($(this).css('left')),
            "color": $(this).css('background-color'),
            "border": $(this).css('border'),
            "width": parseInt($(this).css('width')),
            "height": parseInt($(this).css('height')),
            "text": $(this).text(),
            "url": $(this).attr('data-url')
        };

        convertedArray.push(data);
    });

    var request = $.ajax({
        type: "POST",
        url: url,
        data: {
            'data': {
                'nodes': convertedArray,
                'wrapper': {
                    'top': wrapperOffset.top,
                    'left': wrapperOffset.left,
                    'mind-map-id': $('#wrapper').attr('mind-map-id'),
                    'mind-map-name': $('#wrapper').attr('mind-map-name'),
                }
            }
        },
        dataType: 'application/json; charset=UTF-8'
    });

    request.done(function( msg ) {
        console.log( msg );
    });

    request.fail(function( jqXHR, textStatus, msg ) {
        console.log( "Request failed: " + textStatus );
        console.log(jqXHR.responseText);
    });

    console.log('ajax done');
}


/**
 * TODO
 */
function loadMindMap(){

}