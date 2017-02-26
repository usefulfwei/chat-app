
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const setting  = require('./settings');
import User from './User';
const app = express();

require('./db');
const mongoose = require('mongoose');
app.use(express.static(__dirname + '/public'));
// dev-API
// global.API = 'http://localhost:8888';
//加密
// var utils = require('./utils/md5');
const router = require('./routes');
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser.json())

app.use('*',function (req,res,next) {
  next();
})
app.use('/', router);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


/*import { Server } from 'http';
import socketio from 'socket.io';*/
// import User from './User';




const http = require('http').Server(app);
const io = require('socket.io')(http);

// const server = Server(app);
// const sio = socketio(server);

const allUsers = new Map();
/*
 io.sockets.on('connection', function (socket) { ... }) 的作用是服务器监听所有客户端，
 并返回该新连接对象，接下来我们就可以通过该连接对象（socket）与客户端进行通信了。
* */
io.on('connection', (socket) => {
  const user = new User(socket, allUsers);
  user.start();
});

const port = 8888;

http.listen(port);

console.log(`Server listening on port ${port}`);
