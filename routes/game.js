const express = require("express");

const getRank = require("./../controllers/rank");
const updateScore = require("./../controllers/updateScore");
const getLeaderboard = require("./../controllers/leaderboard");

const router = express.Router();

router.patch("/score", updateScore);

router.post("/rank", getRank);

router.get("/leaderboard", getLeaderboard);

module.exports = router;
