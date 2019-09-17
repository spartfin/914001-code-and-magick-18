'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var INDENT_X = 150;
  var INDENT_Y = 20;
  var GAP = 10;
  var FONT_GAP = 16;
  var BAR_GAP = 50;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', INDENT_X, INDENT_Y);
    ctx.fillText('Список результатов:', INDENT_X, INDENT_Y + (GAP * 2));

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var barHeight = BAR_HEIGHT * times[i] / maxTime;

      ctx.fillStyle = '#000';
      ctx.fillText(names[i], CLOUD_X + BAR_GAP + i * 2 * BAR_GAP, CLOUD_HEIGHT - GAP * 2);
      ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + i * 2 * BAR_GAP, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_GAP - barHeight - GAP * 2);
      ctx.fillStyle = 'rgba(0, 0, 255,' + parseFloat(Math.random().toPrecision(1)) + ')';

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }

      ctx.fillRect(CLOUD_X + BAR_GAP + i * 2 * BAR_GAP, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_GAP - barHeight, BAR_WIDTH, barHeight);
    }
  };

})();
