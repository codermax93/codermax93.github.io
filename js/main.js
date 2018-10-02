$("#range-02").ionRangeSlider({
    min: 10000,
    max: 1000000,
    from: 500000,
    hide_from_to: true,
});

$("#range-03").ionRangeSlider({
    min: 12,
    max: 48,
    from: 24,
    hide_from_to: true,
});

$('.testimonials-slider').owlCarousel({
    loop: true,
    nav: true,
    items: 1,
    navText: false,
    nav: true,
});

var itemsNum = 0;

var owl = $('.owl-carousel');

owl.on('initialized.owl.carousel', function (event) {
    var itemCount = event.item.count;
    var size = event.page.size;
    var dragLength = 100 / (itemCount / size);

    $("#range").ionRangeSlider({
        type: "single",
        min: 1,
        max: itemCount - (size - 1),
        keyboard: true,
        step: 1,
        hide_from_to: true,
        hide_min_max: true,
        onChange: function (data) {
            owlTo = (data.from) - 1;
            // console.log("Позиция ползунка: " + owlTo);
            owl.trigger('to.owl.carousel', [owlTo, 500, true]);
        }
    });

    $('.irs-slider.single').css('width', dragLength + "%")

});

//Слайдер
owl.owlCarousel({
    loop: true,
    center: true,
    mouseDrag: true,
    margin: 10,
    slideBy: 1,
    items: 8,
    responsiveClass: true,
    responsive: {
        0: {
            items: 2
        },
        500: {
            items: 3
        },
        600: {
            items: 4
        },
        700: {
            items: 4
        },
        800: {
            items: 4
        },
        900: {
            items: 4
        },
        1000: {
            items: 4
        }
    }
});

owl.on('dragged.owl.carousel', function (event) {
    var itemCount = event.item.count;
    var size = event.page.size;
    var dragLength = 100 / (itemCount / size);
    var index = event.item.index;
    //Fix for loop carousel
    var carousel = owl.data('owl.carousel');
    if(carousel.options.loop) {
        var tempFix = index - (event.relatedTarget.clones().length / 2) + 1;
        if (tempFix > event.relatedTarget.clones().length) {
            index = tempFix - event.relatedTarget.clones().length;
        } else {
            index = tempFix;
        }
    }
    $("#range").data("ionRangeSlider").update({
        from: index
    });
    $('.irs-slider.single').css('width', dragLength + "%");
});

owl.on('resized.owl.carousel', function (event) {
    var itemCount = event.item.count;
    var size = event.page.size;

    var curItem = event.item.index + 1;
    var dragLength = 100 / (itemCount / size);
    $("#range").data("ionRangeSlider").update({
        max: itemCount - (size - 1),
        from: curItem
    });
    $('.irs-slider.single').css('width', dragLength + "%");
});

$("ul.nav-tabs a").click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});


(function($){
    $(window).on("load",function(){        
        $("#myTab, #tab-content-in, .tab-wrap, .tab-content-wrap").mCustomScrollbar({
            setHeight: 500,
        });
        
    });
})(jQuery);


$(window).bind('scroll', function () {
    var num = 200;

    if ($(window).scrollTop() > num) {
        $('.header, .section-1').addClass('fixed');
    } else {
        $('.header, .section-1').removeClass('fixed');
    }
});

$(document).ready(function() {
	$('a[rel="relativeanchor"]').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top - 150
	    }, 1000);
	    return false;
	}); 
});

$('#input-tell-call').mask('+7 (000) 000-00-00');

$('.custom-navbar li a').click(function (e) {
    $('.navbar-collapse').collapse('toggle');
});

$(document).ready(function() {
    $('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-minus"></i>');
    });
    $('.collapse').on('hide.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-plus"></i>');
    });
});