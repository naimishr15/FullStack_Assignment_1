import React from "react";
import "./Comment.css";

export class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <a href="/" className="avatar">
          <img
            alt="avatar"
            src={
              this.props.author === "App Bot" ? "./bot.png" : this.props.avatar
            }
          />
        </a>
        <div className="content">
          <a
            href="/"
            className={`author ${this.props.author === "App Bot" ? "red" : ""}`}
          >
            {this.props.author}
          </a>
          <div className="metadata">
            <span className="date">{this.props.timeAgo}</span>
          </div>
          <div className="text">{this.props.content}</div>
        </div>
      </div>
    );
  }
}
