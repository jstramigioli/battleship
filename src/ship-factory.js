const shipFactory = (length, id, orientation) => {
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
        isSunk,
        id,
        orientation
    }
}


export {shipFactory}