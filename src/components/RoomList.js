import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        this.createRoom =this.createRoom.bind(this);
    }

    createRoom(e) {
        e.preventDefault();
        this.roomsRef.push({ title: this.state.title });
        this.setState({ title: '' });
    }

    handleChange(e) {
        this.setState({ title: e.target.value })
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        })
    }

    render(){
        const roomForm = (
            <form onSubmit={ this.createRoom }>
                <input type='text' value={ this.state.title } placeholder='RoomName' onChange={ this.handleChange }/>
                <input type='submit' value='Create'/>
            </form>
        )

        const roomList = this.state.rooms.map((room) =>
            <li key={ room.key }>{ room.title }</li>
        )


        return(
            <div>
                <ul>{ roomList }</ul>
                <div>{ roomForm }</div>
            </div>
        );
    }
};

export default RoomList;
