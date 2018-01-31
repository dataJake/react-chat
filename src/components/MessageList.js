import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props){
        super(props);

        this.state = {
            messageText: '',
            messages: []
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }


    createMessage(e) {
      e.preventDefault();
      this.messagesRef.push({
        username: 'Jake',
        content: this.state.messageText,
        sentAt: 'Now',
        roomId: 1
      });
      this.setState({ messageText: '' });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ messageText: e.target.value })
    }

    //componentWillReceiveProps(nextProps){}

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        })
    }

    render() {
        const activeRoom = this.props.activeRoom;

        const messageForm = (
            <form onSubmit={ this.createMessage }>
                <input type='text' value={ this.state.messageText } placeholder='Enter Message' onChange={ this.handleChange }/>
                <input type='submit' value='Send'/>
            </form>
        );

        const messageList = (
            this.state.messages.map((message) => {
                return <li key={ message.key }>{ message.content }</li>
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
