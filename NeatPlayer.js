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


    var parent = this, // Our parent-element
        media = [], // Holds all our media-information
        currentSong = 0;


    /**
     * Get all the media-elements and set up variables
     *
     */
    var init = function() {
      var audioElements = parent.find('audio');

      $.each(audioElements, function(i, el) {
        el = $(el);
        media.push(el[0]);

        // Set the type
        media[media.length - 1].type = el[0].src.split('.').pop().toLowerCase();

        // Set a title if none has been specified
        if (media[media.length - 1].title === '') {
          media[media.length - 1].title = el[0].src.split('/').pop().replace(/%20/g, " ");
        }

        // Transform the duration-value into a readable string
        media[media.length - 1].clearDuration = '';
        var duration = media[media.length - 1].duration,
            hours, // If the file doesn't have a duration longer than 1 h we never want to display 00:00:00
            minutes = '00',
            seconds = '00';

        // Hours
        if (Math.floor(duration) >= 3600) {
          if (Math.floor(duration / 3600) < 10) {
            hours = '0' + Math.floor(duration / 3600);
          } else {
            hours = Math.floor(duration / 3600);
          }

          duration -= (Math.floor(duration / 3600) * 3600);
        }

        // Minutes
        if (Math.floor(duration) >= 60) {
          if (Math.floor(duration / 60) < 10) {
            minutes = '0' + Math.floor(duration / 60);
          } else {
            minutes = Math.floor(duration / 60);
          }

          duration -= (Math.floor(duration / 60) * 60);
        }

        // Seconds
        if (Math.floor(duration) > 0) {
          if (Math.floor(duration) < 10) {
            seconds = '0' + Math.floor(duration);
          } else {
            seconds = Math.floor(duration);
          }
        }

        // Combine it all into a readable string
        media[media.length - 1].clearDuration = (hours ? hours + ':' : '') + minutes + ':' + seconds;
      });

      console.log(media);
    };

    /**
     * Draws all the graphic elements in the parent-element.
     *
     */
    var draw = function() {
      var playerArea = $('<div class="NeatPlayerArea default">');
      playerArea
        .width(opts.width)
        .height(opts.height);

      // Setting up the first element to be played
      playerArea.append(
        $('<p>')
          .html(media[0].title + '<br />' + media[0].clearDuration)
      );

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

      // Stop the current song
      media[currentSong].pause();
      media[currentSong].currentTime = 0;

      // Go to previous
      if (currentSong - 1 >= 0) {
        currentSong -= 1;
      } else {
        currentSong = media.length - 1;
      }

      // Play the song
      play();
    };

    /**
     * Pauses the current song
     *
     */
    var pause = function() {
      console.log('Pausing song...')
      media[currentSong].pause();
    };

    /**
     * Plays the current song
     *
     */
    var play = function() {
      console.log('Playing song...')
      media[currentSong].play();
    };

    /**
     * Plays the next song
     *
     */
    var next = function() {
      console.log('Playing next song...')

      // Stop the current song
      media[currentSong].pause();
      media[currentSong].currentTime = 0;

      // Go to next
      if (currentSong + 1 < media.length) {
        currentSong += 1;
      } else {
        currentSong = 0;
      }

      // Play the song
      play();
    };

    // Initiate plugin
    init();
    // Drawing the player
    draw();

  };
});
