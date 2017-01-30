import React from 'react';
import Ably from 'ably/browser/static/ably-commonjs.js';

export default class Conversation extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			messages : this.props.conversation.messages
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			messages : nextProps.conversation.messages
		});
	}
	shouldComponentUpdate(nextProps) {
    	return true;
	}
	sendMessage(e){
		if(this.refs.messageText.value.trim() !== ""){
			e.preventDefault();
			this.props.sendMessage(this.refs);
		}
	}

	render(){
		let userId = this.props.conversation.userId, username = this.props.conversation.username, messages = this.state.messages;
		let thisUser = JSON.parse(window.localStorage.getItem("userInfo"));
		let count = 0;
		return (<div className="animated slideIn">
					<div id="conversation-username">{username !== "" ? username : userId}</div>
					<div id="messageList">
					{messages.map((msgObj)=>{
						++count;
						return(<div className='message-block' key={msgObj.timestamp + "-" + count}>
								<div className={"message " + (thisUser.userId === msgObj.userId ? "user-message" : "other-message")}> 
								{ msgObj.message }
								<br/>
								</div>
								</div>)
					})}
					</div>
					<form id="conversation-box" onSubmit={this.sendMessage.bind(this)}>
						<input id="messageInput" placeholder="Enter message here" ref="messageText" autoComplete="off"/>
					</form>
				</div>
			)
	}
}
