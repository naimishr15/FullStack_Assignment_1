const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Chart History in database
 */
module.exports = mongoose.model(
  "HISTORY",
  new Schema({
    id: Number,
    room: { type: String, required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
  })
);
