import React from 'react';
import ConversationSingle from "./ConversationSingle.jsx";
export default class MessageList extends React.Component {
	render(){
		console.log(this.props.messagesDb);
		return(
			<div>
			{
				Object.keys(this.props.messagesDb).length === 1 ? 
				
						<div id="no-conversations-dialog">
							<i className="mdi mdi-human-greeting"> </i>
							<p>Looks like you don't have any messages yet</p>
						</div>
						
				:
					Object.keys(this.props.messagesDb).map((obj)=>{
						return this.props.messagesDb[obj].messages.length > 0 ? <ConversationSingle userId={obj} username={this.props.messagesDb[obj].username} key={obj} /> : ""
					})
				
			}
			</div>
			)
	}
}