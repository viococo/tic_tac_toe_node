'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

        _classCallCheck(this, Board);

        this.morpion = document.getElementById('morpion');
        this.tab = [];

        this.init(width);
    }

    _createClass(Board, [{
        key: 'init',
        value: function init(width) {
            // plateau
            this.create(width);
        }
    }, {
        key: 'create',
        value: function create(width) {
            for (var i = 0; i < width; i++) {

                var row = document.createElement('div');
                row.classList.add('row');
                this.morpion.appendChild(row);

                for (var j = 0; j < width; j++) {

                    this.tab.push(0);

                    var elem = document.createElement('div');
                    elem.classList.add('elem');
                    elem.dataset.place = i * width + j;
                    row.appendChild(elem);
                }
            }
            console.log(this.tab);
        }
    }]);

    return Board;
}();

module.exports = Board;