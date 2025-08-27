let players = []
let currentTurn = "X"

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("🔌 New user connected:", socket.id)

        if (players.length >= 2) {
            socket.emit("full", "Phòng đã đầy!")
            socket.disconnect()
            return
        }

        // Gán role cho người chơi mới
        const role = players.length === 0 ? "X" : "O"
        players.push({ id: socket.id, role })
        socket.emit("role", { role, currentTurn })

        // Kiểm tra số lượng người chơi
        if (players.length < 2) {
            socket.emit("waiting", "Waiting for opponent...")
        } else if (players.length === 2) {
            io.emit("startGame")
        }

        // Xử lý nước đi
        socket.on("move", (data) => {
            socket.broadcast.emit("move", data)
            currentTurn = currentTurn === "X" ? "O" : "X"
            io.emit("turn", currentTurn)
        })

        socket.on("win", (data) => {
            io.emit("win", data)
        })

        socket.on("draw", (data) => {
            io.emit("draw", data)
        })

        socket.on("reset", () => {
            currentTurn = "X"
            io.emit("reset")
            io.emit("turn", currentTurn)
        })

        socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id)
            players = players.filter((p) => p.id !== socket.id)
            currentTurn = "X"

            if (players.length === 1) {
                io.to(players[0].id).emit("waiting", "Waiting for opponent...")
            } else if (players.length === 0) {
                currentTurn = "X"
            }
        })
    })
}
