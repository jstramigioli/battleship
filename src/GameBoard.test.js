import { GameBoard } from "./GameBoard.js"

it('Gets first square', () => {
    expect(GameBoard().getSquare(0,0)).toBeTruthy()
})

it('Gets last square', () => {
    expect(GameBoard().getSquare(9,9)).toBeTruthy()
})

it('Doesnt get exeeding row', () => {
    expect(GameBoard().getSquare(19,1)).not.toBeTruthy()
})

it('Doesnt get exeeding column', () => {
    expect(GameBoard().getSquare(1,19)).not.toBeTruthy()
})

it('First square starts without ship', () => {
    expect(GameBoard().getSquare(0,0).ship).not.toBeTruthy()
})

it('Last square starts without ship', () => {
    expect(GameBoard().getSquare(9,9).ship).not.toBeTruthy()
})

it('Adds one ship to ships array', () => {
    const board = GameBoard()
    board.placeShip(2,'v',[0,0])
    expect(board.getShips().length).toBe(1)
})

it('Adds two ships to ships array', () => {
    const board = GameBoard()
    board.placeShip(2,'v',[0,0])
    board.placeShip(2,'v',[4,4])
    expect(board.getShips().length).toBe(2)
})

it('Cant add ship out of board, vertical', () => {
    const board = GameBoard()
    expect(() => {
        board.placeShip(2,'v',[11,11])
}
).toThrow('Position out of bounds')
})

it('Cant add ship out of board, horizontal', () => {
    const board = GameBoard()
    expect(() => {
        board.placeShip(2,'h',[11,11])
}
).toThrow('Position out of bounds')
})

it('Cant add ship out of board, starting point in board, vertical', () => {
    const board = GameBoard()
    expect(() => {
        board.placeShip(5,'v',[9,9])
}
).toThrow('Position out of bounds')
})

it('Cant add ship out of board, starting point in board, horizontal', () => {
    const board = GameBoard()
    expect(() => {
        board.placeShip(5,'h',[9,9])
}
).toThrow('Position out of bounds')
})

it('Starts without hits', () => {
    const board = GameBoard()
    expect(board.getSquare(5,5).hit).toBe(false)
})

it('Square can be hit', () => {
    const board = GameBoard()
    board.receiveAttack(5,5)
    expect(board.getSquare(5,5).hit).toBe(true)
})

it('Ship takes one hit from board', () => {
    const board = GameBoard()
    board.placeShip(2,'v',[5,5])
    board.receiveAttack(5,5)
    expect(board.getShips()[0].timesHit).toBe(1)
})

it('Ship takes two hits from board', () => {
    const board = GameBoard()
    board.placeShip(2,'v',[5,5])
    board.receiveAttack(5,5)
    board.receiveAttack(6,5)
    expect(board.getShips()[0].timesHit).toBe(2)
})

it('Ship size 3 takes two hits from board and is not sunk', () => {
    const board = GameBoard()
    board.placeShip(3,'v',[5,5])
    board.receiveAttack(5,5)
    board.receiveAttack(6,5)
    expect(board.getShips()[0].isSunk).toBe(false)
})

it('Ship size 3 takes three hits from board and is sunk', () => {
    const board = GameBoard()
    board.placeShip(3,'v',[5,5])
    board.receiveAttack(5,5)
    board.receiveAttack(6,5)
    board.receiveAttack(7,5)
    expect(board.getShips()[0].isSunk).toBe(true)
})

it('Second ship is not sunk', () => {
    const board = GameBoard()
    board.placeShip(3,'v',[5,5])
    board.placeShip(3,'h',[0,0])
    board.receiveAttack(5,5)
    board.receiveAttack(6,5)
    board.receiveAttack(7,5)
    expect(board.getShips()[1].isSunk).toBe(false)
})

it('checks if all ships are sunk', () => {
    const board = GameBoard()
    board.placeShip(3,'v',[5,5])
    board.placeShip(2,'h',[0,0])
    board.receiveAttack(5,5)
    board.receiveAttack(6,5)
    board.receiveAttack(7,5)
    board.receiveAttack(0,0)
    board.receiveAttack(0,1)
    expect(board.checkIfAllSunk()).toBe(true)
})

it('checks if all ships are sunk, fails when not all are sunk', () => {
    const board = GameBoard()
    board.placeShip(3,'v',[5,5])
    board.placeShip(2,'h',[0,0])
    board.receiveAttack(5,5)
    board.receiveAttack(6,5)
    board.receiveAttack(7,5)
    board.receiveAttack(0,0)
    expect(board.checkIfAllSunk()).toBe(false)
})