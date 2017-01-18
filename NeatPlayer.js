// Get the url to our folder where NeatPlayer.JS is being stored
// Not really reliable, but works for the current usage.
var scriptEls = document.getElementsByTagName( 'script' );
var thisScriptEl = scriptEls[scriptEls.length - 1];
var scriptPath = thisScriptEl.src;
var scriptFolder = scriptPath.substr(0, scriptPath.lastIndexOf( '/' ) + 1);

var baseUrl = scriptFolder;

$(function($){
  $.fn.NeatPlayer = function(opts) {
    // Setting default options if none given
    opts = $.extend({
      width: 640,
      height: 360
    }, opts);

    // Our parent-element
    var parent = this;

    /**
     * Draws all the graphic elements in the parent-element.
     *
     */
    var draw = function() {
      var playerArea = $('<div class="NeatPlayerArea default">');
      playerArea
        .width(opts.width)
        .height(opts.height);

      parent.append(playerArea);

      // Adding controls
      var controls =
        $('<div>')
          .addClass('NeatPlayerControls')
          .addClass('default')
          .width(playerArea.width())
          .height(playerArea.height() * 0.1);

      var padding = 0.95;
      controls
        .append(
          $('<div>')
            .addClass('NeatPlayer-previous')
            .append(
              $('<img>')
                .attr('src', baseUrl + 'img/next-icon-white.png')
                .attr('height', (controls.height() * padding))
                .click(previous)
            )
        )
        .append(
          $('<div>')
            .addClass('NeatPlayer-playpause')
            .append(
              $('<img>')
                .attr('src', baseUrl + 'img/pause-icon-white.png')
                .attr('height', (controls.height() * padding))
                .click(pause)
            )
            .append(
              $('<img>')
                .attr('src', baseUrl + 'img/play-icon-white.png')
                .attr('height', (controls.height() * padding))
                .click(play)
            )
        )
        .append(
          $('<div>')
            .addClass('NeatPlayer-next')
            .append(
              $('<img>')
                .attr('src', baseUrl + 'img/next-icon-white.png')
                .attr('height', (controls.height() * padding))
                .click(next)
            )
        );

      parent.append(controls);
    };

    /**
     * Plays the previous song
     *
     */
    var previous = function() {
      console.log('Starting the previous song...')
    };

    /**
     * Pauses the current song
     *
     */
    var pause = function() {
      console.log('Pausing song...')
    };

    /**
     * Plays the current song
     *
     */
    var play = function() {
      console.log('Playing song...')
    };

    /**
     * Plays the next song
     *
     */
    var next = function() {
      console.log('Playing next song...')
    };

    // Drawing the player
    draw();

  };
});
