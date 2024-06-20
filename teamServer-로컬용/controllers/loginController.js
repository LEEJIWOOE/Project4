const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utils/jwtUtils');
const dbConfig = require('../config/dbConfig');

const login = async (req, res) => {
    const { userid, password } = req.body;
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log('Database connection established for login');

        const bindVars = {
            userid: {
                val: userid,
                dir: oracledb.BIND_IN,
                type: oracledb.DB_TYPE_VARCHAR,
                maxSize: 1000
            }
        };

        const result = await connection.execute(
            `SELECT * FROM USERS WHERE USERID = :userid`,
            bindVars
        );

        console.log('Query result:', result);

        if (result.rows.length === 0) {
            console.log('Invalid credentials: User not found');
            return res.status(401).send('Invalid credentials');
        }

        const user = result.rows[0];
        console.log('User found:', user);

        const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('Invalid credentials: Password mismatch');
            return res.status(401).send('Invalid credentials');
        }

        // 세션에 사용자 정보 저장
        req.session.user = {
            id: user.ID,
            userid: user.USERID,
            nickname: user.NICKNAME,
            realname: user.REALNAME,
            mileage: user.MILEAGE
        };
        console.log('Session user:', req.session.user);

        // JWT 토큰 생성
        const token = jwtUtils.generateToken(req.session.user);
        console.log('Token generated:', token);

        res.json({
            token: token,
            user: req.session.user
        });
    } catch (err) {
        console.error('Error connecting to the database for login:', err.message);
        res.status(500).send('Error logging in');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing the database connection for login:', err.message);
            }
        }
    }
};

module.exports = { login };
