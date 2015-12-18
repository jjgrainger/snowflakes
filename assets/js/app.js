$(document).ready(function() {

    $('#loading').delay(1000).fadeOut(300, function() {
        $('#start').fadeIn(300);
    });

    var name = undefined;

    if(window.location.hash) {
        name = window.location.hash.substring(1);
        console.log(name);
    }

    // create a random snowflake
    var Flake = new Snowflake(name);


    $('#nameform').submit(function(e) {
        e.preventDefault();
        var name = $('#name').val();
        Flake = new Snowflake(name);
        $('#download').attr('href', Flake.getImage()).attr('download', Flake.name + ".png");
    });

    var placeholder = 0;
    $('#name').focus(function() {
        if(!placeholder) {
            $(this).val('');
            placeholder = 1;
        }
    })


    $('.flakes-random').click(function(e) {
        e.preventDefault();
        Flake = new Snowflake();
        // $('#name').val(Flake.name);
    });

    $('.flakes-save').click(function(e) {
        e.preventDefault();
        var img = Flake.getImage();
        window.open(img);
    });

    $('.share a').click(function(e) {

        var opts = {
            'twitter' : {
                text : "Make a snowflake from your name!",
                via : "jjgrainger"
            },
            'facebook' : {
                'u' : 'http://jjgrainger.co.uk/snowflakes'
            }
        }

        var service = $(this).data('service');
        var options = opts[service];

        new Share(service, opts);

    });


    $('.js-show').click(function(e) {

        e.preventDefault();

        var target = $(this).attr('href');
        $(target).fadeToggle(300);

    });



    $(window).on('resize', function() {
        Flake.init();
        Flake.draw();
    });
});
