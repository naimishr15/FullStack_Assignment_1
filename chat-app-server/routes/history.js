var express = require("express");
var router = express.Router();

const History = require("../model/history");

/**
 * GET ALL CHAT HISTORY
 */
router.get("/history", (req, res, next) => {
  History.find((err, chats) => {
    if (err) return next(err);
    res.json(chats);
  });
});

/**
 * GET ALL CHAT HISTORY BY ROOM NAME
 */
router.post("/roomhistory", (req, res, next) => {
  History.find({ room: req.body.roomname }, (err, chats) => {
    if (err) return next(err);
    res.json(chats);
  });
});

module.exports = router;
