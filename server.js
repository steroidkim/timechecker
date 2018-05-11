const route = require('./route.js');
const express = require('express');
const app = express();
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use('/', route)
app.listen(3000, function() {
    console.log('connected 3000 port!');
});
