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

function checkWin(index) {
    const directions = [
        {
            step: 1,
            check: (i, next) =>
                Math.floor(i / size) === Math.floor(next / size),
        }, // ngang →
        { step: size, check: () => true }, // dọc ↓
        { step: size + 1, check: () => true }, // chéo ↘
        {
            step: size - 1,
            check: (i, next) =>
                Math.abs(Math.floor(i / size) - Math.floor(next / size)) === 1,
        }, // chéo ↙
    ]

    for (let dir of directions) {
        let count = 1

        for (let stepDir of [-1, 1]) {
            let i = index
            while (true) {
                const next = i + stepDir * dir.step
                if (next < 0 || next >= size * size) break

                // Kiểm tra biên cho từng hướng
                if (dir.check && !dir.check(i, next)) break

                if (cells[next] !== currentPlayer) break

                count++
                i = next
            }
        }

        if (count >= winCount) return true
    }
    return false
}

// reset

function resetGame() {
    gameOver = false
    currentPlayer = "X"
    statusDiv.innerHTML = `Turn: <strong>${currentPlayer}</strong>`
    createBoard()
    socket.emit("reset")
}

createBoard()

function createBoardFromCells(cellsData) {
    board.style.gridTemplateColumns = `repeat(${size}, 40px)`
    board.innerHTML = ""
    cells = cellsData

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div")
        cell.className = "cell"
        cell.textContent = cells[i]
        cell.dataset.index = i
        cell.addEventListener("click", handleClick)
        board.appendChild(cell)
    }
}
// SOCKET ON
