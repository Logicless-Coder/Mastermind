const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Player = require("./../models/Player");

const registerPlayer = async (req, res) => {
	const rawPassword = req.body.password;
	const hashedPassword = await bcrypt.hash(rawPassword, 10);
	const playerData = {
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	};

	// Check if a player with that username already exists
	await Player.findOne({ username: playerData.username }, (err, player) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		if (player) {
			return res.status(400).json({
				message: `Player with username ${player.username} already exists.`,
			});
		}
	});

	// Check if a user with that email already exists
	await Player.findOne({ email: playerData.email }, (err, player) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		if (player) {
			return res
				.status(400)
				.json({ message: `Player with email ${player.email} already exists.` });
		}
	});

	const player = await Player.create(playerData);

	const jwtSecret = process.env.JWT_SECRET;
	const token = jwt.sign({ playerId: player.id }, jwtSecret, {
		expiresIn: "7d",
	});

	res.status(201).json({
		message: "Player created successfully.",
		token,
		player: {
			username: player.username,
			email: player.email,
			score: player.score,
			gamesPlayed: player.gamesPlayed,
			firstTime: player.firstTime,
		},
	});
};

module.exports = registerPlayer;
