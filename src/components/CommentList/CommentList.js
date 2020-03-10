import React from "react";
import faker from "faker";
import "./CommentList.css";
import { Comment } from "../Comment/Comment";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

export class CommentList extends React.Component {
  timeAgo = new TimeAgo();

  render() {
    let comments = this.props.comments;
    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    comments = this.props.comments.map(comment => {
      return (
        <Comment
          key={comment._id}
          author={comment.username}
          timeAgo={this.timeAgo.format(new Date(comment.timestamp))}
          content={comment.message}
          avatar={faker.image.avatar()}
        />
      );
    });
    return <div className="ui segment comments comment-list">{comments}</div>;
  }
}
