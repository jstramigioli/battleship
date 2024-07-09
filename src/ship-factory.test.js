import { shipFactory } from "./ship-factory.js"


it('Has length', () => {
    const ship = shipFactory(1)
    expect(ship.length).toBe(1)
})

it('Has timesHit', () => {
    const ship = shipFactory(1)
    expect(ship.timesHit).toBe(0)
})


it('Hit one time', () => {
    const ship = shipFactory(2)
    ship.hit()
    expect(ship.timesHit).toBe(1)
})

it('Hit two times', () => {
    const ship = shipFactory(2)
    ship.hit()
    ship.hit()
    expect(ship.timesHit).toBe(2)
})

it('Not sunk when created', () => {
    const ship = shipFactory(2)
    expect(ship.isSunk).toBe(false)
})

it('1 length ship is sunk when hit once', () => {
    const ship = shipFactory(1)
    ship.hit()
    expect(ship.isSunk).toBe(true)
})

it('2 length ship is not sunk when hit once', () => {
    const ship = shipFactory(2)
    ship.hit()
    expect(ship.isSunk).toBe(false)
})

it('2 length ship is sunk when hit twice', () => {
    const ship = shipFactory(2)
    ship.hit()
    ship.hit()
    expect(ship.isSunk).toBe(true)
})