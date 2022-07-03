const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const url_routes = require('./route/ulr_routes');
const user_routes = require('./route/user_routes');
const compression = require('compression');
const path = require('path');
require('dotenv').config();


// @@ static port number and Mongodb url
const PORT = process.env.PORT || 8080;
const MONGODB_URL = "mongodb://localhost:27017/url_shortner"



const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public', 'build')));

// @@ solving problem of CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'Get, Post');
    next();
})

// @@ user routes
app.use('/user', user_routes);
// @@ url routes
app.use('/url', url_routes);

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
})



mongoose.connect(MONGODB_URL, (err) => {
    if (err) {
        return console.log(err);
    }
    app.listen(PORT, () => {
        console.log('server is running')
    });
})