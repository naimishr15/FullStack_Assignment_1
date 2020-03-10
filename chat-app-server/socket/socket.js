const socket = require("socket.io");
const events = require("./events");
var UsernameGenerator = require("username-generator");
const History = require("../model/history");
const Event = require("../model/event");

// Write event log to database
function writeEvent(input) {
  Event.create(input, (err, result) => {
    if (err) return console.log(err);
  });
}

// Intitate the Socket Object
function Socket(server) {
  const io = socket(server);

  // A new connection is established between user and server
  io.on(events.ONCONNECTION, client => {
    const username = UsernameGenerator.generateUsername("-");

    // Emit to client that following username has been given
    client.emit(events.CONNECTED, { username: username });

    // Write event to database
    writeEvent({
      type: events.ONCONNECTION,
      pid: client.id,
      username: username
    });

    // A connection is closed
    client.on(events.ONDISCONNECT, reason => {
      writeEvent({
        type: events.ONDISCONNECT,
        pid: client.id,
        username: username
      });
    });

    // User wants to join a room
    client.on(events.JOINROOM, data => {
      console.log("JOINING ROOM " + data.roomName);
      client.join(data.roomName);

      // Echo that a new user has come
      const input = {
        room: data.roomName,
        username: "App Bot",
        message: "A new user has joined: " + username,
        timestamp: new Date()
      };
      History.create(input, (err, result) => {
        io.in(data.roomName).emit(events.JOINED, {
          isJoined: true,
          username: username,
          ...data
        });
      });

      // Write joining event to eventlog
      writeEvent({
        type: events.JOINROOM,
        pid: client.id,
        username: username
      });
    });

    // Listen for message
    client.on(events.MESSAGE, data => {
      console.log("SENDING MESSAGE");
      const input = {
        room: data.roomName,
        username: username,
        message: data.message,
        timestamp: data.timestamp
      };
      History.create(input, (err, result) => {
        data.username = username;
        data._id = result._id;
        io.in(data.roomName).emit(events.MESSAGE, data);
      });
    });

    // User wants to leave a room
    client.on(events.LEAVEROOM, data => {
      console.log("LEAVING ROOM " + data.roomName);
      io.in(data.roomName).emit(events.LEFT, { isJoined: false, ...data });
      client.leave(data.roomName);

      // Echo that a user has left
      const input = {
        room: data.roomName,
        username: "App Bot",
        message: "A user has left: " + username,
        timestamp: new Date()
      };
      History.create(input, (err, result) => {
        io.in(data.roomName).emit(events.MESSAGE, {
          _id: result._id,
          username: "App Bot",
          timestamp: Date.now,
          message: "A user has left: " + username
        });
      });

      // Write leaving event to eventlog
      writeEvent({
        type: events.LEAVEROOM,
        pid: client.id,
        username: username
      });
    });
  });
}

module.exports = Socket;
