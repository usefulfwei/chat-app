import React, { Component } from 'react';
import {Router,Route,hashHistory,Link,IndexRoute,Redirect,browserHistory} from 'react-router';
import io from 'socket.io-client';
import Messages from './Messages';
import InputBox from './InputBox';
import UserList from './UserList';
import { getUrl } from '../util/getUrl';

const USER_TOKEN = 'userToken';
const API = 'http://localhost:8888/'


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: null,
      listener: null,
      users: [],
      messages: new Map(),
      preMessages: []
    }
  }

  componentWillMount() {
    this.socket = io.connect(API);

    this.socket.on('usersUpdate', this.handleUsersUpdate.bind(this));
    this.socket.on('messageReceived', this.handleReceiveMessage.bind(this));
  }
  // shouldComponentUpdate(){
  //   this.socket.on('usersUpdate', this.handleUsersUpdate.bind(this));
  //   console.log('shouldComponentUpdate')
  //   return true;
  // }
  // componentWillUpdate(){
  //   this.socket.on('usersUpdate', this.handleUsersUpdate.bind(this));
  //   console.log('componentWillUpdate')
  // }
  componentDidMount() {
    let token = localStorage.getItem(USER_TOKEN);
    if (!token) {
      alert('need to log in first')
      browserHistory.push({
        pathname: '/login'
      })
    }
    if (this.props.location.state.username) {
      let name = this.props.location.state.username;
      this.socket.emit('join', name, (loggedUser) => {
        this.setState({
          loggedUser:loggedUser
        })
      })
    }
    this.socket.on('usersUpdate', this.handleUsersUpdate.bind(this));
    let users = this.state.users || [];
    if(users == []){
      return;
    }else if(this.state.listener == null){
      return;
    }else if(users.get(this.state.listener.id) == undefined){
      this.setState({
        listener:null
      })
    }
  }

  fetchMessage(user) {
    if (this.state.loggedUser) {
      let userName = this.state.loggedUser.name;
      let listenerName = user.name;
      let searchInfo = {
        senderName: userName,
        listenerName: listenerName
      }
      let url = API + 'chat' + getUrl(searchInfo);
      let _options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      fetch(url, _options)
          .then(res => res.json())
          .then(resJson => {
            this.setState({
              preMessages: resJson
            })
          })
          // .catch(err => {
          //   alert('fail to fetch pre message')
          // })
    }
  }

  handleUsersUpdate(users) {
    this.setState({
      users:users
    })

  }

  handleReceiveMessage(message) {
    message.read = this.state.listener !== null && message.sender.id === this.state.listener.id;
    const allMessages = this.state.messages;
    let senderMessages = allMessages.get(message.sender.id);

    if (!senderMessages) {
      senderMessages = [];
      allMessages.set(message.sender.id, senderMessages);
    }

    senderMessages.push(message);

    this.setState({allMessages});
  }

  sendMessage(payload) {
    let listener = this.state.listener;
    if(!listener){
      alert('please choose a listener first')
    }else{
      const message = {
        listener: listener,
        msg: payload
      }
      this.socket.emit('sendMessage', message, (reverseMessage) => {
        const allMessages = this.state.messages;
        reverseMessage.read = true;

        let recipientMessages = allMessages.get(reverseMessage.listener.id);

        if (!recipientMessages) {
          recipientMessages = [];
          allMessages.set(reverseMessage.listener.id, recipientMessages);
        }

        recipientMessages.push(reverseMessage);
        this.setState({
          allMessages
        })
      })
    }
  }

  changeListener(user) {
    const allMessages = this.state.messages;
    const senderMessages =  allMessages.get(user.id) || [];
    if (senderMessages) {
      senderMessages.forEach((msg) => {
        msg.read = true;
      });
    }
    this.setState({
      listener:user,
      messages: allMessages
    })
    // this.fetchMessage(user);
  }

  handleLeave() {
    localStorage.removeItem(USER_TOKEN);
  }

  render() {
    let loggedUser = this.state.loggedUser;
    let otherUsers = [];
    otherUsers = this.state.users.filter(user => user.id !== loggedUser.id);
    let userMessages = [];
    userMessages = this.state.listener !== null ? this.state.messages.get(this.state.listener.id): [];
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-8 col-md-9 col-lg-9">
                <Messages messages={userMessages} user={this.state.loggedUser} listener={this.state.listener}
                  preMessages={this.state.preMessages} {...this.props}
                />
                <InputBox sendMessage={this.sendMessage.bind(this)}/>
            </div>
            <div className="col-sm-4 col-md-3 col-lg-3">
              <UserList otherUsers={otherUsers} messages={this.state.messages}
                        changeListener={this.changeListener.bind(this)}
                        handleLeave={this.handleLeave.bind(this)}
              />
            </div>
          </div>
        </div>
    )
  }
}
