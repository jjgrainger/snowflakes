function Snowflakes() {

  // setup the canvas
  this.canvas = document.getElementById( this.settings.canvas );
  this.context = this.canvas.getContext('2d');
  this.isDownload = false;

  this.generate( 'Ho Ho Ho, Merry Christmas!' );

}


Snowflakes.prototype.resize = function() {

  size = this.settings.size;

  var screenSize = window.innerWidth;

  if(window.innerWidth > window.innerHeight) {
      screenSize = window.innerHeight * .8;
  }

  if(screenSize < this.settings.size) {
      size = screenSize * .9;
  }

  this.canvas.width = size;
  this.canvas.height = size;
  $('#flakes').width(size).height(size);

}

// default options
Snowflakes.prototype.settings = {
    canvas: 'flakes',
    size: 800
};

// customisable flake options
Snowflakes.prototype.flakeOptions = {
    size : 300,
    colours : {
      flake : '#ffffff',
      background : $('#container').css('background-color')
    }
};

// properties for this flake
// own object - how do you create a snowflake - new Snowflake(nameOrProperties)
Snowflakes.prototype.flakeProperties = {
  id : 0,
  phrase : '',
  params : [],
  time : 0,
  flake : {
    order : 0,
    steps : 0,
    sizes : 0,
    length : 0,
  }
};



Snowflakes.prototype.download = function() {

  // download size
  this.canvas.width = 1200;
  this.canvas.height = 1200;

  this.isDownload = true;

  this.draw();
  return this.canvas.toDataURL('image/jpg');
}


// draw the snowflake to the canvas
Snowflakes.prototype.draw = function() {

  // draw snowflake from properties
  var start = new Date().getTime();

  // this.context.fillStyle = this.flakeOptions.colours.background;
  // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  if( this.download ) {
    this.context.fillStyle = $('#container').css('background-color');
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.isDownload = false;
  }

  this.context.translate(this.canvas.width/2, this.canvas.height/2);

  // scale drawing to canvas
  var size = this.canvas.width;
  var orig = this.settings.size;
  var p = size/orig;
  this.context.scale(p, p);

  // how many arms the snowflake has
  var order = this.flakeProperties.flake.order;

  // how many steps across the arms a fractal is repeated
  var steps = this.flakeProperties.flake.steps;

  // the different sizes for each of the fractals
  var sizes = this.flakeProperties.flake.sizes;

  // fixed width for the snowflake
  var length = this.flakeProperties.flake.length;

  // draw first fractal, largest one
  this.drawFractal(0, 0, order, length);

  var param = 0;

  // create fractals along the length of the line
  // each fractal is created at different steps
  for(var step = 0; step < length; step += (length/steps)) {


      var size = this.randBetween(sizes[param], -99, 99);
      param++;

      if(param > sizes.length) {
          param = 0;
      }

      for(var i = 0; i < order; i++) {
          this.context.rotate(this.radians(360/order));
          this.drawFractal(0, -step, order, size);
      }

  }

  this.flakeProperties.time = new Date().getTime() - start;

}

Snowflakes.prototype.drawFractal = function(x, y, order, length) {
    this.context.save();
    this.context.translate(x, y);
    for(var i = 0; i < order; i++) {
        this.context.rotate(this.radians(360/order));
        this.drawLine(length);
    }
    this.context.restore();
}

Snowflakes.prototype.drawLine = function(length) {
  this.context.beginPath();
  this.context.moveTo(0, 0);
  this.context.lineTo(0, -length);
  this.context.lineWidth = 2;
  this.context.strokeStyle = this.flakeOptions.colours.flake;
  this.context.lineCap = 'round';
  this.context.stroke();
}



/**
 * Generate a snowflake and draw it to the canvas
 *
 * @param  {string} phrase user entered phrase to generate a snowflake from
 */
Snowflakes.prototype.generate = function( phrase ) {

  if( typeof phrase === "undefined" ) {
    phrase = this.generateRandomString();
  }

  // set the flake properties
  this.flakeProperties.phrase = phrase;
  this.flakeProperties.id = this.generateCode( this.flakeProperties.phrase );
  this.flakeProperties.params = this.generateHashArray( this.flakeProperties.id );
  this.flakeProperties.time = new Date().getTime();

  this.flakeProperties.flake = {
    order: this.randBetween(this.flakeProperties.params[1], 5, 12),
    steps: this.randBetween(this.flakeProperties.params[1], 5, 12),
    sizes: this.flakeProperties.params,
    length: this.flakeOptions.size
  }

  console.log(this.flakeProperties);

  this.resize();
  this.draw();
}


/**
 * Generate Code
 *
 * Generate a unique long integer code from a phrase
 *
 * @param  {string} phrase a user entered string
 */
Snowflakes.prototype.generateCode = function( phrase ) {

    var hash = 0, i, chr, len;
    if (phrase.length == 0) return hash;

    for (i = 0, len = phrase.length; i < len; i++) {
        chr = phrase.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

/**
 * Generate Hash Array
 *
 * Turn a code (long integer) into an array
 *
 * @param {integer} code a long integer
 */
Snowflakes.prototype.generateHashArray = function( code ) {

    var output = [];
    var sNumber = code.toString();

    for (var i = 0, len = sNumber.length; i < len; i++) {
        var add = +sNumber.charAt(i);
        if(!add) {
            add = 1;
        }
        output.push(add);
    }

    return output;
}

/**
 * Generate Random String
 *
 * Generate a a random string a certain number of characters long
 *
 * @param {integer} length how long the string should be
 */
Snowflakes.prototype.generateRandomString = function(length) {

    var length = length | 32;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';

    for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    return result;
}


/*
 * turn degrees to radians
 */
Snowflakes.prototype.radians = function( degrees ) {
    return degrees * (Math.PI/180);
}

/*
    Generate a number between two values from a key number
 */
Snowflakes.prototype.randBetween = function( key, min, max ) {
    return Math.floor( (key/10) * (max - min + 1) ) + min;
}
