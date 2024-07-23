import { GameBoard } from "./GameBoard"

const Player = () => {
    const gameBoard = GameBoard()

    function populateBoard() {
        gameBoard.placeShip(2, 'v', [0,0])
        gameBoard.placeShip(3, 'h', [3,2])
    }

    populateBoard()

    return {
        gameBoard
    }
}

const PlayerPC = () => {
    const player = Player()
    function populateBoard() {
        gameBoard.placeShip(2, 'v', [5,5])
        gameBoard.placeShip(3, 'h', [3,2])
    }
    return {
        ...player,
        populateBoard
    }
}

export {Player,
    PlayerPC
}