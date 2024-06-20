const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const session = require('express-session');
const dbConfig = require('./dbconfig');

oracledb.autoCommit = true;

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

app.use(express.json()); // JSON 형식의 데이터를 파싱할 수 있도록 설정
oracledb.initOracleClient({liDir: './intantclient_21_13'});

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
}));

app.post('/login', async (req, res) => {
    const { userid, password } = req.body;
    if (!userid || !password) {
        res.status(400).send('User ID and password are required');
        return;
    }

    const authenticatedUser = await verifyID(userid, password);
    console.log(authenticatedUser)
    if (authenticatedUser) {
        res.json({ message: 'Login successful!', user: authenticatedUser });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

async function verifyID(userid, password) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const sql_query = 'SELECT * FROM users WHERE userid = :userid AND password = :password';
        const result = await connection.execute(sql_query, [userid, password], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        if (result.rows.length > 0) {
            return {
                id: result.rows[0].ID,
                userid: result.rows[0].USERID,
                nickname: result.rows[0].NICKNAME
            };
        } else {
            return null; // Authentication failed
        }
    } catch (error) {
        console.error('Error occurred: ', error);
        throw error; // Re-throw the error to be handled by the calling function
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT; // 결과를 객체 형식으로 받기 위한 설정



app.use('/recyclingcenters', require('./routes/recycling'))
app.use('/napron', require('./routes/Napron'))
app.use('/zero', require('./routes/zero'))
app.use('/zeroimg', require('./routes/zero_image'))
app.use('/bus', require('./routes/bus'))
app.use('/home', require('./routes/year2015'))
app.use('/home1', require('./routes/year2020'))


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
