import { Player, PlayerPC } from "./Player.js"
import { GameBoard } from "./GameBoard.js"

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