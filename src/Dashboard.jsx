import React from 'react';
import MessageList from "./MessageList.jsx";
import Conversation from "./Conversation.jsx";
import TopNav from './TopNav.jsx';
// import swal from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';

let dotenv = require('dotenv');
dotenv.load();
// console.log(process.env.ABLY_API_KEY);

import Ably from 'ably/browser/static/ably-commonjs.js';
let realtime = new Ably.Realtime('aADW4A.yTMvtw:bVoey4GlqzTW__09');


export default class Dashboard extends React.Component {
	constructor(){
		super();
		this.state = {
			view : "messageList",
			conversation : null,
			messagesDb : JSON.parse(window.localStorage.getItem("messages")),
			user: JSON.parse(window.localStorage.getItem("userInfo"))
		};
	}
	componentDidMount(){
		//subscribe
		let channel = realtime.channels.get(this.state.user.userId);

		channel.subscribe((msg, err) => {
			if(err){console.log("Error processing message", err); } else {

				// Message was received successfully
				if(!this.state.messagesDb.hasOwnProperty(msg.data.userId)){
					console.log("user not found", 'creating new conversation');

					// Store lS messages in a variable, add the new conversation property, save lS and then set state for user
					let messagesDb = JSON.parse(window.localStorage.getItem("messages"));

					messagesDb[msg.data.userId] = {
						userId: msg.data.userId,
						username: msg.data.username,
						messages : []
					};


					window.localStorage.setItem("messages", JSON.stringify(messagesDb));					
					this.setState({
						messagesDb : JSON.parse(window.localStorage.getItem("messages"))
					});
					console.log("new conversation created");
				}

				// Store incoming message; get lS, add the message, save to lS and remind state
				let messagesDb = JSON.parse(window.localStorage.getItem("messages"));
				messagesDb[msg.data.userId].username = msg.data.username;

				messagesDb[msg.data.userId].messages.push({
					"userId" : msg.data.userId,
					"username" : msg.data.username, 
					"message" : msg.data.message, 
					"timestamp" : msg.data.timestamp
				});

				window.localStorage.setItem("messages", JSON.stringify(messagesDb));					

				this.setState({
					messagesDb : JSON.parse(window.localStorage.getItem("messages"))
				});		
				console.log("it worked");				
			}
		});
		window.localStorage.setItem("messages", JSON.stringify(this.state.messagesDb));	
		this.updateScroll.bind(this);	
	}
	updateScroll(){
    	let documentHeight = document.documentElement.offsetHeight;
		let viewportHeight = window.innerHeight;
		window.scrollTo(0, documentHeight - viewportHeight);
	}
	setConversation(userId){
		if(userId === null){
			// User is unsetting the conversation and returning to home screen
			this.setState({
				view : "messageList",
				conversation : null,
				messagesDb : JSON.parse(window.localStorage.getItem("messages"))
			});

		} else {
			// User is selecting a new or existing conversation to view

			if(!this.state.messagesDb.hasOwnProperty(userId)){
				console.log("user not found", 'creating new conversation');

					// Store lS messages in a variable, add the new conversation property, save lS and then set state for user
					let messagesDb = JSON.parse(window.localStorage.getItem("messages"));

					messagesDb[userId] = {
						userId: userId,
						username: '',
						messages : []
					};


					window.localStorage.setItem("messages", JSON.stringify(messagesDb));					
					// this.setState({
					// 	messagesDb : JSON.parse(window.localStorage.getItem("messages"))
					// });
					console.log("new conversation created");
			}
			this.setState({
				view: "conversation",
				conversation: userId,
				messagesDb : JSON.parse(window.localStorage.getItem("messages")),
			});
		}	
	}

	render(){
		let view;
		switch(this.state.view){
			case "conversation":
			view = <Conversation userId={this.state.conversation} conversation={this.state.messagesDb[this.state.conversation]}/>;
			break;
			default:
			view = <MessageList messagesDb={this.state.messagesDb} setConvo={this.setConversation.bind(this)}/>;
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