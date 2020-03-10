import React from "react";
import "./CommentInput.css";
import { Events } from "../../shared/events";

export class CommentInput extends React.Component {
  state = {
    comment: ""
  };
  messageRoom = () => {
    this.props.socket.emit(Events.MESSAGE, {
      roomName: this.props.roomName,
      message: this.state.comment,
      timestamp: new Date()
    });
  };

  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label>
            Username:{" "}
            <span className="red">
              {this.props.username ? "(" + this.props.username + ")" : null}
            </span>
          </label>
          <textarea
            disabled={!this.props.isConnected || !this.props.isSomeRoomJoined}
            value={this.state.comment}
            onChange={event => this.setState({ comment: event.target.value })}
          ></textarea>
        </div>
        <div className="field right-align">
          <button
            className="ui teal button"
            onClick={this.messageRoom}
            disabled={!this.props.isConnected || !this.props.isSomeRoomJoined}
          >
            Comment
          </button>
        </div>
      </div>
    );
  }
}
