const createMyBoard = (boardContainer, player) => {

    function populateSquares() {
        for (let i = 0 ; i < 10 ; i++) {
            for (let j = 0 ; j < 10 ; j++) {
                const square = document.createElement('div')
                square.dataset.row = i
                square.dataset.column = j
                square.classList.add('square')
                
                boardContainer.appendChild(square) 
                
            }
        }
    }
   
    

    function placeShipsInBoard() {
        for (let i = 0 ; i < player.gameBoard.getShips().length ; i++) {
            const ship = player.gameBoard.getShips()[i]
            const shipDom = createShipDom(ship)
            shipDom.style.gridRowStart = ship.start[0]+1
            shipDom.style.gridColumnStart = ship.start[1]+1
            boardContainer.appendChild(shipDom)
        }
    }

    
    populateSquares()
    placeShipsInBoard()
    
}

function createEnemyBoard(boardContainer, player, opponent) {
    function populateSquares() {
        for (let i = 0 ; i < 10 ; i++) {
            for (let j = 0 ; j < 10 ; j++) {
                const square = document.createElement('div')
                square.dataset.row = i
                square.dataset.column = j
                square.classList.add('square')
                square.classList.add('enemy')
                square.addEventListener('click', (e) => {
                        hitHandler(e)
                })
                
                boardContainer.appendChild(square) 
                
            }
        }
    }

    function placeShipsInBoard() {
        for (let i = 0 ; i < player.gameBoard.getShips().length ; i++) {
            const ship = player.gameBoard.getShips()[i]
            const shipDom = createShipDom(ship)
            shipDom.style.gridRowStart = ship.start[0]+1
            shipDom.style.gridColumnStart = ship.start[1]+1
            shipDom.classList.add('enemy')
            boardContainer.appendChild(shipDom)
        }
    }

    const hitHandler = (e) => {
        const row = e.target.dataset.row
        const col = e.target.dataset.column
        const squareDOM = e.target
        const square = player.gameBoard.getSquare(row,col)
        const squaresToUpdate = opponent.playTurn(player, square)
        
        /* squaresToUpdate.forEach((el) => {
            let boardToUpdate = boardContainer
            if (el.id == '01') {
                boardToUpdate = document.querySelector('#my-board')
            }
            updateSquare(el.square, boardToUpdate)
            updateShips(el.square)
            setTimeout((

            )=>{},1000)
        })
         */
        for (let i = 0; i < squaresToUpdate.length ; i++) {
            const el = squaresToUpdate[i]
            let boardToUpdate = boardContainer
            if (el.id == '01') {
                    boardToUpdate = document.querySelector('#my-board')
                }
            if (i == 0) {
                
            updateSquare(el.square, boardToUpdate)
            updateShips(el.square)
            }
            else {
            setTimeout(()=>{
            updateSquare(el.square, boardToUpdate)
            updateShips(el.square)
            },i*1000)
            }
            
        }

        
        
    }

    populateSquares()
    placeShipsInBoard()
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



export { createMyBoard,
    createEnemyBoard,
    updateSquare
 }