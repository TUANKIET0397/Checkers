class SiteController {
    index(req, res, next) {
        res.render("home", { title: "Start Game" })
    }
    // GET /news/search
    player(req, res) {
        const playerData = req.body
        // Lưu vào session
        // req.session.player = playerData
        // // Lưu vào DB
        // Player.create(playerData)
        // Xử lý logic game ở đây (hoặc render giao diện chơi)
        res.render("player", { title: "Game On", player: playerData })
    }
}

// export the instance of NewsController - xuất ra ngoài
module.exports = new SiteController()
