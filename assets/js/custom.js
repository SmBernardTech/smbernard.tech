/*=========== TABLE OF CONTENTS ===========
###Preloader
1. Smooth scrolling: side effects only, the browser does the scrolling
   // Scrollspy
   // Mobile Navigation
2. Scroll Top link
3. owl carousel
======================================*/


// revealPage: Drop the preloader & unlock scrolling. Safe to call twice.
function revealPage() {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({ 'overflow': 'visible' });
}

$(window).on('load', revealPage); // makes sure the whole site is loaded

// Failsafe: Stalled image or blocked script must never leave the page locked
window.setTimeout(revealPage, 5000);


// syncToggle: Keep the mobile button's name & state matched to the drawer
function syncToggle() {
    var open = $('body').hasClass('mobile-nav-active');
    $('#mobile-nav-toggle')
        .attr('aria-expanded', String(open))
        .attr('aria-label', open ? 'Close menu' : 'Open menu');
}



// 1. Smooth scrolling
$(document).ready(function() {
    $(function() {
        // Scrolling: Browser handles it now, via scroll-behavior & scroll-margin-top
        // in style.css. This only covers the side effects of an in-page jump.
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') != this.pathname.replace(/^\//, '') || location.hostname != this.hostname) {
                return;
            }

            if (!$(this.hash).length) { return; }

            if ($(this).parents('.nav-menu').length) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
            }

            if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                $('#mobile-body-overly').fadeOut();
                syncToggle();
            }
        });
    });

    // Scrollspy: Highlight the nav link for the section in view (same-page links only)
    var $spyLinks = $('.nav-menu a[href^="#"]');

    function updateScrollspy() {
        var header = document.getElementById('header');
        var scrollTop = $(window).scrollTop();
        var currentHash = null;

        // activeLine: Just below wherever the header's bottom edge sits, stuck or not, plus a little lead
        var activeLine = scrollTop + (header ? header.getBoundingClientRect().bottom : 0) + 100;

        // Links are in page order, so the last section whose top has passed the line wins
        $spyLinks.each(function() {
            var target = $(this.hash);
            if (target.length && target.offset().top <= activeLine) {
                currentHash = this.hash;
            }
        });

        // At the very bottom, the last section may be too short to reach the top
        if (scrollTop + $(window).height() >= $(document).height() - 2) {
            currentHash = $spyLinks.last().attr('href');
        }

        $('.nav-menu li, #mobile-nav li').removeClass('menu-active');
        // Above the first section (the banner), nothing is highlighted
        if (currentHash) {
            $('.nav-menu a[href="' + currentHash + '"], #mobile-nav a[href="' + currentHash + '"]').closest('li').addClass('menu-active');
        }
    }

    if ($spyLinks.length) {
        $(window).on('scroll resize load', updateScrollspy);
        updateScrollspy();
    }

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav' });
        $mobile_nav.find('> ul').attr({ 'class': '', 'id': '' });
        $mobile_nav.attr('aria-label', 'Main');
        $('body').append($mobile_nav);
        // Toggle: Icon-only, so name & open state must be spelled out for screen readers
        $('body').prepend('<button type="button" id="mobile-nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><i class="fa fa-bars" aria-hidden="true"></i></button>');
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
            syncToggle();
        });

        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                    syncToggle();
                }
            }
        });

        // Escape: Close the drawer & hand focus back to the button that opened it
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                $('#mobile-body-overly').fadeOut();
                syncToggle();
                $('#mobile-nav-toggle').focus();
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // 2. Scroll Top link
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrolltop').fadeIn();
        } else {
            $('.scrolltop').fadeOut();
        }
    });

    // 3. owl carousel

    // i. skill (carousel)

    // Reduced motion: Start the strip parked, honoured before anything moves
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!$('#skill').length || !$.fn.owlCarousel) { return; }

    $('#skill').owlCarousel({
        items: 6,
        loop: true,
        margin: 20,
        dots: false,
        autoplay: !reduceMotion,
        autoplayTimeout: 2500,
        autoplayHoverPause: true
    });

    // Pause control: Motion that starts on its own needs a stop
    var $skillPause = $('#skill-pause');

    if ($skillPause.length && $('#skill').length) {
        var playing = !reduceMotion;

        function paintPause() {
            $skillPause
                .attr('aria-pressed', String(!playing))
                .html('<i class="fa-solid ' + (playing ? 'fa-pause' : 'fa-play') + '" aria-hidden="true"></i>' +
                      (playing ? 'Pause' : 'Play'));
        }

        $skillPause.on('click', function() {
            playing = !playing;
            $('#skill').trigger(playing ? 'play.owl.autoplay' : 'stop.owl.autoplay', [2500]);
            paintPause();
        });

        paintPause();
    }
});