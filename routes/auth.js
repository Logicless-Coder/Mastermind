const express = require("express");
const jwt = require("jsonwebtoken");

const registerPlayer = require("./../controllers/register");
const loginPlayer = require("./../controllers/login");
const getPlayer = require("./../controllers/get");
const getRank = require("./../controllers/rank");

const router = express.Router();

router.get("/", getPlayer);

router.post("/rank", getRank);

router.post("/register", registerPlayer);

router.post("/login", loginPlayer);

module.exports = router;
