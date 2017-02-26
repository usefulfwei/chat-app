
import React, {Component} from 'react';

export default class InputBox extends Component {
  handleSendMessage(e) {
    e.preventDefault();
    const message = this.messageInput.value;
    if (message !== '') {
      this.messageInput.value = '';
      this.props.sendMessage(message);
    }
  }
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSendMessage(e);
    }
  }
  render() {
    return (
        <div className="input-form">
          <div className="col-sm-10 col-md-10 col-lg-10">
              <textarea ref={(ref) => this.messageInput = ref} className="form-control" rows="5" onKeyDown={this.handleKeyDown.bind(this)} />
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2">
                <button type="button" className="btn btn-success btn-block" onClick={this.handleSendMessage.bind(this)}>Send</button>
          </div>
        </div>
    );
  }
}
