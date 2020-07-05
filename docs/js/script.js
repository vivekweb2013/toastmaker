$(document).ready(function () {
    var elements = [];

    $(".showcase-area button").click(function (e) {
        e.preventDefault();
        console.log("Main Toast Button Clicked!");
        ToastMaker("Hi There! 👋");
    });

    $("#content-example-simple-toast button").click(function (e) {
        e.preventDefault();
        console.log("Simple Toast Button Clicked!");
        ToastMaker("Hi There!");
    });

    $("#content-example-toast-with-timeout button").click(function (e) {
        e.preventDefault();
        console.log("Toast Button With Timeout Clicked!");
        ToastMaker("Hi There!", 5000);
    });

    $("#content-example-toast-with-alignment button").click(function (e) {
        e.preventDefault();
        console.log("Toast Button With Custom Alignment Clicked!");
        ToastMaker("Hi There, I'm at the top left of the screen!", 5000, {
            valign: 'top',
            align: 'left'
        });
    });

    $("#content-example-toast-with-styles button").click(function (e) {
        e.preventDefault();
        console.log("Toast Button With Custom Styles Clicked!");
        ToastMaker('All Records Deleted!', 3500, {
            styles: {
                backgroundColor: 'red',
                fontSize: '20px'
            }
        });
    });

    $("#content-example-toast-with-classlist button").click(function (e) {
        e.preventDefault();
        console.log("Toast Button With Custom classList Clicked!");
        ToastMaker("I'm a bit different than others... 😎", 2000, {
            valign: 'top',
            classList: ["custom-border", "large-appearance"]
        });
    });

    $("#content-download button").click(function (e) {
        e.preventDefault();
        console.log("Toast Button for Dev Info Clicked!");
        ToastMaker('Made with ❤️ by vivekweb2013');
    });

    $(".scroll-to-link").click(function (e) {
        e.preventDefault();
        var id = $(this).attr('data-target');
        $('html,body').animate({ scrollTop: $("#" + id).offset().top - 20 });
        return false;
    });

    function onResize() {
        var totalHeight = 0;
        elements = [];
        $('.content-section').each(function () {
            totalHeight = totalHeight + $(this).height();
            var contentSection = { id: $(this).attr('id').replace('content-', ''), maxHeight: totalHeight };
            elements.push(contentSection);
        });
    }

    function onScroll() {
        var scroll = $(window).scrollTop();
        var showcaseAreaHeight = $('.showcase-area').innerHeight();
        for (var i = 0; i < elements.length; i++) {
            var contentSection = elements[i];
            if (scroll - showcaseAreaHeight <= contentSection.maxHeight) {
                $(".content-menu ul li").removeClass('active');
                $(".content-menu ul li[data-target='" + contentSection.id + "']").addClass('active');
                break;
            }
        }
        if (scroll + $(window).height() == $(document).height()) {
            // reached end of page
            $(".content-menu ul li").removeClass('active');
            $(".content-menu ul li:last-child").last().addClass('active');
        }
    }

    $(window).resize(function (e) {
        e.preventDefault();
        onResize();
    });

    $(window).on('scroll', function (e) {
        e.preventDefault();
        onScroll();
    });

    onResize();
});