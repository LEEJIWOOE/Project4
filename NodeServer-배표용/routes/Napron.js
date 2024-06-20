// routes/addComment.js
const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('../dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(`SELECT * FROM napron`);
        res.json(result.rows); // 자동으로 객체 형태의 결과를 JSON 배열로 전송
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching from database');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// POST 요청 처리
router.post('/', async (req, res) => {

});

module.exports = router;
