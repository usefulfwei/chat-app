/**
 * Created by jwdn on 2017/2/19.
 */
import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';
import User from './User';

const USER_TOKEN = 'userToken';

export default class UserList extends Component{
  constructor(props){
    super(props);
  }
  Leave(){
    this.props.handleLeave();
  }
  render(){
    let otherUsers = this.props.otherUsers || [];
    let messages = this.props.messages || [];
    return(
        <div className="user-list">
          <ul>
            {
              otherUsers.map((user,id)=>{
               return <User user={user} key={id} changeListener={this.props.changeListener.bind(this)} messages={messages.get(user.id)} />
             })
            }
          </ul>
          <Link to="/login" className="btn btn-danger btn-block" onClick={this.Leave.bind(this)}>Quit</Link>
        </div>
    )
  }
}