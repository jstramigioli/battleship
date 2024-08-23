import { Player, PlayerPC } from "./Player.js"
import { fireEvent } from "@testing-library/dom"

it('Player board has square 0 0', () => {
    const player = Player()
    expect(player.gameBoard.getSquare(0,0)).toBeTruthy()
})

it('Player board has square 9 9', () => {
    const player = Player()
    expect(player.gameBoard.getSquare(9,9)).toBeTruthy()
})

it('Player board has square 10 10', () => {
    const player = Player()
    expect(player.gameBoard.getSquare(10,10)).not.toBeTruthy()
})

it('Player board has ships', () => {
    const player = Player()
    player.populateBoard()
    expect(player.gameBoard.getShips().length > 0).toBeTruthy()
})

it('Player board can recieve attacks', () => {
    const player = Player()
    player.gameBoard.receiveAttack(0,0)
    expect(player.gameBoard.getSquare(0,0).hit).toBeTruthy()
})

it('Attacking player 1 doesnt affect player 2', () => {
    const player1 = Player()
    const player2 = PlayerPC()
    player1.gameBoard.receiveAttack(0,0)
    expect(player2.gameBoard.getSquare(0,0).hit).toBeFalsy()
})

it('PlayerPC plays turn', () => {
    const player1 = Player()
    const player2 = PlayerPC()
    player2.playTurn(player1)
    expect(player1.gameBoard.ownSquaresHit.length).toBe(1)
})

it('PlayerPC plays two turns', () => {
    const player1 = Player()
    const player2 = PlayerPC()
    player2.playTurn(player1)
    player2.playTurn(player1)
    expect(player1.gameBoard.ownSquaresHit.length).toBe(2)
})

it('PlayerPC turn can hit a ship', () => {
    const player1 = Player()
    const player2 = PlayerPC()
    player1.gameBoard.placeShip(2, 'h', [0,0])
    player2.playTurn(player1, {row: 0, col: 0})
    expect(player1.gameBoard.getShips()[0].timesHit).toBe(1)
})