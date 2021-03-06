import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props){
        super(props);

        this.state = {
            messageText: '',
            messages: [],
            displayedMessages: []
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.updateDisplayedMessages = this.updateDisplayedMessages.bind(this);
    }


    createMessage(e) {
      e.preventDefault();
      this.messagesRef.push({
        username: this.props.user && this.props.user.displayName,
        content: this.state.messageText,
        sentAt: 'Now',
        roomId: this.props.activeRoom.key
      });
      this.setState({ messageText: '' });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ messageText: e.target.value })
    }

    updateDisplayedMessages(activeRoom) {
        const displayed = this.state.messages.filter(message =>
            message.roomId === activeRoom.key);
        this.setState({ displayedMessages: displayed});
    }

    componentWillReceiveProps(nextProps){

        this.updateDisplayedMessages(nextProps.activeRoom);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) },
                () => this.updateDisplayedMessages(this.props.activeRoom));
        });
    }

    render() {

        const messageForm = (
            <form onSubmit={ this.createMessage }>
                <input type='text' value={ this.state.messageText } placeholder='Enter Message' onChange={ this.handleChange }/>
                <input type='submit' value='Send'/>
            </form>
        );

        const messageList = (
            this.state.displayedMessages.map((message) => {
                return <li key={message.key}>{message.username}: {message.content}</li>
            })
        );



        return(
            <div>
                <div>{ messageForm }</div>
                <ul>{ messageList }</ul>
            </div>
        );
    }
};

export default MessageList;
