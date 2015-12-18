$(document).ready(function() {

  var app = new Snowflakes();

  $(window).on('resize', function() {
    app.generate( app.flakeProperties.phrase );
  });


  $('#random').click(function(e) {
    e.preventDefault();

    app.generate();
    setDownload();
  });

  function setDownload() {
    var url = app.download();
    url = url.replace('data:image/png', 'data:application/octet-stream');
    $('#download').attr('href', url).attr( 'download', app.flakeProperties.phrase + '.png' );
  }

  $('#form').on('submit', function(e) {
    e.preventDefault();

    app.generate( $('#name').val() );
    setDownload();
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



});

