const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.post('/player', siteController.player);
router.get('/', siteController.index);

module.exports = router;
