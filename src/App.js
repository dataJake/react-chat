import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
    apiKey: "AIzaSyBGnvdUnypWaV0j5kcyeXjMtIg0NvJOZTg",
    authDomain: "bloc-chat-e2551.firebaseapp.com",
    databaseURL: "https://bloc-chat-e2551.firebaseio.com",
    projectId: "bloc-chat-e2551",
    storageBucket: "bloc-chat-e2551.appspot.com",
    messagingSenderId: "275120519905"
  };
  firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRoom: '',
        }
        this.activeRoom = this.activeRoom.bind(this);
    }

    activeRoom(room) {
        this.setState({ activeRoom: room })
    }

  render() {
      const displayMessages = this.state.activeRoom;
      return (
        <div>
        <RoomList firebase={ firebase } activeRoom={ this.activeRoom }/>
        { displayMessages ?
        (<MessageList firebase={ firebase } activeRoom={this.state.activeRoom.key} />)
        : (null)
        }
        </div>
      );
  }
}

export default App;
