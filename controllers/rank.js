const Player = require("./../models/Player");

const getRank = async (req, res) => {
	try {
		const player = await Player.findOne({ username: req.body.username });
		const score = player.score;
		const rank = (await Player.count({ score: { $gt: score } })) + 1;
		return res.json({ rank: rank });
	} catch (err) {
		return res.status(400).json({ error: "Something went wrong." });
	}
};

module.exports = getRank;
