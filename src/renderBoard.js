const createBoard = (boardContainer, player) => {

    function populateSquares() {
        for (let i = 0 ; i < 10 ; i++) {
            for (let j = 0 ; j < 10 ; j++) {
                const square = document.createElement('div')
                square.dataset.row = i
                square.dataset.column = j
                square.classList.add('square')
                if (player.isEnemy) {
                    square.classList.add('enemy')
                }
                square.addEventListener('click', (e) => {
                    hitHandler(e)
                })
                boardContainer.appendChild(square) 
                
            }
        }
    }
   
    const hitHandler = (e) => {
        const row = e.target.dataset.row
        const col = e.target.dataset.column
        const squareDOM = e.target
        player.gameBoard.receiveAttack(row,col)
        const square = player.gameBoard.getSquare(row,col)
        updateSquare(square, boardContainer)
        updateShips(square)
        
    }

    function placeShipsInBoard() {
        for (let i = 0 ; i < player.gameBoard.getShips().length ; i++) {
            const ship = player.gameBoard.getShips()[i]
            const shipDom = createShipDom(ship)
            shipDom.style.gridRowStart = ship.start[0]+1
            shipDom.style.gridColumnStart = ship.start[1]+1
            if (player.isEnemy) {
                shipDom.classList.add('enemy')
            }
            boardContainer.appendChild(shipDom)
        }
    }

    function renderEnemyShips() {
        if (player.isEnemy) {
            const enemyShipsDisplay = document.querySelector('.ships.frame')
            for (let i = 0 ; i < player.gameBoard.getShips().length ; i++) {
                const ship = player.gameBoard.getShips()[i]
                const shipDom = createShipDom(ship)
                enemyShipsDisplay.appendChild(shipDom)
            }
        }
    }
    
    populateSquares()
    placeShipsInBoard()
    renderEnemyShips()
    
}



const updateSquare = (square, boardDOM) => {
    const squareDOM = boardDOM.querySelector(`[data-row='${square.row}'][data-column='${square.col}']`)
    
    if (square.hit) {
        const hitCircle = document.createElement('div')
        hitCircle.classList.add('circle')
        squareDOM.appendChild(hitCircle)
        squareDOM.classList.add('hit')
    }
    if (square.ship) {
        squareDOM.classList.add('has-ship')
    }
    
}

function updateShips(square) {
    function checkIfSunk(square) {
        return square.ship.isSunk
    }
    
    if (square.ship && checkIfSunk(square)) {
        
        const ships = document.querySelectorAll(`[data-ship-id="${square.ship.id}"]`)
        ships.forEach(ship => ship.classList.add('sunk'))
    }
}

const createShipDom = (ship) => {
    const shipDom = document.createElement('div')
    shipDom.classList.add('ship')
    shipDom.style.height = '28px'
    shipDom.style.width = `${ship.length * 40 + (ship.length -1) * 3}px`
    shipDom.dataset.shipId = ship.id
    if (ship.orientation == 'v') {
        shipDom.classList.add('vertical')
    }
    return shipDom
}



export { createBoard,
    updateSquare
 }