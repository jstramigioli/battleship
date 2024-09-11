function initializeUI(newGame) {
    const game = newGame()
    const player1 = game.player1
    const player2 = game.player2
    const myBoard = document.querySelector('#my-board')
    const enemyBoard = document.querySelector('#enemy-board')
    createMyBoard(myBoard, player1)
    createEnemyBoard(enemyBoard, player2, player1, newGame)
    renderEnemyShips(player2)
    const resetBtn = document.querySelector('.reset')
    resetBtn.addEventListener('click', () => {
        playAgain(newGame)})
}

function clearBoards() {
    const myBoard = document.querySelector('#my-board')
    myBoard.innerHTML = ''
    const enemyBoard = document.querySelector('#enemy-board')
    enemyBoard.innerHTML = ''
    const enemyShipsContainer = document.querySelector('.ships')
    enemyShipsContainer.innerHTML = ''
}

function playAgain(newGame) {
    clearBoards()
    const content = document.querySelector('#content')
    if (document.querySelector('.endgame-container')) {
        content.removeChild(content.lastChild)
    }
    initializeUI(newGame)
    
    
}

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

function createEnemyBoard(boardContainer, player, opponent, newGame) {
    function populateSquares() {
        for (let i = 0 ; i < 10 ; i++) {
            for (let j = 0 ; j < 10 ; j++) {
                const square = document.createElement('div')
                square.dataset.row = i
                square.dataset.column = j
                square.classList.add('square')
                square.classList.add('enemy')
                square.addEventListener('click', hitHandler)
                
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

    function disablePlayerInteraction() {
        const enemySquares = document.querySelectorAll('.enemy.square')
        enemySquares.forEach((square) => {
            square.removeEventListener('click', hitHandler)
        })
    }

    function restorePlayerInteraction() {
        const enemySquares = document.querySelectorAll('.enemy.square')
        enemySquares.forEach((square) => {
            square.addEventListener('click', hitHandler)
        })
    }

    function setTurnMessage(msg) {
        const turnMsg = document.querySelector('.message.frame')
        turnMsg.textContent = msg
    }

    

    const hitHandler = (e) => {
        


        const row = e.target.dataset.row
        const col = e.target.dataset.column
        const squareDOM = e.target
        const square = player.gameBoard.getSquare(row,col)
        const squaresToUpdate = opponent.playTurn(player, square)
        disablePlayerInteraction()
        setTurnMessage('PC playing')

        let delay = 0
        
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
            delay = i*1000
            }
            
        }

        if (player.won || opponent.won) {
            const endgameContainer = document.createElement('div')
            endgameContainer.classList.add('endgame-container')
            const endgameMsg = document.createElement('div')
            endgameMsg.classList.add('endgame-msg')
            if (opponent.won) {
                endgameMsg.textContent = 'You win'
            }
            else {
                endgameMsg.textContent = 'You lose'
            }
            endgameContainer.appendChild(endgameMsg)
            const playAgainBtn = document.createElement('button')
            playAgainBtn.classList.add('play-again')
            playAgainBtn.textContent = 'Play again?'
            playAgainBtn.addEventListener('click', () => {
                playAgain(newGame)})
            endgameContainer.appendChild(playAgainBtn)
            const content = document.querySelector('#content')
            content.appendChild(endgameContainer)
        }
        else {
            setTimeout(() => {
                setTurnMessage('Your turn!')
                restorePlayerInteraction()
            }, delay)
            
        }
    }
    
    populateSquares()
    placeShipsInBoard()
}

function renderEnemyShips(enemy) {
    
        const enemyShipsDisplay = document.querySelector('.ships.frame')
        for (let i = 0 ; i < enemy.gameBoard.getShips().length ; i++) {
            const ship = enemy.gameBoard.getShips()[i]
            ship.orientation = 'h'
            const shipDom = createShipDom(ship)
            enemyShipsDisplay.appendChild(shipDom)
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





export { 
    initializeUI
 }