var express = require("express");
var router = express.Router();

const ROOMLIST = {
  rooms: [
    {
      roomName: "Room A"
    },
    {
      roomName: "Room B"
    }
  ]
};

/**
 * GET ALL ROOMS
 */
router.get("/", (req, res, next) => {
  res.json(ROOMLIST);
});

module.exports = router;
