const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Player = require("./../models/Player");

const loginPlayer = async (req, res) => {
	const playerData = {
		email: req.body.email,
		password: req.body.password,
	};

	// Check if a user with that email exists
	await Player.findOne({ email: playerData.email }, (err, player) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		if (!player) {
			return res.status(400).json({
				message: `Player with email ${playerData.email} doesn't exist.`,
			});
		} else {
			bcrypt.compare(playerData.password, player.password, (err, valid) => {
				if (err) {
					return res.status(500).json({ error: err });
				}
				if (valid) {
					const jwtSecret = process.env.JWT_SECRET;
					const token = jwt.sign({ playerId: player.id }, jwtSecret, {
						expiresIn: "7d",
					});
					return res.status(201).json({
						message: `Welcome ${player.username}.`,
						token,
						player: {
							username: player.username,
							email: player.email,
							score: player.score,
							gamesPlayed: player.gamesPlayed,
							firstTime: player.firstTime,
						},
					});
				} else {
					return res.status(400).json({ message: `Incorrect Password.` });
				}
			});
		}
	});
};

module.exports = loginPlayer;
