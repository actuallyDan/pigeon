import React from 'react';
import ConversationSingle from "./ConversationSingle.jsx";
export default class MessageList extends React.Component {
	setConvo(userId){
		this.props.setConvo(userId);
	}
	render(){
		console.log(this.props.messagesDb);
		return(
			<div id="messagesList">
			{
				Object.keys(this.props.messagesDb).length === 1 && this.props.messagesDb[Object.keys(this.props.messagesDb)[0]].messages.length === 0  ? 
				
						<div id="no-conversations-dialog">
							<i className="mdi mdi-human-greeting"> </i>
							<p>Looks like you don't have any messages yet</p>
						</div>
				:
					Object.keys(this.props.messagesDb).map((obj)=>{
						return this.props.messagesDb[obj].messages.length > 0 
						? <ConversationSingle 
						userId={obj} 
						username={this.props.messagesDb[obj].username} 
						key={obj} 
						isNew={this.props.messagesDb[obj].lastChecked > this.props.messagesDb[obj].messages[this.props.messagesDb[obj].messages.length - 1].timestamp ? "" : "new-msg"}
						message={this.props.messagesDb[obj].messages[this.props.messagesDb[obj].messages.length - 1]} 
						setConvo={this.setConvo.bind(this)}/> 
						: ""
					})
				
			}
			</div>
			)
	}
}