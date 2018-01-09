import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div><RoomList firebase={ firebase } /></div>
    );
  }
}

export default App;
