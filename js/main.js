function initToolTip(){
    $('[rel=tooltip]').mouseover(function(e) {
        //Grab the title attribute's value and assign it to a variable
        var tip = $(this).attr('data-texttooltip');    
        //Append the tooltip template and its value
        $("body").append('<div class="tooltip">' + tip + '</div>');        
        //Set the X and Y axis of the tooltip
        $('.tooltip').css('top', e.pageY  - 5 );
        $('.tooltip').css('left', e.pageX  - 83 );
        //Show the tooltip with faceIn effect
        $('.tooltip').fadeIn('500');
    }).mousemove(function(e) {
        //Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
        $('.tooltip').css('top', e.pageY  - 5 );
        $('.tooltip').css('left', e.pageX  - 83 );
    }).mouseout(function() {
        //Remove the appended tooltip template
        $("body").children('div.tooltip').remove();
    });   
}

$(document).ready(function() {
    initToolTip();
});
