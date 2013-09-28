var SiteVars = {
  sliderTimer: 3000,
  currentSlide: null
};

function startPagination(index){
    $(".pagination .pagination-text").removeClass("active");
    if(index===0){
        $(".pagination .pagination-slider").animate({ "width": "0%" }, 0,"linear" );
    }
    var actualSlide = $(".pagination .pagination-slider").eq(index);
    var actualSlideText = $(".pagination .pagination-text").eq(index);
    actualSlideText.addClass("active");
    actualSlide.animate({ "width": "100%" }, SiteVars.sliderTimer,"linear" );
}

function initSlideshow(){
    $('.slider').leanSlider({
        pauseTime: SiteVars.sliderTimer,
        pauseOnHover: true,
        startSlide: 0,
        directionNav: '.slider-direction-nav',
        directionNavPrevBuilder: function(){
            return '<a href="#" class="lean-slider-prev"><img src="img/arrow-prev.png" alt="prev"></a>';
        },
        directionNavNextBuilder: function(){
            return '<a href="#" class="lean-slider-next"><img src="img/arrow-next.png" alt="next"></a>';
        },
        afterChange: function(currentSlide){
            SiteVars.currentSlide=currentSlide;
            startPagination(currentSlide);
        },
        afterLoad: function(){
            $(window).on("pauseTimer",function(){
                $(".pagination .pagination-slider").eq(SiteVars.currentSlide).stop();
            });
            $(window).on("resumeAnim",function(){
                var lenghtSlider=$(".pagination .pagination-slider").eq(SiteVars.currentSlide).width();
                var lenghtPagination= $(".pagination .pagination-item").width();
                var remainingTime= SiteVars.sliderTimer - ((lenghtSlider/lenghtPagination)*SiteVars.sliderTimer);
                $(".pagination .pagination-slider").eq(SiteVars.currentSlide).animate({ "width": "100%" }, remainingTime,"linear" );

                $(window).triggerHandler("resumeTimer",remainingTime);

            });
            $(".slider-direction-nav a").on("click",function(){
                $(".pagination .pagination-slider").stop();
                $(".pagination .pagination-slider").animate({ "width": "0%" }, 0,"linear" );
                for (var i=0;i<SiteVars.currentSlide;i++){
                    var slide = $(".pagination .pagination-slider").eq(i);
                    slide.animate({ "width": "100%" }, 0,"linear" );
                }
                startPagination(SiteVars.currentSlide);
            });
            SiteVars.currentSlide=0;
            startPagination(0);
        }
    });
}

function initToolTip(){
    $('[rel=tooltip]').mouseover(function(e) {
        //Grab the title attribute's value and assign it to a variable
        var tip = $(this).attr('data-texttooltip');
        //Append the tooltip template and its value
        $("body").append('<div class="tooltip">' + tip + '</div>');
        //Set the X and Y axis of the tooltip
        $('.tooltip').css('top', e.pageY  +25 );
        $('.tooltip').css('left', e.pageX  - 83 );
        //Show the tooltip with faceIn effect
        $('.tooltip').fadeIn('500');
    }).mousemove(function(e) {
        //Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
        $('.tooltip').css('top', e.pageY  +25 );
        $('.tooltip').css('left', e.pageX  - 83 );
    }).mouseout(function() {
        //Remove the appended tooltip template
        $("body").children('div.tooltip').remove();
    });
    $('[rel=tooltipCS]').mouseover(function(e) {
        //Grab the title attribute's value and assign it to a variable
        var tip = $(this).attr('data-texttooltip');
        //Append the tooltip template and its value
        $("body").append('<div class="tooltip">' + tip + '</div>');
        //Set the X and Y axis of the tooltip
        $('.tooltip').css('top', e.pageY  + 25 );
        $('.tooltip').css('left', e.pageX  - 57 );
        //Show the tooltip with faceIn effect
        $('.tooltip').fadeIn('500');
    }).mousemove(function(e) {
        //Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
        $('.tooltip').css('top', e.pageY  + 25 );
        $('.tooltip').css('left', e.pageX  - 57 );
    }).mouseout(function() {
        //Remove the appended tooltip template
        $("body").children('div.tooltip').remove();
    });
}
$(document).ready(function() {
    $(".pagination .pagination-slider").stop().animate({ "width": "0%" },0);
    if($('.slider').length != 0){
        initSlideshow();
    }
    initToolTip();
});
