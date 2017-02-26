

import {date} from './utils/date';
export default class User {
  constructor(socket, users) {
    this.socket = socket;
    this.users = users;
    this.name = '';
  }

  start() {
    this.socket.on('join', this.onJoin.bind(this));
    this.socket.on('disconnect', this.onLeave.bind(this));
    this.socket.on('sendMessage', this.onSendMessage.bind(this));
  }

  onJoin(name, callback) {
    this.name = name;

    this.users.set(this.socket.id, this);
    callback({
      id: this.socket.id,
      name: name
    });

    this._sendUsers();
  }

  onLeave() {
    this.users.delete(this.socket.id);
    this._sendUsers();
  }

  onSendMessage(message, callback) {
    const listener = this.users.get(message.listener.id);

    message.sender = this.toJson();
    message.sendDate = date(new Date());
    Model('Message').create({
      sender:this.getName(),
      listener: listener.getName(),
      createAt: new Date(),
      sendDate: date(new Date()),
      message: message.msg
    },function(err,doc){
      if(err){
        // res.send({id:0,content:'err'})
        console.log('store wrong')
      }else{
        console.log('store success')
        // res.send({id:1,content:'success'})
      }
    })
    listener.sendMessage(message);

    message.isReverse = true;

    callback(message);
  }

  sendMessage(message) {
    this.socket.emit('messageReceived', message);
  }

  getId() {
    return this.socket.id;
  }

  getName() {
    return this.name;
  }

  toJson() {
    return {
      id: this.getId(),
      name: this.getName()
    };
  }

  _sendUsers() {
    const data = [];

    this.users.forEach((user, id) => {
      const name = user.getName();
      data.push(user.toJson());
    });

    this.socket.emit('usersUpdate', data);
    this.socket.broadcast.emit('usersUpdate', data);
    /*
     •	socket.emit() ：向建立该连接的客户端广播
     •	socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
     •	io.sockets.emit() ：向所有客户端广播，等同于上面两个的和
     * */
  }
}
