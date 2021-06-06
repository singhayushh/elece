$(document).ready(function () {

    // Header border on scroll
    $(window).on('scroll', function () {
        stop = Math.round($(window).scrollTop());
        if (stop > $('header').height()) {
            $('header').css({
                'border-bottom': '1px solid rgba(100, 100, 100, 0.1)',
            });
        } else {
            $('header').css({
                'border-bottom': '1px solid transparent',
            });
        }
    });

    // Change nav to dropdown
    var ww = document.body.clientWidth;
    if (ww <= 890) {
        $('.menu').addClass('dropdown');
    } else if (ww > 890) {
        $('.menu').removeClass('dropdown');
    };

    // Toggle Dropdown
    $('.menu-btn').click(
        function () {
            if ($('.dropdown').css('top') < '0px') {
                $('.dropdown').css({
                    'top': '5.5rem',
                    'right': '0',
                });
                $('.menu-text').html('Close')
            } else {
                $('.dropdown').css({
                    'top': '-50%',
                    'right': '-50%',
                });
                $('.menu-text').html('Menu');
            }
        }
    )

    // // Animations
    // gsap.registerPlugin(ScrollTrigger);

    // let t1 = new gsap.timeline();
    // t1
    //     .from("#landing svg", {
    //         duration: 2,
    //         scale: 0.7,
    //         autoAlpha: 0,
    //         ease: "back.out"
    //     })
    //     .from(".hero-text h1", {
    //         duration: 1.5,
    //         ease: "back.out(1.5)",
    //         autoAlpha: 0,
    //         x: 200
    //     }, "-=2")
    //     .from(".hero-text p", {
    //         duration: 1.5,
    //         ease: "back.out(1.5)",
    //         autoAlpha: 0,
    //         x: 200
    //     }, "-=2")
    //     .from(".hero-text .btn", {
    //         duration: 1,
    //         y: 100,
    //         autoAlpha: 0
    //     }, "-=2")
    //     .from(".logo", {
    //         duration: 1.5,
    //         ease: "power2.out",
    //         autoAlpha: 0,
    //         x: -200
    //     }, "-=2")
    //     .from(".menu", {
    //         duration: 1.5,
    //         ease: "power2.out",
    //         autoAlpha: 0,
    //         y: -200
    //     }, "-=2");
});