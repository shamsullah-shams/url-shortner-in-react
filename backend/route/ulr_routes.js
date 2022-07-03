const express = require('express');
const url_controller = require('../controller/url_controller');


const router = express.Router();

// @@ route for creating short urls
router.post('/create/shortUrl', url_controller.createShortUrl);
// @@ find long url according to the token
router.get('/:token', url_controller.redirectionToOUrl);

module.exports = router;