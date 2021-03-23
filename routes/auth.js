const express = require("express");
const jwt = require("jsonwebtoken");

const registerPlayer = require("./../controllers/register");
const loginPlayer = require("./../controllers/login");
const getPlayer = require("./../controllers/get");
const getRank = require("./../controllers/rank");
const updateScore = require('./../controllers/updateScore');

const router = express.Router();

router.get("/", getPlayer);

router.patch('/score', updateScore);

router.post("/rank", getRank);

router.post("/register", registerPlayer);

router.post("/login", loginPlayer);

module.exports = router;
