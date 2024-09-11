import { shipFactory } from "./ship-factory.js"

const GameBoard = (id) => {
    const rows = 10
    const columns = 10
    const board = []
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < columns; j++) {
            row.push(square(i,j))
        }
        board.push(row)
    }
    const ships = []

    const ownSquaresHit = []
    
    function getSquare(row, col) {
        if (board[row] == undefined || board[row][col] == undefined) {
            return  null
        }
        return board[row][col]
    }

    function placeShip(size, orientation = Math.random() < 0.5 ? 'v' : 'h', startingPoint) {
        const ship = shipFactory(size, id+ships.length, orientation)
        ship.start = startingPoint
        

        const squaresToAssignShips = []
        
        function assignShipToSquare(ship,square) {
            square.ship = ship
        }
        if (orientation === 'v') {
            for (let i = 0 ; i < size; i++) {
                
                if (!board[startingPoint[0]+i] || !board[startingPoint[0]+i][startingPoint[1]]) {
                    throw new Error('Position out of bounds')
                }
                const square = board[startingPoint[0]+i][startingPoint[1]]
                if (square.ship) {
                    throw new Error('There is a ship already in this square')
                }
                squaresToAssignShips.push(square)

            }
        }
        if (orientation === 'h') {
            for (let i = 0 ; i < size; i++) {
                
                if (!board[startingPoint[0]] || !board[startingPoint[0]][startingPoint[1]+i]) {
                    throw new Error('Position out of bounds')
                }
                const square = board[startingPoint[0]][startingPoint[1]+i]
                if (square.ship) {
                    throw new Error('There is a ship already in this square')
                }
                squaresToAssignShips.push(square)
            }
        }
        ships.push(ship)
        squaresToAssignShips.forEach((square) => {
            assignShipToSquare(ship, square)
        })
        

    }

    function getShips() {
        return ships
    }

    function receiveAttack(row,col) {
        getSquare(row,col).hit = true
        if (getSquare(row,col).ship) {
            getSquare(row,col).ship.hit()
        }
        ownSquaresHit.push(getSquare(row,col))
    }

    function checkIfAllSunk() {
        return ships.filter((ship) => ship.isSunk).length == ships.length
    }

    return {
        board,
        ownSquaresHit,
        getSquare,
        placeShip,
        getShips,
        receiveAttack,
        checkIfAllSunk
    }
}

const square = (row, col) => {
    let ship = null
    return {
        row,
        col,
        ship,
        hit: false
    }
}


export {GameBoard}