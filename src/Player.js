import { GameBoard } from "./GameBoard"

const Player = (id) => {
    const gameBoard = GameBoard(id)

    function populateBoard() {
        gameBoard.placeShip(1, 'v', [0,0])
        /* gameBoard.placeShip(3, 'h', [3,2]) */
    }

    function playTurn(opponent, square) {
        opponent.gameBoard.receiveAttack(square.row, square.col)
        const squaresToUpdate = [{square,id}]
        if (opponent.gameBoard.checkIfAllSunk()) {
            this.win()
        }
        else {
            if (!square.ship) {
                squaresToUpdate.push(...opponent.playTurn(this))
            }
        }
        return squaresToUpdate
    }

    function win() {
        console.log('you won')
    }

    function lose() {
        console.log('you lose')
    }

    return {
        gameBoard,
        populateBoard,
        playTurn,
        win,
        lose
    }
}

const PlayerPC = (id) => {
    const player = Player(id)
    function populateBoard() {
        player.gameBoard.placeShip(2, 'v', [5,5])
        player.gameBoard.placeShip(4, 'h', [3,2])
    }

    const squaresToAttack = []
    
    for (let i = 0 ; i < player.gameBoard.board.length ; i++) {
        
        for (let j = 0 ; j < player.gameBoard.board[i].length ; j++) {
            
            squaresToAttack.push({row: i, col: j})
        }
    }

    function selectRandomSquareToAttack(opponent) {
        const coord = squaresToAttack.splice(Math.floor(Math.random() * squaresToAttack.length), 1)[0]
        
        const square = opponent.gameBoard.getSquare(coord.row, coord.col)
        return square
    }

    function playTurn(opponent, square = selectRandomSquareToAttack(opponent)) {
        opponent.gameBoard.receiveAttack(square.row, square.col)
        const squaresToUpdate = [{square,id}]
        if (opponent.gameBoard.checkIfAllSunk()) {
            opponent.lose()
        }
        else {
            if (square.ship) {
                squaresToUpdate.push(...this.playTurn(this))
            }
        }
        return squaresToUpdate
    }
    return {
        ...player,
        populateBoard,
        playTurn
    }
}

export {Player,
    PlayerPC
}