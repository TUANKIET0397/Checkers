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