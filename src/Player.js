import { GameBoard } from "./GameBoard"

const Player = (id) => {
    const gameBoard = GameBoard(id)

    const ownSquaresArray = []

    let won = false
    
    for (let i = 0 ; i < gameBoard.board.length ; i++) {
        
        for (let j = 0 ; j < gameBoard.board[i].length ; j++) {
            
            ownSquaresArray.push(gameBoard.board[i][j])
        }
    }

    function populateBoard() {
        const shipSizes = [5,4,3,3,2,2,2]
        /* const shipSizes = [2] */
        
        shipSizes.forEach((shipSizeElement) => {
            let placed = false
            while (!placed) {
                
                try {
                    const startingSquare = ownSquaresArray.splice(Math.floor(Math.random() * ownSquaresArray.length), 1)[0]
                    const startingPoint = [startingSquare.row, startingSquare.col]
                    
                    gameBoard.placeShip(shipSizeElement, undefined, startingPoint)
                    placed = true
                }
                catch(error) {
                    console.log(error.message);
                }
            }
            
        })
    }

    function playTurn(opponent, square) {
        console.log(`yo clicke ${square.row} , ${square.col}`)
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
        this.won = true
        
    }

    return {
        gameBoard,
        populateBoard,
        playTurn,
        win,
        won,
    }
}

const PlayerPC = (id) => {
    const player = Player(id)
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
        console.log(`pc ataco ${square.row} , ${square.col}`)
        opponent.gameBoard.receiveAttack(square.row, square.col)
        const squaresToUpdate = [{square,id}]
        
        if (opponent.gameBoard.checkIfAllSunk()) {
            this.win()
        }
        else {
            if (square.ship) {
                squaresToUpdate.push(...this.playTurn(opponent))
            }
        }
        return squaresToUpdate
    }
    return {
        ...player,
        playTurn
    }
}

export {Player,
    PlayerPC
}