/**
 * Created by jwdn on 2017/2/19.
 */
import React, { Component } from 'react';

export default class Messages extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let loggedUser = this.props.user || null;
    let preMessages = this.props.preMessages || [];
    let listenerName = this.props.listener != null ? this.props.listener.name : 'nobody';
    let messages = this.props.messages || [];
    return(
          <div className="message">
            <h4 className="join-text">Logged as  {this.props.location.state.username}</h4>
            {
              preMessages.map((message,index) =>{
                let judge = message.senderName == loggedUser.name ? 'self-message' : 'partner-message';
                let classStr = judge ? 'self-message col-sm-pull-1' : 'partner-message col-sm-push-1';
                classStr += "  col-sm-4 col-md-4 col-lg-4 panel";
                return(
                    <div className="row"  key={index}>
                      <div  className={classStr}>
                        <div className="panel-body message-list">
                          {judge ? loggedUser.name : this.props.listener.name} at {message.sendDate}
                          <br/>
                          <span>{message.message}</span>
                        </div>
                      </div>
                    </div>
                )
            })
            }

            <h4 className="join-text">Now you are talk to {listenerName}</h4>
            {
              messages.map((message, idx) => {
                let judge = message.isReverse;
                let classStr = judge ? 'self-message col-sm-pull-1' : 'partner-message col-sm-push-1';
                classStr += "  col-sm-4 col-md-4 col-lg-4 panel";
                return(
                    <div className="row"  key={idx}>
                      <div  className={classStr}>
                            <div className="panel-body message-list">
                              {judge ? this.props.user.name : this.props.listener.name} at {message.sendDate}
                              <br/>
                              <span>{message.msg}</span>
                            </div>
                      </div>
                    </div>
                    )
              })
            }
          </div>
    )
  }
}

