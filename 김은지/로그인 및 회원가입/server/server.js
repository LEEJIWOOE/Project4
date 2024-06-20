const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes); // 베이스 경로 설정

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
