const shipFactory = (length) => {
    let timesHit = 0
    let isSunk = false
    function hit() {
        this.timesHit++
        if (this.timesHit === this.length) {
            this.isSunk = true
        }
    }
    
    return {length,
        timesHit,
        hit,
        isSunk
    }
}

const ship = shipFactory(1)
    ship.hit()
    console.log(ship.timesHit)

export {shipFactory}