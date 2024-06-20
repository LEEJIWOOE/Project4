// JWT 토큰을 생성하고 검증하는 유틸리티 함수를 포함
// 코드 중복을 줄이기 위해 공통 기능을 유틸리티로 분류

const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

const generateToken = (users) => {
    return jwt.sign({ id: users[0], userid: users[1] }, jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };