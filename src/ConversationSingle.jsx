import React from 'react';
import moment from 'moment';

export default class ConversationSingle extends React.Component {
	// constructor(props){
	// 	super(props);
	// }
	setConvo(){
		this.props.setConvo(this.props.userId)
	}
	render(){
		return(
			<div className="conversation-item" onClick={this.setConvo.bind(this)}> 
					<p className="conversation-item-username">{this.props.username}</p>
					<span className="conversation-item-last-message">{this.props.message.message}</span>
					<br/>
					<span className="conversation-item-time">{moment(this.props.message.timestamp).format("h:mm a")}</span>
				</div>
				)
	}
}