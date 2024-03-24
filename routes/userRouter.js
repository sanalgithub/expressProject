const express = require('express');
const { regUser, login, currentUser } = require('../controllers/userController');
const router = express.Router();

router.post("/register", regUser);
router.post("/login", login);
router.get('/currentUser',currentUser)

module.exports = router;
