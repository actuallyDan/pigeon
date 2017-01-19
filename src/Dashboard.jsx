import React from 'react';
import MessageList from "./MessageList.jsx";
import Conversation from "./Conversation.jsx";
import TopNav from './TopNav.jsx';

export default class Dashboard extends React.Component {
	constructor(){
		super();
		this.state = {
			view : "messageList",
			conversation : null,
			messagesDb : JSON.parse(window.localStorage.getItem("messages"))
		};
	}
	setConversation(userId){
		if(userId === null){
			// User is unsetting the conversation and returning to home screen
			this.setState({
				view : "messageList",
				conversation : null
			});

		} else {
			// 
			let messagesDb = this.state.messagesDb
			if(messagesDb[userId].userId === undefined){
				messagesDb[userId] = {
					userId : userId,
					username: "",
					messages: []
				}
			}

			this.setState({
				view: "conversation",
				conversation: userId
			});
		}
	}
	render(){
		let view;
		switch(this.state.view){
			case "conversation":
			view = <Conversation conversation={this.state.conversation}/>;
			break;
			default:
			view = <MessageList messagesDb={this.state.messagesDb}/>;
		}
		return(
			<div className="container animated fadeIn">
			<TopNav view={this.state.view} setConversation={this.setConversation.bind(this)}/>
			<div id="dashboard-main">
			{view}
			</div>
			</div>
			)
	}
}