const express = require('express');
const oracledb = require('oracledb');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

const router = express.Router();
oracledb.initOracleClient({libDir: 'D:\\instantclient_21_14'});

router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;
