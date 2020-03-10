var express = require("express");
var router = express.Router();

const Event = require("../model/event");

/**
 * GET ALL EVENTLOGS
 */
router.get("/", (req, res, next) => {
  Event.find((err, events) => {
    if (err) return next(err);
    res.json(events);
  });
});

module.exports = router;
