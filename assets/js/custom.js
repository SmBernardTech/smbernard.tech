/*=========== TABLE OF CONTENTS ===========
###Preloader
a. Cookie Consent Modal
1. Smooth scrolling 
2. superfish: Initiate on nav menu
  // Mobile Navigation
  // Stick the header at top on scroll
  // Counting numbers
  // Tooltip & popovers
  // Background image via data tag
  // Background image via data tag
  // jQuery counterUp
3. Scroll Top link
4. owl carousel
======================================*/

// ###Preloader
$(window).on('load', function() { // makes sure the whole site is loaded 
    $('#status').fadeOut(); // will first fade out the loading animation 
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $('body').delay(350).css({ 'overflow': 'visible' });
})

// a. Cookie Consent Modal
$(document).ready(function(){
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false
    });
});

// 1. Smooth scrolling
$(document).ready(function() {
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, 'easeInOutExpo');

                    if ($(this).parents('.nav-menu').length) {
                        $('.nav-menu .menu-active').removeClass('menu-active');
                        $(this).closest('li').addClass('menu-active');
                    }

                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                        $('#mobile-body-overly').fadeOut();
                    }
                    return false;
                }
            }
        });
    });

    // 2. superfish: Initiate on nav menu
    $('.nav-menu').superfish({
        animation: { opacity: 'show' },
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        let $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav' });
        $mobile_nav.find('> ul').attr({ 'class': '', 'id': '' });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function(e) {
            let container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Stick the header at top on scroll
    $("#header").sticky({ topSpacing: 0, zIndex: '50' });

    // Counting numbers
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // Background image via data tag
    $('[data-block-bg-img]').each(function() {
        // @todo - invoke backstretch plugin if multiple images
        let $this = $(this),
            bgImg = $this.data('block-bg-img');

        $this.css('backgroundImage', 'url(' + bgImg + ')').addClass('block-bg-img');
    });

    // jQuery counterUp
    if (jQuery().counterUp) {
        $('[data-counter-up]').counterUp({
            delay: 20,
        });
    }
    
    // 3. Scroll Top link
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrolltop').fadeIn();
        } else {
            $('.scrolltop').fadeOut();
        }
    });

    $('.scrolltop, #logo a').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000, 'easeInOutExpo');
        return false;
    });

    // 4. owl carousel

    // i. skill (carousel)
    $('#skill').owlCarousel({
        items: 6,
        loop: true,
        margin: 20,
        dots: false,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true

        //     responsive:{
        //         0:{
        //             items:2
        //         },
        //         415:{
        //             items:2
        //         },
        //         600:{
        //             items:4

        //         },
        //         1199:{
        //             items:4
        //         },
        //         1200:{
        //             items:6
        //         }
        //     }
        // });
    });
});