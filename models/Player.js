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
});

module.exports = mongoose.model("Player", playerSchema);
