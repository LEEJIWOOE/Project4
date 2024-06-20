const crypto = require('crypto');

// 256비트(32바이트) 길이의 랜덤 키 생성
const secretKey = crypto.randomBytes(32).toString('hex');

console.log(secretKey);