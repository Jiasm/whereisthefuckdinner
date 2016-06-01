'use strict';
function WTFDinner (config) {

  var self = this;
  var $container = self.$container = config.container;
  var dinners = self.dinners = config.dinners;
  var colors = self.colors = config.colors || ['rgb(204, 228, 246)', 'rgb(149, 204, 245)', 'rgb(106, 194, 245)', 'rgb(29, 128, 211)', 'rgb(0, 160, 232)', 'rgb(45, 183, 245)', 'rgb(31, 90, 163)', 'rgb(11, 54, 106)', 'rgb(8, 23, 47)'];
  var speed = self.speed = config.speed || 5;
  var storageTime = 'last-dinner';
  var storageName = 'dinner-name';


  function init () {

    var str = '';
    var index = 0;
    var len = dinners.length;
    var skew = 90 - 360 / len;
    var rotate = 360 / len;
    var leak = -1 * 90 * (len - 2) / len;

    for (; index < len; index++) {

      var dinnerStyle = '';
      var spanStyle = '';

      dinnerStyle += ' transform: rotate(' + (rotate * index - leak) + 'deg) skew(' + skew + 'deg) translate3d(-50%, -50%, 0);';
      dinnerStyle += ' background-color: ' + colors[index] + ';';

      spanStyle += ' transform: translate3d(3%, 8%, 0) skew(' + -1 * skew + 'deg) rotate(' + leak + 'deg)';

      str += '<div class="dinner" style="' + dinnerStyle + '">';
      str += '<div class="text" style="' + spanStyle +'">';
      str += '<span class="fix">'
      str += dinners[index].match(/.{0,4}/g).join('<br/>');
      str += '</span>';
      str += '</div>';
      str += '</div>';
    }

    $container.innerHTML = str;

    /**
     * 从localStorage中取出今天的晚餐名
     * @return {String} 晚餐名
     */
    var getDinner = self.getDinner = function () {

      return localStorage.getItem(storageName) || '并没有决定要吃啥';
    }

    /**
     * 存储今天晚上要吃的饭
     * @param {String} dinner 晚餐的名字
     */
    var setDinner = self.setDinner = function (dinner) {

      // 防止恶意操作
      if (dinners.indexOf(dinner) >= 0) {
        localStorage.setItem(storageName, dinner);
      }
    }

    /**
     * 获取上一次晚餐的时间戳 用于比对
     * @return {String} 时间戳
     */
    var getLastDinner = self.getLastDinner = function () {

      return localStorage.getItem(storageTime) || null;
    }

    /**
     * 设置上次晚餐的时间 默认为当前时间的格式为YYYY/MM/DD
     */
    var setLastDinner = self.setLastDinner = function () {

      var now = new Date();
      var timestmap = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
      localStorage.setItem(storageTime, timestmap);
    }

    /**
     * 清除storage以及this.get的数据
     */
    var cleanData = self.cleanData = function () {

      self.get = false;
      localStorage.removeItem(storageName);
      localStorage.removeItem(storageTime);
    }

    /**
     * 返回今天是否还可以抽奖
     * @return {Boolean} true: 还没有抽 false: 已经抽过了
     */
    var canIEat = self.canIEat = function () {

      var flag = false;
      var lastDinner = getLastDinner();
      var now = new Date();
      var timestmap = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();

      flag = self.get || lastDinner === timestmap;

      return !flag;
    }

    /**
     * 获取晚餐的信息
     * @param  {Number} dinner 可设定的直接传参数 想吃啥吃啥
     * @return {[type]}        [description]
     */
    var giveMeDinner = self.giveMeDinner = function (dinner) {

      if (!canIEat()) return;

      dinner = dinner || Math.random() * len | 0;

      if (dinner > len || dinner < 0) return;

      $container.style.transition = ' transform ' + speed + 's';
      $container.style.transform = ' rotate(' + (-1 * dinner * rotate + 360 * 5) + 'deg) translateZ(0)';

      self.get = true;
      setDinner(dinners[dinner]);
      setLastDinner();

      if (config.callback) {

        setTimeout(config.callback, speed * 1e3);
      }
    }
  }

  init();
}
