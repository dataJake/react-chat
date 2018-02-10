import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/MessageList';

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
            user: null
        };
        this.setActiveRoom = this.setActiveRoom.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    setActiveRoom(room) {
        this.setState({ activeRoom: room })
    }

    setUser(user) {
        this.setState({ user: user });
    }

  render() {
      const displayMessages = this.state.activeRoom;
      return (
        <div>
        <h1>{this.state.activeRoom.title || "Select A Room"}</h1>
        <User firebase={firebase} setUser={this.setUser} />
        <RoomList firebase={firebase} activeRoom={this.activeRoom} setActiveRoom={this.setActiveRoom}/>
        { displayMessages ?
        (<MessageList firebase={ firebase } activeRoom={this.state.activeRoom} />)
        : (null)
        }
        </div>
      );
  }
}

export default App;
