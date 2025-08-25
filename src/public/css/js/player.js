const size = 10 // Kích thước bàn cờ (size x size)
const winCount = 5 // Số ký tự liên tiếp để thắng
const board = document.getElementById("board")
const statusDiv = document.getElementById("status")
const socket = io() // SOCKET

let myRole = null
let currentTurn = "X"
let currentPlayer = "X"
let cells = []
let gameOver = false
let canPlay = false

function createBoard() {
    board.style.gridTemplateColumns = `repeat(${size}, 40px)`
    board.innerHTML = ""
    cells = []

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div")
        cell.className = "cell"
        cell.dataset.index = i
        cell.addEventListener("click", handleClick)
        board.appendChild(cell)
        cells.push("")
    }
}

function handleClick(e) {
    if (!canPlay) {
        alert("Lack of player!")
        return
    }
    const index = +e.target.dataset.index
    if (cells[index] || gameOver) return

    if (myRole !== currentTurn) {
        alert("Not your turn!")
        return
    }

    cells[index] = myRole
    e.target.textContent = myRole

    if (checkWin(index)) {
        gameOver = true
        socket.emit("win", { winner: myRole, cells })
    } else if (cells.every((c) => c)) {
        gameOver = true
        socket.emit("draw", { cells })
    } else {
        socket.emit("move", { index, player: myRole })
        currentPlayer = currentPlayer === "X" ? "O" : "X"
        statusDiv.innerHTML = `Turn: <strong>${myRole}</strong>`
    }
}
// checkwin




// reset



createBoard()

function createBoardFromCells(cellsData) {
    board.style.gridTemplateColumns = `repeat(${size}, 40px)`
    board.innerHTML = ""
    cells = cellsData

    for (let i = 0; i < size * size; i++) {const cell = document.createElement("div")
        cell.className = "cell"
        cell.textContent = cells[i]
        cell.dataset.index = i
        cell.addEventListener("click", handleClick)
        board.appendChild(cell)
    }
}
// SOCKET ON
