class Game {

    constructor (width = 3, players, id) {

        var t = this
        t.id = id
        t.init (width)

        t.players = []
        t.players[1] = {
            pseudo: players[0],
            score: 0,
        }
        t.players[2] = {
            pseudo: players[1],
            score: 0,
        }
        
    }

    init (width = 3) { // set une nouvelle manche
        var t = this

        t.isWin = false
        t.width = width
        t.click = 0

        t.board = []
        for (var i = 0; i < t.width*t.width; i ++){
            t.board.push(0)
        }
        return true
    }

    definePlayer ( place ) { // defini si c'est au player 1 ou 2 de jouer
        var t = this
        if ( !t.isWin ){
        
            if ( parseInt(t.click) % 2 ) 
                t.player = 2
            else
                t.player = 1

            var rep = t.checkElem( place )
            rep.player = t.player
            rep.id = t.id
            return rep
        }
    }

    checkElem ( place ) { // verifie l'element, si il fait gagner la partie ou fini la partie
        var t = this
        
        var rep = {
            bool: false,
        }
        
        if ( t.board[place] === 0 ){ // la case n'est pas prise
            t.board[place] = t.player
            rep.bool = true
            t.click ++
            
            //if ( t.click >= ( t.width * 2 - 1 ) )
                t.checkWin( place )
             if ( t.click >= t.width * t.width && !t.isWin)
                rep.msg = {
                    titre: 'Tristesse,',
                    msg: 'personne ne gagne !'
                }
        }

        if(t.isWin) {
            rep.isWin = t.isWin
            rep.score = t.players[ t.player ].score
        }
        rep.board = t.board
        return rep
        
    }

    
    checkWin ( place, dir = 'row' ) { // détection de victoire par direction

        var t = this

        var row = Math.trunc( place / t.width )
        var col = Math.trunc( place % t.width )

        var idem = 0
        
        for (var i = 0; i < t.width; i ++) {

            var slot;
            var callback = false;

            switch (dir) {
                case 'row':
                    slot = t.width * row + i
                    callback = 'col'
                    break;
                case 'col':
                    slot = t.width * i + col
                    if (row == col) callback = 'diag1'
                    else if(row == t.width - 1 - col) callback = 'diag2'
                    break;
                case 'diag1':
                    slot = (t.width + 1) * i
                    if(row == t.width - 1 - col) callback = 'diag2'
                    break;
                case 'diag2':
                    slot = (t.width - 1) * ( i + 1 )
                    break;
            }
            
            if ( t.player === t.board[ slot ] ){
                idem ++
            } else break
        }

        if ( idem === t.width) {
            t.isWin = true
            t.players[ t.player ].score ++
            return true
        } else if (callback != false)
            t.checkWin( place, callback)
    }

}
module.exports = Game