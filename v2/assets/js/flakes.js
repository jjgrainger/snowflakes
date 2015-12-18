function Snowflake(name) {

    // Settings
    this.keyphrase = "Ho, Ho, Ho! Merry Christmas!";
    this.length = 200;
    this.canvas = document.getElementById('flakes');
    this.context = this.canvas.getContext('2d');
    this.colors = {
        flake : "#ffffff",
        bg : $('body').css('background-color')
    };

    // create options
    this.name = typeof name === "undefined" ? this.generateRandomString() : name;
    this.uniqueId = this.generateCode(this.name + this.keyphrase);
    this.params = this.generateHashArray(this.uniqueId);
    this.timeTaken = new Date().getTime();
    this.degrees = 0;

    this.checkSize();
    this.init();
    this.draw();
}

Snowflake.prototype.getImage = function() {

    this.canvas.width = 700;
    this.canvas.height = 700;
    // this.checkSize();
    this.context.fillStyle = $('body').css('background-color');
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(this.canvas.width/2, this.canvas.height/2);
    this.draw();
    return this.canvas.toDataURL('image/jpg');
}

Snowflake.prototype.init = function() {

    // this.canvas.width = 700;
    // this.canvas.height = 700;
    this.checkSize();
    this.context.translate(this.canvas.width/2, this.canvas.height/2);
}

Snowflake.prototype.checkSize = function() {

    var screenSize = window.innerWidth;

    if(window.innerWidth > window.innerHeight) {
        screenSize = window.innerHeight * .9;
    }

    if(screenSize < 700) {
        $('#flakes').width(screenSize).height(screenSize);
    }
 }

/*
    Generate a unique long integer code from a phrase
 */
Snowflake.prototype.generateCode = function(phrase) {

    var hash = 0, i, chr, len;
    if (phrase.length == 0) return hash;

    for (i = 0, len = phrase.length; i < len; i++) {
        chr = phrase.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

/*
    Turn a code (long int) into parameters
 */
Snowflake.prototype.generateHashArray = function(name) {
    var number = name;
    var output = [];
    var sNumber = number.toString();

    for (var i = 0, len = sNumber.length; i < len; i++) {
        var add = +sNumber.charAt(i);
        if(!add) {
            add = 1;
        }
        output.push(add);
    }

    return output;
}

Snowflake.prototype.generateRandomString = function(length) {

    var length = length | 32;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';

    for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    return result;
}


/*
    draw the snowflake
 */
Snowflake.prototype.draw = function() {

    var start = new Date().getTime();

    // how many arms the snowflake has
    var order = this.randBetween(this.params[1], 5, 12);

    // how many steps across the arms a fractal is repeated
    var steps = this.randBetween(this.params[1], 5, 12);

    // the different sizes for each of the fractals
    var sizes = this.params;

    // fixed width for the snowflake
    var length = this.length;

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

    this.timeTaken = new Date().getTime() - start;
}

/*
    draw fractal
*/
Snowflake.prototype.drawFractal = function(x, y, order, length) {
    this.context.save();
    this.context.translate(x, y);
    for(var i = 0; i < order; i++) {
        this.context.rotate(this.radians(360/order));
        this.drawLine(length);
    }
    this.context.restore();
}

/*
    drawline
*/
Snowflake.prototype.drawLine = function(length) {
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -length);
    this.context.lineWidth = 2;
    this.context.strokeStyle = this.colors.flake;
    this.context.stroke();
}

/*
    turn degrees to radians
 */
Snowflake.prototype.radians = function(degrees) {
    return degrees * (Math.PI/180);
}

/*
    Generate a number between two values from a key number
 */
Snowflake.prototype.randBetween = function(key, min, max) {
    return Math.floor((key/10) * (max - min + 1)) + min;
}
