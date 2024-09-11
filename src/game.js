import { Player, PlayerPC } from "./Player.js";
import { initializeUI } from "./renderBoard.js";


function game() {
    

    function newGame() {
        const player1 = Player('00')
        const player2 = PlayerPC('01')
        player1.populateBoard()
        player2.populateBoard()
        return {player1, player2}
    }
    
    
    initializeUI(newGame)
    
    

}



export {game}
