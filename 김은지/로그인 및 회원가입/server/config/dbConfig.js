module.exports = {
    user: process.env.DB_USER || "kyb",
    password: process.env.DB_PASSWORD || "1111",
    connectString: process.env.DB_CONNECT_STRING || "192.168.0.17:1521/xe",
    externalAuth: false
};