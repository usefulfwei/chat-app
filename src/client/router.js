/**
 * Created by jwdn on 2017/2/19.
 */
import React, { Component } from 'react';
import {Router,Route,hashHistory,Link,IndexRoute,Redirect,browserHistory} from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';


export default class Routers extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path='/login' component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/chat" component={Chat}/>
          </Route>
        </Router>
    )
  }
}