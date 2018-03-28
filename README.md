# tic.tac.toe by viococo

## Installation
Pour installer le projet il faut faire 
- ouvrir un terminal
- $ npm install 
- $ npm start
- ouvrir le fichier 'client/index.html'

Vous pouvez jouer !

## Routes de l'api en POST
### /init 
**DESCRIPTION** commence une nouvelle partie
    
    PARAMETRES D'ENTREE
    @width      : int entre 3 et 6
    @players    : string
    @first      : boolean 

    PARAMETRE DE SORTE
    JSON {
        statut  : boolean,
        id      : int
    }

### /checkElem
**DESCRIPTION** regarde si la case est disponible, si oui : check si le click déclanche la victoire ou si le board est complet (donc personne ne gagne)
    
    PARAMETRES D'ENTREE
    @place      : int
    @id         : int

    PARAMETRE DE SORTE
    JSON {
        board   : array,
        bool    : boolean,
        player  : int,
        msg     : string,
        isWin   : boolean,
        score   : int,
        id      : int        
    }