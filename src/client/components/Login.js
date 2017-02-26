/**
 * Created by jwdn on 2017/2/19.
 */
import React, { Component } from 'react';
import {Router,Route,hashHistory,Link,IndexRoute,Redirect,browserHistory} from 'react-router';
import md5 from 'md5';

const USER_TOKEN = 'userToken';
const API = 'http://localhost:8888/'

export default class Login extends Component{
  constructor(props){
    super(props)
  }
  handleLogin(e) {
    e.preventDefault();
    const name = this.nameInput.value;
    const password = this.passwordInput.value;
    if(name.length<3){
      alert('the length of username should more than 3')
      return;
    }
    if(password.length<5){
      alert('the length of password should more than 5')
      return;
    }
    let md5Password = md5(password);
    let userInfo = {
      username: name,
      password: md5Password
    }
    let _options = {
      method: 'POST',
      // mode: 'cors',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(userInfo)
    }
    fetch(`${API}login`,_options)
        .then((res)=> res.json())
        .then((resJson)=> {
          console.log("front side"+resJson);
          if(resJson.id == 1){
            localStorage.setItem(USER_TOKEN,resJson.content);
            console.log('login success')
            browserHistory.push({
              pathname:'/chat',
              state:{
                username: name
              }
            })

          }else{
            alert(resJson.content)
            browserHistory.push({
              pathname:'/register',
            })
          }
        })
        // .catch(err =>{
        //   alert(' log in failure')
        // })
    // this.props.handleJoin({
    //   name:name,
    //   password:password,
    // });
  }
  render(){
    return(
        <div className="login">
          <div className="container-fluid">
            <form className="form-join" onSubmit={this.handleLogin.bind(this)}>
              <h2 className="form-join-heading">My Chat</h2>
              <label htmlFor="nameInput" className="sr-only">Name</label>
              <input id="nameInput" type="text" className="form-control" placeholder="Name"
                     required="required" ref={(ref) => this.nameInput = ref} />
              <label htmlFor="nameInput" className="sr-only">Password</label>
              <input id="nameInput" type="password" className="form-control" placeholder="Password"
                     required="required" ref={(ref) => this.passwordInput = ref} />
              <button className="btn btn-lg btn-primary btn-block" type="submit">Join</button>
            </form>
            <br/>
            <p className="join-text"><Link to="/register">No account, first register</Link></p>
          </div>
        </div>
    )
  }
}
