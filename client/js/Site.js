class Site{ // toutes les fonctions/letiables en rapport à la partie front
    constructor(){
        let t = this

        t.first = true
        t.morpion = document.getElementById('morpion')

        t.scores = document.getElementsByClassName('result')
        t.form = document.forms['start']
        
        t.displayScores('none')
        
        t.form.onsubmit = function(){
            let width = this['width'].value
            t.init( t.form )
            return false
        }
    }

    ajax(e){ // pour simplifier les données envoyé par l'ajax
        let t = this
        $.ajax({
            url: e.url,
            data: JSON.stringify(e.data),
            dataType: 'JSON',
            contentType:'application/JSON',
            type: 'POST',
            success: function (rep) {
                console.log(rep)
                e.succes(t, rep, e.data)
            },
            error: function(xhr, ajaxOptions, thrownError){
                e.error(t)                
            }
        });
    }

    createBoard (width) { // crée l'interface graphique
        let t = this

        for ( let i = 0; i < width; i ++ ){

            let row = document.createElement('div')
            row.classList.add('row')
            t.morpion.appendChild(row)

            for ( let j = 0; j < width; j ++ ){

                let elem = document.createElement('div')
                elem.classList.add('elem')
                elem.dataset.place = i * width + j
                row.appendChild(elem)

            }

        }
    }
    
    init(){ // demnade la création d'une nouvelle partie
        let t = this
        t.width = t.form['width'].value;

        t.players = []
        for (let i = 1; i < 3; i++){
            t.players[i] = (t.form['player' + i].value) ? t.form['player' + i].value : 'joueur ' + i
        }

        t.morpion.classList.remove('player2')
        t.morpion.classList.add('player1')

        let dataAjax = {
            url : 'http://localhost:3000/init',
            data : {
                width: t.width,
                players: t.players,
                first: t.first
            },
            succes: t.initSucces,
            error: t.initError
        }

        if(!t.first)
            dataAjax.data.id = t.id

        t.ajax( dataAjax )
   
    }

    initSucces(t, data ){ // si la partie est créer

        if( data.statut ){

            if(t.first){
                t.updatePoints(0,1)
                t.updatePoints(0,2)
            }
            
            for (let i = 1; i < 3; i++){
                document.querySelector('#result' + i + ' .pseudo').innerHTML = t.players[i]
            }

            t.displayScores('block')
            t.form.style.display = 'none'
            
            t.first = false
            t.id = data.id
            t.morpion.innerHTML = ''
            t.createBoard(t.width)
            t.morpion.style.display = 'block'

            t.checkElem()

        } else t.popinOpen ( bool.msg )
    }

    initError(t){ // si l'init n'a pas lieu
        t.popinOpen({titre:'Désolé,', msg:'le server est mort'})
    }


    checkElem () { // initie le l'écoute sur les cases du morpion
        let t = this
        let elems = document.getElementsByClassName('elem')
        let id = t.id

        for ( let elem of elems ){
            elem.addEventListener('click', function(){

                let dataAjax = {
                    url : 'http://localhost:3000/checkElem',
                    data : {
                        place: this.dataset.place,
                        id: id
                    },
                    succes: t.checkSucces,
                    error: t.checkError
                }
        
                t.ajax( dataAjax )

            })
        }
    }

    checkSucces(t, data, send){ // si la réponse est positive
        if ( data.bool) {

            // ajoute le joueur qui a cliqué
            let slot = document.querySelector('[data-place="' + send.place + '"]')
            slot.classList.add('use')
            slot.classList.add('player' + data.player)
            
            // change le joueur sur le morpion (pour l'état hover des cases)
            let mToAdd, mToRemove
            if ( data.player == 1 ){ 
                mToAdd = 2 ; 
                mToRemove = 1 ;
            } else {
                mToAdd = 1  ; 
                mToRemove = 2 ;
            }

            t.morpion.classList.remove('player' + mToRemove)
            t.morpion.classList.add('player' + mToAdd)
            
            // si la partie est gagné ou qu'il y a un message
            if (data.isWin) {
                t.toInit = true
                t.popinOpen({ titre: t.players[data.player] , msg:' gagne'} )
                t.updatePoints(data.score, data.player)
            } else if (data.msg) t.popinOpen(data.msg, true)
        }
    }

    checkError(t){ // si le serveur ne répond pas ou que la partie est supprimé
        t.first = true
        t.toInit = true
        t.popinOpen({titre: 'Une erreur est survenue,',msg:'une nouvelle partie va se lancer'}, true)
    }

    popinOpen(data, init = false){ // ouvre une popin avec un message personnalisable
        let t = this
        let popin = document.getElementById('popin')
        let txt
        if(typeof(data) === 'string'){
            txt = '<p>'+data+'</p>'
        } else {
            txt = '<h2>'+data.titre+'</h2>'
            txt += '<p>'+data.msg+'</p>'
        }
        popin.innerHTML = txt
        document.getElementById('overlay').classList.remove('hidden')
        
    }

    updatePoints ( score, player ) { // change les points d'un joueurs
        let t = this

        let text = score + ' pt'
        if (score > 1) 
            text += 's'
        document.querySelector('#result'+player+' .score').innerHTML = text
    }

    displayScores(display){ // change le display des scores
        let t = this
        for ( let score of t.scores ){
            score.style.display = display
        }
    }
}