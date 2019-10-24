// var mapElement = document.querySelector('.map-pin');
var mainPin = document.querySelector('.map-pin');

var DragLimit = {
    X: {
        MIN: 100,
        MAX: 1100
    },
    Y: {
        MIN: 100,
        MAX: 700
    }
};

var Border = {
    TOP: DragLimit.Y.MIN - mainPin.offsetHeight,
    BOTTOM: DragLimit.Y.MAX - mainPin.offsetHeight,
    LEFT: DragLimit.X.MIN - mainPin.offsetWidth / 2,
    RIGHT: DragLimit.X.MAX - mainPin.offsetWidth / 2
};

var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (mainPinPosition.x >= Border.LEFT && mainPinPosition.x <= Border.RIGHT) {
        mainPin.style.left = mainPinPosition.x + 'px';
      }

      if (mainPinPosition.y >= Border.TOP && mainPinPosition.y <= Border.BOTTOM) {
        mainPin.style.top = mainPinPosition.y + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

mainPin.addEventListener('mousedown', onMainPinMouseDown);


