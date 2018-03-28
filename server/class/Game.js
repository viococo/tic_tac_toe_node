'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
        var players = arguments[1];
        var id = arguments[2];

        _classCallCheck(this, Game);

        var t = this;
        t.id = id;
        t.init(width);

        t.players = [];
        t.players[1] = {
            pseudo: players[0],
            score: 0
        };
        t.players[2] = {
            pseudo: players[1],
            score: 0
        };
    }

    _createClass(Game, [{
        key: 'init',
        value: function init() {
            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
            // set une nouvelle manche
            var t = this;

            t.isWin = false;
            t.width = width;
            t.click = 0;

            t.board = [];
            for (var i = 0; i < t.width * t.width; i++) {
                t.board.push(0);
            }
            return true;
        }
    }, {
        key: 'definePlayer',
        value: function definePlayer(place) {
            // defini si c'est au player 1 ou 2 de jouer
            var t = this;
            if (!t.isWin) {

                if (parseInt(t.click) % 2) t.player = 2;else t.player = 1;

                var rep = t.checkElem(place);
                rep.player = t.player;
                rep.id = t.id;
                return rep;
            }
        }
    }, {
        key: 'checkElem',
        value: function checkElem(place) {
            // verifie l'element, si il fait gagner la partie ou fini la partie
            var t = this;

            var rep = {
                bool: false
            };

            if (t.board[place] === 0) {
                // la case n'est pas prise
                t.board[place] = t.player;
                rep.bool = true;
                t.click++;

                //if ( t.click >= ( t.width * 2 - 1 ) )
                t.checkWin(place);
                if (t.click >= t.width * t.width && !t.isWin) rep.msg = {
                    titre: 'Tristesse,',
                    msg: 'personne ne gagne !'
                };
            }

            if (t.isWin) {
                rep.isWin = t.isWin;
                rep.score = t.players[t.player].score;
            }
            rep.board = t.board;
            return rep;
        }
    }, {
        key: 'checkWin',
        value: function checkWin(place) {
            var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'row';
            // détection de victoire par direction

            var t = this;

            var row = Math.trunc(place / t.width);
            var col = Math.trunc(place % t.width);

            var idem = 0;

            for (var i = 0; i < t.width; i++) {

                var slot;
                var callback = false;

                switch (dir) {
                    case 'row':
                        slot = t.width * row + i;
                        callback = 'col';
                        break;
                    case 'col':
                        slot = t.width * i + col;
                        if (row == col) callback = 'diag1';else if (row == t.width - 1 - col) callback = 'diag2';
                        break;
                    case 'diag1':
                        slot = (t.width + 1) * i;
                        if (row == t.width - 1 - col) callback = 'diag2';
                        break;
                    case 'diag2':
                        slot = (t.width - 1) * (i + 1);
                        break;
                }

                if (t.player === t.board[slot]) {
                    idem++;
                } else break;
            }

            if (idem === t.width) {
                t.isWin = true;
                t.players[t.player].score++;
                return true;
            } else if (callback != false) t.checkWin(place, callback);
        }
    }]);

    return Game;
}();

module.exports = Game;