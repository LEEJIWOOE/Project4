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

        // 바인드 변수에 실제 userid 값을 설정
        const bindVars = {
            userid: {
                val: userid, // 'userid' 대신 변수 userid의 실제 값 사용
                dir: oracledb.BIND_IN,
                type: oracledb.DB_TYPE_VARCHAR,
                maxSize: 1000
            }
        };

        const result = await connection.execute(
            `SELECT USERID, PASSWORD FROM USERS WHERE USERID = :userid`,
            bindVars
        );

        console.log('Query result:', result);

        if (result.rows.length === 0) {
            console.log('Invalid credentials: User not found');
            return res.status(401).send('Invalid credentials');
        }

        const user = result.rows[0];
        console.log('User found:', user);

        // 각 컬럼에 대한 정보 출력 (디버깅용)
        console.log('USERID:', user[0]);
        console.log('PASSWORD:', user[1]);

        // 암호화된 비밀번호와 비교
        const isPasswordValid = await bcrypt.compare(password, user[1]);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('Invalid credentials: Password mismatch');
            return res.status(401).send('Invalid credentials');
        }

        // JWT 토큰 생성
        const token = jwtUtils.generateToken({ userid: user[0] });
        console.log('Token generated:', token);

        res.json({ token });
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
