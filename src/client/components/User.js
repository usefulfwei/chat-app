/**
 * Created by jwdn on 2017/2/19.
 */
import React, { Component } from 'react';

export default class User extends Component{
  constructor(props){
    super(props)
  }

  changeListener(){
    this.props.changeListener(this.props.user);
  }
  render(){
    let user = this.props.user || [];
    let messages = this.props.messages || [];
    let unreadBadeg = ''
    const unread = messages.reduce((count,msg)=>{
      if(!msg.read){
        count++;
      }
      return count;
    },0)
    if(unread > 0){
      unreadBadeg = <span className="badge">{unread}</span>
    }

    return(
        <li onClick={this.changeListener.bind(this)}>{this.props.user.name}    <span>{unreadBadeg}</span></li>
    )
  }
}
