const express = require("express");

const getRank = require("./../controllers/rank");
const updateScore = require("./../controllers/updateScore");

const router = express.Router();

router.patch("/score", updateScore);

router.post("/rank", getRank);

module.exports = router;
