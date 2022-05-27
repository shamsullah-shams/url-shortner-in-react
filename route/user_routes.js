const express = require('express');
const userContrller = require('../controller/user_Controller');
const router = express.Router();



router.post('/signin', userContrller.postSigninUser);
router.post('/signup' , userContrller.postSigupUser);
router.post('/getHistory' , userContrller.getHistory);
router.post('/clearhistory' , userContrller.clearHistory)  


module.exports = router;