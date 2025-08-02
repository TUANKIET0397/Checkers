const size = 10 // Kích thước bàn cờ (size x size)
const winCount = 5 // Số ký tự liên tiếp để thắng
const board = document.getElementById("board")
const statusDiv = document.getElementById("status")

let currentPlayer = "X"
let cells = []
let gameOver = false

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
    const index = +e.target.dataset.index
    if (cells[index] || gameOver) return

    cells[index] = currentPlayer
    e.target.textContent = currentPlayer

    if (checkWin(index)) {
        statusDiv.innerHTML = `🎉 Người chơi <strong>${currentPlayer}</strong> thắng!`
        gameOver = true
    } else if (cells.every((c) => c)) {
        statusDiv.innerText = "🤝 Hòa!"
        gameOver = true
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"
        statusDiv.innerHTML = `Đến lượt: <strong>${currentPlayer}</strong>`
    }
}

function checkWin(index) {
    const directions = [
        [1], // ngang →
        [size], // dọc ↓
        [size + 1], // chéo ↘
        [size - 1], // chéo ↙
    ]

    for (let dir of directions) {
        let count = 1

        for (let step of [-1, 1]) {
            let i = index
            while (true) {
                const next = i + step * dir[0]
                const row = Math.floor(i / size)
                const nextRow = Math.floor(next / size)

                // Kiểm tra biên và tính liên tiếp
                if (next < 0 || next >= size * size) break
                if (
                    Math.abs(nextRow - row) > 1 &&
                    dir[0] !== 1 &&
                    dir[0] !== size
                )
                    break
                if (cells[next] !== currentPlayer) break

                count++
                i = next
            }
        }

        if (count >= winCount) return true
    }
    return false
}

function resetGame() {
    gameOver = false
    currentPlayer = "X"
    statusDiv.innerHTML = `Đến lượt: <strong>${currentPlayer}</strong>`
    createBoard()
}

createBoard()
