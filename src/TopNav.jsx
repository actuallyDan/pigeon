import React, {Component} from 'react';
import swal from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';

export default class TopNav extends Component {
	newConvo(){
		let propHandler = this.props;
		swal({
			title: "New Conversation",
			text: 'Enter the user\'s ID',
			type: 'input',
			showCancelButton: true,
			closeOnCancel: true
		}, function(inputValue){
			if(inputValue === false){
				return false;
			}
			inputValue = inputValue.trim()
			if(inputValue !== "" && inputValue.length > 6){
				propHandler.setConversation(inputValue);		
			}
	});
	}
	backToMessages(){
		this.props.setConversation(null);
	}
	render(){
		switch(this.props.view){

			case "conversation":
			return(
				<nav id="topnav" className="animated fadeIn">
				<div id="settings-button" className="mdi mdi-chevron-left" onClick={this.backToMessages.bind(this)}></div>
					<div id="conversation-username">{this.props.conversationHeader.username !== "" ? this.props.conversationHeader.username : this.props.conversationHeader.userId}</div>
				<div id="new-message-button" className="mdi mdi-block-helper"></div>
				</nav>
				)
			default:
			return(
				<nav id="topnav" className="animated fadeIn">
				<div id="settings-button" className="mdi mdi-sort-variant"></div>
				<div id="new-message-button" className="mdi mdi-account-plus" onClick={this.newConvo.bind(this)}></div>
				</nav>
				)
		}
	}
}