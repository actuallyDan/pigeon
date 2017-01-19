import React, { Component } from 'react';
import Dashboard from './Dashboard.jsx';
import LoginForm from './LoginForm.jsx';
import 'mdi/css/materialdesignicons.min.css';
import './animate.min.css';
import swal from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedIn : window.localStorage.getItem("loggedIn")
    };
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + s4();
  }
  showDialoger(){

  }
  handleRegister(user){
    user = {"userId" : this.guid(), "username" : user};
    let messagesDb = {};
    messagesDb[user.userId] = {"userId" : user.userId , "username": user.username, messages: []};
    window.localStorage.setItem("userInfo", JSON.stringify(user));
    window.localStorage.setItem("loggedIn", true);
    window.localStorage.setItem("messages", JSON.stringify(messagesDb));
    this.setState({loggedIn : true});
  }
  render() {
    return (
      <div className="App">
      {this.state.loggedIn ? <Dashboard /> : <LoginForm registerUser={this.handleRegister.bind(this)} />}
      </div>
      );
  }
}

export default App;
