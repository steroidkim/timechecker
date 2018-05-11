const express = require('express');
const router = express.Router();
const mysql = require('./mysql.js')
router.get('/regend', function(req, res) {
//    res.render('regend');

    var sql = 'SELECT cuttime FROM bossinfo';
    //var d = new Date();
    //var sql = `INSERT INTO bossinfo (id, name, cuttime, guild, perhour) VALUES(16, 'my', ?, 'lala', 3)`;
    mysql.query(sql, function(err, rows) {
        res.render('regend');
        console.log(rows);
    });

});
module.exports = router;
