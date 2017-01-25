import React from 'react';
import Ably from 'ably/browser/static/ably-commonjs.js';
let realtime = new Ably.Realtime('aADW4A.yTMvtw:bVoey4GlqzTW__09');

export default class Conversation extends React.Component {
	sendMessage(e){
		if(this.refs.messageText.value.trim() !== ""){
			e.preventDefault();
			let messageInput = this.refs.messageText.value.trim();
			let timestamp = new Date().getTime();
			let channel = realtime.channels.get(this.props.userId);
			let thisUser = JSON.parse(window.localStorage.getItem("userInfo"));

			let messagesDb = JSON.parse(window.localStorage.getItem("messages"));
				messagesDb[this.props.userId].messages.push({
				"userId" : thisUser.userId,
				"username" : thisUser.username, 
				"message" : messageInput, 
				"timestamp" : timestamp
			});
					
			window.localStorage.setItem("messages", JSON.stringify(messagesDb));
			this.props.updateState.bind(this);

			channel.publish("update", {"userId" : thisUser.userId, "username": thisUser.username, "message" : messageInput, "timestamp" : timestamp});
			document.getElementById("messageInput").value = "";
		}
	}
	render(){
		//let userId = this.props.userId, username = this.props.conversation.username, messages = this.props.conversation.messages;
		let thisUser = JSON.parse(window.localStorage.getItem("userInfo"));
		let count = 0;
		return (<div className="animated slideIn">
					<div id="conversation-username">Name here</div>
					<div id="messageList">
					{this.props.conversation.messages.map((msgObj)=>{
						++count;
						return(<div className='message-block' key={msgObj.timestamp + "-" + count}>
								<div className={"message " +( thisUser.userId === msgObj.userId ? "user-message" : "other-message")}> 
								{ msgObj.message }
								<br/>
								</div>
								</div>)
					})}
					</div>
					<form id="conversation-box" onSubmit={this.sendMessage.bind(this)} onSubmit={this.sendMessage.bind(this)}>
						<input id="messageInput" placeholder="Enter message here" ref="messageText" />
					</form>
				</div>
			)
	}
}
