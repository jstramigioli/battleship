import { GameBoard } from "./GameBoard"

const Player = (id) => {
    const gameBoard = GameBoard(id)

    function populateBoard() {
        gameBoard.placeShip(2, 'v', [0,0])
        gameBoard.placeShip(3, 'h', [3,2])
    }

    return {
        gameBoard,
        populateBoard
    }
}

const PlayerPC = (id) => {
    const player = Player(id)
    function populateBoard() {
        player.gameBoard.placeShip(2, 'v', [5,5])
        player.gameBoard.placeShip(4, 'h', [3,2])
    }
    return {
        ...player,
        populateBoard,
        isEnemy: true
    }
}

export {Player,
    PlayerPC
}