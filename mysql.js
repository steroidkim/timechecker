const mysql = require('mysql');
const db_config = require('./config/db_config.json');
const conn = mysql.createConnection({
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
});
conn.connect(err => { 
    if (err) console.log({ err: err });
    else console.log('sql connected');
}); 
module.exports = conn;
