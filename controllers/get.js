const jwt = require("jsonwebtoken");
const Player = require("./../models/Player");

const getPlayer = (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const jwtSecret = process.env.JWT_SECRET;
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			Player.findOne({ _id: decoded.playerId }, (err, player) => {
				if (err) {
					return res.status(500).json({ error: err });
				}
				if (player) {
					return res.json({
						username: player.username,
						email: player.email,
						score: player.score,
					});
				} else {
					return res.status(500).json({ error: "No such player." });
				}
			});
		});
	} catch (err) {
		return res.status(400).json({ error: "Wrong request." });
	}
};

module.exports = getPlayer;
