import React from 'react';

export default class LoginForm extends React.Component {
	handleSubmit(e){
		e.preventDefault();
		var d = document.getElementById("login-form");
		d.className += " animated fadeOut";
		this.props.registerUser(this.refs.username.value);
	}
	render(){
		return(
			<div className={window.localStorage.getItem("loggedIn") === true ? "container" : "container animated fadeIn"} id="login-form">
			<i className="logo-login mdi mdi-webhook"></i>
			<form onSubmit={this.handleSubmit.bind(this)} maxLength="75"> 
			<p>Please enter a username</p>
			<input className="form-input" placeholder="Username" ref="username"/>
			</form>
			</div>
			)
	}
}