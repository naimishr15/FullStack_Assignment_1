import React from "react";
import io from "socket.io-client";
import "./App.css";
import { Controls } from "../Controls/Controls";
import { CommentList } from "../CommentList/CommentList";
import { CommentInput } from "../CommentInput/CommentInput";
import { Events } from "../../shared/events";
import axios from "axios";

export class App extends React.Component {
  url = "";
  socket;
  state = {
    isConnected: false,
    roomName: "",
    username: null,
    isSomeRoomJoined: false,
    commentList: []
  };

  /**
   * Connect to socket
   */
  connectSocket = () => {
    this.socket = io.connect(this.url);
    this.listenToRoomJoined();
    this.listenToRoomLeave();
    this.listenToDisconnect();
    this.listenToConnect();
  };

  /**
   * Disconnect socket
   */
  disconnectSocket = () => {
    this.socket.disconnect();
  };

  /**
   * On connection button toggle
   *
   * @memberof Controls
   */
  onConnectionToggle = () => {
    this.setState({ isConnected: !this.state.isConnected });

    if (this.state.isConnected) {
      this.disconnectSocket();
    } else {
      this.connectSocket();
    }
  };

  /**
   *Get messages of a given room
   *
   * @memberof App
   */
  getMessageOfRoom = async roomName => {
    const comments = await axios.post(`${this.url}/api/roomhistory`, {
      roomname: roomName
    });
    this.setState({ commentList: comments.data });
  };

  /**
   * Listen when user join some room
   *
   * @memberof Controls
   */
  listenToRoomJoined = () => {
    this.socket.on(Events.JOINED, data => {
      console.log("ROOM JOINED -> :", data);
      this.setState({
        roomName: data.roomName,
        isSomeRoomJoined: true
      });
      this.listenToMessages();
      this.getMessageOfRoom(data.roomName);
    });
  };

  /**
   * Listen when join leave some room
   *
   * @memberof Controls
   */
  listenToConnect = () => {
    this.socket.on(Events.CONNECTED, data => {
      console.log("CONNECTED :", data);
      this.setState({ username: data.username });
    });
  };

  /**
   * Listen when join leave some room
   *
   * @memberof Controls
   */
  listenToDisconnect = () => {
    this.socket.on(Events.ONDISCONNECT, data => {
      console.log("DISCONNECTED :", data);
      this.setState({ username: null });
    });
  };
  /**
   * Listen when join leave some room
   *
   * @memberof Controls
   */
  listenToRoomLeave = () => {
    this.socket.on(Events.LEFT, data => {
      console.log("ROOM LEAVE :", data);
      if (data.username === this.state.username) {
        this.setState({
          isSomeRoomJoined: false,
          roomName: "",
          commentList: []
        });
        this.socket.off(Events.MESSAGE);
      }
    });
  };

  listenToMessages = () => {
    this.socket.on(Events.MESSAGE, data => {
      console.log("MESSAGE :", data);
      this.getMessageOfRoom(this.state.roomName);
    });
  };

  /**
   * Render current component UI
   */
  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="two column row">
            <div className="column">
              <CommentList comments={this.state.commentList} />
            </div>
            <div className="column">
              <Controls
                isConnected={this.state.isConnected}
                onConnectionToggle={this.onConnectionToggle}
                onRoomJoin={this.onRoomJoin}
                socket={this.socket}
              />
              <CommentInput
                isConnected={this.state.isConnected}
                roomName={this.state.roomName}
                isSomeRoomJoined={this.state.isSomeRoomJoined}
                socket={this.socket}
                username={this.state.username}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
