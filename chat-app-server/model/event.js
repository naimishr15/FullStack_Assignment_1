const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Event log in database
 */
module.exports = mongoose.model(
  "EVENT",
  new Schema({
    id: Number,
    type: { type: String, required: true },
    pid: { type: String, required: true },
    username: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
  })
);
