// socket.io
const gameSocket = require("./gameSocket")

module.exports = (io) => {
    // Khởi tạo game socket
    gameSocket(io)
}