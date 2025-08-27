// socket.io
const gameSocket = require("./gameSockets")

module.exports = (io) => {
    // Khởi tạo game socket
    gameSocket(io)
}
