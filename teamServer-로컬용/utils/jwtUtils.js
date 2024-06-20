const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            userid: user.userid,
            nickname: user.nickname,
            realname: user.realname,
            mileage: user.mileage,
        },
        jwtSecret
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        console.error('JWT verification error:', err);
        return null;
    }
};

module.exports = { generateToken, verifyToken };
