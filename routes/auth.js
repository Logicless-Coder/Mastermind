const express = require("express");

const registerPlayer = require("./../controllers/register");
const loginPlayer = require("./../controllers/login");
const getPlayer = require("./../controllers/get");

const router = express.Router();

router.get("/", getPlayer);

router.post("/register", registerPlayer);

router.post("/login", loginPlayer);

module.exports = router;
