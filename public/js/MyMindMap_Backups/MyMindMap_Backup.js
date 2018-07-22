function changePosition(){
    wrap = $(".content-wrapper");
    button = $("#node1").parent();
    wWidth = wrap.width();
    wHeight = wrap.height();
    buttonHeight = button.height();
    buttonWidth = button.width();
    topPosition = (wHeight - buttonHeight) / 2;
    leftPosition = (wWidth - buttonWidth) / 2;

    button.parent().css({position: 'relative'});
    button.css({top: topPosition, left: leftPosition, position:'relative'});
}

function getCorner(){
    test = $("#test");
    button = $("#node1");
    width = button.width();
    height = button.height();
    topPoint = button.position().top + (height / 2);
    leftPoint = button.position().left + (width / 2);


    test.css({top: topPoint, left: leftPoint, position:'absolute'});
}




/**
 * Returns angles positions of the node
 * (used in connect() function)
 *
 * @param el
 *
 * @returns {{left: *, top: *, width: (*|number), height: (*|number)}}
 */
function getOffset( el ) {
    var rect = el[0].getBoundingClientRect();

    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}


/**
 * Returns length, angle, start and end position of the line
 *
 * @param parentNode
 * @param childNode
 * @param thickness
 * @param side
 *
 * @returns {{length: number, cx: number, cy: number, angle: number}}
 */
function getLinePosition(parentNode, childNode){
    var thickness = 4;
    var offsetChild = getOffset(childNode);
    var offsetParent = getOffset(parentNode);
    var x1, y1, x2, y2;

    //Check if child node is on the left or on the right side
    if( offsetChild.left < offsetParent.left ){
        x1 = offsetChild.left + offsetChild.width;
        y1 = offsetChild.top +  offsetChild.height + 5; //(offsetChild.height / 2);

        x2 = offsetParent.left;
        y2 = offsetParent.top + offsetParent.height + 5;
    } else {
        x1 = offsetChild.left;
        y1 = offsetChild.top + offsetChild.height + 5;//(offsetChild.height / 2);

        x2 = offsetParent.left + offsetChild.width + (thickness * 2);
        y2 = offsetParent.top + offsetParent.height + 5;//(offsetParent.height / 2);
    }

    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));

    return {
        length: length,
        cx: ((x1 + x2) / 2) - (length / 2),
        cy: ((y1 + y2) / 2) - (thickness / 2),
        angle: Math.atan2( ( y1-y2 ), ( x1-x2 )) * ( 180 / Math.PI ),
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }
}


/**
 * Connects node with its children with line
 *
 * @param parentNode
 * @param childNode
 * @param color
 * @param thickness
 * @param side
 */
function connect(parentNode, childNode, color) {
    var position = getLinePosition(parentNode, childNode);

    /*var htmlLine = $("<div type='line' " +
            "data-line-parent='" + parentNode.attr('id') + "' " +
            "data-line-child='" + childNode.attr('id') + "' " +
            "style='padding:0px; margin:0px; " +
            "height:4px; " +
            "background-color:" + color + "; " +
            "line-height:1px; position:absolute; " +
            "left:" + position.cx + "px; top:" + position.cy + "px; " +
            "width:" + position.length + "px; " +
            "-moz-transform:rotate(" + position.angle + "deg); " +
            "-webkit-transform:rotate(" + position.angle + "deg); " +
            "-o-transform:rotate(" + position.angle + "deg); " +
            "-ms-transform:rotate(" + position.angle + "deg); " +
            "transform:rotate(" + position.angle + "deg);' " +
        "/>");

    htmlLine.uniqueId();
    $('body').append(htmlLine);*/

    var xxx = $('#xxx');
    console.log(position);
    xxx.attr('d', 'M' + position.y1 + ',' + position.y2 +
        ' L' + position.x1 + ',' + position.x2 + '');
}


/**
 *
 * @param nodeId
 */
function reConnectNodeLines( nodeId ){
    var linesChildren = $("div[type='line'][data-line-child='" + nodeId + "']");
    var linesParents = $("div[type='line'][data-line-parent='" + nodeId + "']");
    var lines = $.merge( linesChildren, linesParents);

    lines.each(function() {
        var parentNode = $('div[id="' + $( this ).attr('data-line-parent') + '"');
        var childNode = $('div[id="' + $( this ).attr('data-line-child') + '"');
        var lineId = $( this ).attr('id');
        var height = $( this ).css("height");

        var position = getLinePosition(
            parentNode,
            childNode,
            parseInt(height, 10));
        var htmlLine = $('#' + lineId);
        var rotation = 'rotate(' + position.angle + 'deg)';

        htmlLine.css('left', position.cx + 'px');
        htmlLine.css('top', position.cy + 'px');
        htmlLine.css('width', position.length + 'px');
        htmlLine.css('-moz-transform', rotation);
        htmlLine.css('-webkit-transform', rotation);
        htmlLine.css('-o-transform', rotation);
        htmlLine.css('-ms-transform', rotation);
        htmlLine.css('transform', rotation);
    });

    getPosition();
}


/**
 *
 * @param parentNode
 */
function addChildNode( parentNode ){
    var parentKey = parentNode.attr('id');

    var childNode = $(
        "<div type='node' data-parent='" + parentKey + "'" +
       " class='btn btn-success context-menu'>" +
       " Text</div>"
    );

    childNode.uniqueId();

    $( '.content-wrapper' ).append( childNode );
    childNode.draggable();

    connect( parentNode, childNode, parentNode.css('background-color'), 4, 'left');

    childNode.on("mouseup", function( e ){
        reConnectNodeLines( e.target.attributes.id.value );
    });
}


/**
 * Resize actions
 */
$( window ).resize(function(){

});


/**
 * Document ready actions
 */
$( document ).ready( function(){
    var $parentNode = $('#node1');
    var $childNode = $('#node11');
    var $node = $(".btn[type='node']");
    var color = $parentNode.css('background-color');

    //changePosition();
    //connect($parentNode, $childNode, color, 4, 'left');

    $node.draggable();

    $node.on("mouseup", function( e ){
        reConnectNodeLines( e.target.attributes.id.value );
    });

    $(function() {
        $.contextMenu({
            selector: '.context-menu',
            callback: function(key, options) {
                var node = options.$trigger;
                var nodeId = node.attr('id');

                if(key === 'add'){
                    addChildNode( node );
                } else {

                }
            },
            items: {
                "add": {name: "Add child", icon: "add"},
                "rename": {name: "Rename", icon: "input"},
                "edit": {name: "Edit", icon: "edit"},
                copy: {name: "Copy", icon: "copy"},
                "delete": {name: "Delete", icon: "delete"},
                "sep1": "---------",
                "quit": {name: "Quit", icon: function(){
                        return 'context-menu-icon context-menu-icon-quit';
                    }}
            }
        });
    });
});