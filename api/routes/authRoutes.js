const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/exists/email/:email', authController.existsByEmail);
router.get('/exists/username/:username', authController.existsByUsername);

module.exports = router;