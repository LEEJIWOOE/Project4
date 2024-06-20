// 미들웨어란? 요청이 라우트로 전달되기 전에 실행되는 함수
// 인증 미들웨어는 JWT(Json Web Token): Json 객체 인증에 필요한 정보들을 담은 후 비밀키로 서명한 토큰. <인터넷 표준 인증 방식>이므로 "공식적 인증(Authentication)과 권한허가(Authorization)방식으로 사용된다.
// https://velog.io/@chuu1019/%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90-JWTJson-Web-Token

const jwtUtils = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const decoded = jwtUtils.verifyToken(token);

    if (!decoded) {
        return res.status(401).send('Invalid token.');
    }

    req.user = decoded;
    next();
};

module.exports = authMiddleware;
