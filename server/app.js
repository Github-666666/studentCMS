var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CMS")
    .then(()=>{console.log("数据库连接成功")})
    .catch(()=>{console.log("数据库连接失败")})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    res.header({
        "Access-Control-Allow-Credentials":true,
        "Access-Control-Allow-Origin": req.headers.origin || '*',
        "Access-Control-Allow-Headers": 'Content-Type',
        "Access-Control-Allow-Methods": 'POST,GET,DELETE,PUT,OPTIONS',
        "Content-Type": 'application/json; charset=utf-8'
    });
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }else{
        next();
    }
})

app.use('/', require('./routes/index'));

module.exports = app;
