const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utils/jwtUtils');
const dbConfig = require('../config/dbConfig');

const register = async (req, res) => {
    const { userid, password, nickname, realname } = req.body;
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log('Database connection established for registration');

        // userid 중복 확인
        const result = await connection.execute(
            `SELECT COUNT(*) AS COUNT FROM USERS WHERE USERID = :userid`,
            { userid: { val: userid, type: oracledb.STRING } }
        );

        if (result.rows[0][0] > 0) {
            console.log('UserID already exists');
            return res.status(409).send('UserID already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute(
            `INSERT INTO USERS (USERID, PASSWORD, NICKNAME, REALNAME) VALUES (:userid, :password, :nickname, :realname)`,
            {
                userid: { val: userid, type: oracledb.STRING },
                password: { val: hashedPassword, type: oracledb.STRING },
                nickname: { val: nickname, type: oracledb.STRING },
                realname: { val: realname, type: oracledb.STRING }
            },
            { autoCommit: true }
        );

        console.log('User registered successfully');

        const token = jwtUtils.generateToken({ userid, nickname, realname });
        console.log('Token generated:', token);

        res.json({ token });
    } catch (err) {
        console.error('Error connecting to the database for registration:', err.message);
        res.status(500).send('Error registering user');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing the database connection for registration:', err.message);
            }
        }
    }
};

module.exports = { register };