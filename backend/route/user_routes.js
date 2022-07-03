const express = require('express');
const userContrller = require('../controller/user_Controller');
const router = express.Router();


// @@ route for signin a user
router.post('/signin', userContrller.postSigninUser);
// @@ route for sign up a user
router.post('/signup', userContrller.postSigupUser);
// @@ route for getting all urls with related user
router.post('/getHistory', userContrller.getHistory);
// @@ route for deleting all urls with related user
router.post('/clearhistory', userContrller.clearHistory);

module.exports = router;