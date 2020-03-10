import React from "react";
import "./Controls.css";
import { Events } from "../../shared/events";
import axios from "axios";

export class Controls extends React.Component {
  url = "";
  state = {
    roomList: [],
    selectedRoom: "",
    isSomeRoomJoined: false,
    isListeningToRoomJoinAndLeave: false,
    username: null
  };

  /**
   * On Component Creation
   *
   * @memberof Controls
   */
  componentDidMount() {
    this.getAllRooms();
  }

  componentDidUpdate() {
    if (this.props.socket && !this.state.isListeningToRoomJoinAndLeave) {
      this.setState({ isListeningToRoomJoinAndLeave: true });
      this.listenToRoomJoined();
      this.listenToRoomLeave();
      this.listenToConnect();
    }
  }

  /**
   * Listen when user join some room
   *
   * @memberof Controls
   */
  listenToRoomJoined = () => {
    this.props.socket.on(Events.JOINED, data => {
      console.log("JOINED ROOM -> :", data);
      this.setState({ isSomeRoomJoined: true });
    });
  };

  /**
   * Listen when join leave some room
   *
   * @memberof Controls
   */
  listenToRoomLeave = () => {
    this.props.socket.on(Events.LEFT, data => {
      console.log("ROOM LEAVE -> :", data);
      if (data.username === this.state.username) {
        this.setState({ isSomeRoomJoined: false });
      }
    });
  };

  /**
   * Listen when join leave some room
   *
   * @memberof Controls
   */
  listenToConnect = () => {
    this.props.socket.on(Events.CONNECTED, data => {
      console.log("CONNECTED ->:", data);
      this.setState({ username: data.username });
    });
  };

  /**
   * Get list of all rooms
   *
   * @memberof Controls
   */
  getAllRooms = async () => {
    const rooms = await axios.get(`${this.url}/api/rooms`);
    this.setState({ roomList: rooms.data.rooms });
  };

  /**
   * Join or leave a room
   *
   * @memberof Controls
   */
  joinOrLeaveRoom = async () => {
    if (this.state.isSomeRoomJoined) {
      this.props.socket.emit(Events.LEAVEROOM, {
        roomName: this.state.selectedRoom,
        username: this.state.username
      });
    } else {
      this.props.socket.emit(Events.JOINROOM, {
        roomName: this.state.selectedRoom,
        username: this.state.username
      });
    }
  };

  render() {
    const rooms = this.state.roomList.map(room => {
      return (
        <option value={room.roomName} key={room.roomName}>
          {room.roomName}
        </option>
      );
    });

    return (
      <div className="ui form">
        <div className="ui row mb-2">
          <div className="ui toggle checkbox">
            <input
              type="checkbox"
              checked={this.props.isConnected}
              onChange={this.props.onConnectionToggle}
              disabled={this.state.isSomeRoomJoined}
            />
            <label>{this.props.isConnected ? "Disconnect" : "Connect"}</label>
          </div>
        </div>
        <div className="ui row two fields">
          <div className="field">
            <select
              value={this.state.selectedRoom}
              disabled={!this.props.isConnected || this.state.isSomeRoomJoined}
              onChange={event =>
                this.setState({ selectedRoom: event.target.value })
              }
            >
              <option value="">Select A Room</option>
              {rooms}
            </select>
          </div>
          <div className="field">
            <button
              className="ui primary button"
              disabled={!this.props.isConnected}
              onClick={this.joinOrLeaveRoom}
            >
              {this.state.isSomeRoomJoined ? "Leave" : "Join"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
