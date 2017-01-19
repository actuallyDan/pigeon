import React from 'react';

export default class ConversationSingle extends React.Component {
	// constructor(props){
	// 	super(props);
	// }
	render(){
		return(<div className="conversation-item">
					<p className="conversation-item-username">{this.props.username}</p>
					<p className="conversation-item-last-message"></p>
				</div>)
	}
}