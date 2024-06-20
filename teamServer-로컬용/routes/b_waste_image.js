const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');

const router = express.Router();

router.get('/', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        // 이 쿼리는 해당하는 BLOB 데이터를 포함하고 있다고 가정합니다.
        const result = await connection.execute(
            'SELECT * FROM b_waste',
            [], // No bind variables
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // 결과를 객체 형태로 반환
        );

        // 모든 이미지에 대해 base64 인코딩을 수행
        const images = await Promise.all(result.rows.map(async (row) => {
            // 각 BLOB 데이터를 base64 문자열로 변환
            const imageObj={};
            for(let i=1; i <=10; i++) {
                const imgField = `IMG${i}`;
                if (row[imgField]) {
                    imageObj[imgField] = await blobToBase64(row[imgField]);
                }
            }
            return {
                id: row.ID,
                title: row.TITLE,  // 추가된 부분
                ...imageObj
            };
        }));

        res.json(images);
    } catch (err) {
        console.log(err);
        res.status(500).send('에러남');
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

// Oracle BLOB을 Base64로 변환
async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        blob.on('data', (chunk) => {
            chunks.push(chunk);
        });
        blob.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const base64 = buffer.toString('base64');
            resolve(base64);
        });
        blob.on('error', (error) => {
            console.error('Error processing BLOB data:', error);
            reject(error);
        });
    });
}

module.exports = router;
