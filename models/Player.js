const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		default: 0,
	},
	gamesPlayed: {
		type: Number,
		default: 0,
	},
	firstTime: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Player", playerSchema);
