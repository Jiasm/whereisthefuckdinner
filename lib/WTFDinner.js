'use strict';
function WTFDinner (config) {

  var $container = this.$container = config.container;
  var dinners = this.dinners = config.dinners;
  var colors = this.colors = config.colors || ['rgb(204, 228, 246)', 'rgb(149, 204, 245)', 'rgb(106, 194, 245)', 'rgb(29, 128, 211)', 'rgb(0, 160, 232)', 'rgb(45, 183, 245)', 'rgb(31, 90, 163)', 'rgb(11, 54, 106)', 'rgb(8, 23, 47)'];

  var giveMeDinner = this.giveMeDinner = function () {

    $container.style.transform = 'rotate(360deg)';

  }

  function init () {

    var str = '';
    var index = 0;
    var len = dinners.length;
    var skew = 90 - 360 / len;
    var rotate = 360 / len;

    for (; index < len; index++) {

      var dinnerStyle = '';
      var spanStyle = '';

      dinnerStyle += ' transform: rotate(' + (rotate * index + (rotate - skew)) + 'deg) skew(' + skew + 'deg) translate(-50%, -50%);';
      dinnerStyle += ' background-color: ' + colors[index] + ';';

      spanStyle += ' transform: skew(' + -1 * skew + 'deg) rotate(-' + (rotate - skew) + 'deg);'; // rotate(' + (-1 * rotate * index) + 'deg)

      str += '<div class="dinner" style="' + dinnerStyle + '">';
      str += '<div class="text" style="' + spanStyle +'">';
      str += '<span class="fix">'
      str += dinners[index];
      str += '</span>';
      str += '</div>';
      str += '</div>';
    }

    $container.innerHTML = str;
  }

  init();
}
