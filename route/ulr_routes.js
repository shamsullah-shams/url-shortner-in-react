const express = require('express');
const url_controller = require('../controller/url_controller');


const router = express.Router();

router.post('/create/shortUrl' , url_controller.createShortUrl);
router.get('/:token' , url_controller.redirectionToOUrl);




module.exports = router;