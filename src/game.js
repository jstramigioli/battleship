import { Player, PlayerPC } from "./Player.js";
import { createMyBoard, createEnemyBoard, updateSquare } from "./renderBoard.js";


function game() {
    const player1 = Player('00')
    const player2 = PlayerPC('01')
    player1.populateBoard()
    player2.populateBoard()
    
    const myBoard = document.querySelector('#my-board')
    const enemyBoard = document.querySelector('#enemy-board')

    
    createMyBoard(myBoard, player1)
    createEnemyBoard(enemyBoard, player2, player1)
    updateSquare(player2.gameBoard.getSquare(3,5), enemyBoard)

}

export {game}
