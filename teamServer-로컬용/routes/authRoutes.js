const express = require('express');
const oracledb = require('oracledb');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

const router = express.Router();
oracledb.initOracleClient({ libDir: 'D:\\instantclient_21_14' });

router.post('/register', registerController.register);
router.post('/login', loginController.login);

// 로그아웃 라우트 추가
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        } else {
            res.send('Logged out');
        }
    });
});

module.exports = router;
