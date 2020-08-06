const express = require('express');

const accountController = require('../controllers/account');

const router = express.Router();
router.use(express.json());

// POST /me
router.post('/me', accountController.getUser);
//GET /logout
router.get('/logout', accountController.logoutUser);

module.exports = router;