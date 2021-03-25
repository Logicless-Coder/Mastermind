const jwt = require("jsonwebtoken");
const Player = require("./../models/Player");

const updateScore = async (req, res) => {
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
					const currentScore = player.score;
					const newScore = currentScore + req.body.points;
					player.score = newScore;
					const newGamesPlayed = player.gamesPlayed + 1;

					Player.updateOne(
						{ _id: decoded.playerId },
						{ score: newScore, gamesPlayed: newGamesPlayed },
						(error, player) => {
							if (error) {
								return res.status(500).json({ error: error });
							}
							if (player) {
								return res.status(204).json({ score: newScore });
							}
						}
					);
				} else {
					return res.status(500).json({ error: "No such player." });
				}
			});
		});
	} catch (err) {
		return res.status(400).json({ error: "Wrong request." });
	}
};

module.exports = updateScore;
