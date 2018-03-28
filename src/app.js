const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const app = express()

var games = [];
import Board from "./class/Board";
import Game from "./class/Game";
import { isNumber } from 'util';

app.use(cors())
app.use(bodyParser.json())
 
app.post('/', function (req, res) {
    var html = '<p>'
    html += '/init : commence une nouvelle partie <br>'
    html += '/checkElem : regarde si la case est disponible, si oui : check si le click déclanche la victoire ou si le board est complet (donc personne ne gagne)'
    html += '</p>'
})

app.post('/init', function (req, res) {
    var id 
    var width = parseInt(req.body.width)
    var players = req.body.players
    var first = req.body.first

    if ((width && width > 2 && width < 7) || width === null){
        if(first){
            id = Math.trunc(Math.random()*999999)
            games[id] = new Game(width, players, id)
        } else {
            var id = req.body.id
            games[id].init(width)
        }
        res.json({statut: true, id: id})
    } else res.json({statut: false, msg: 'la taille n\'est pas correcte'})
   
})

app.post('/checkElem', function (req, res) {
    var place = req.body.place
    var id = req.body.id

    res.json(games[id].definePlayer( place ))
})

app.listen(3000, function () {
    console.log('Enjoy !')
})