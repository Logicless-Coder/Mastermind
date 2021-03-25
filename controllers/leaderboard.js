const Player = require("./../models/Player");
const getRank = require("./rank");

const getLeaderboard = async (req, res) => {
	try {
		const limit = req.params.limit || 50;
		const results = await Player.find()
			.sort({ score: -1, gamesPlayed: 1 })
			.limit(limit);

		let rank = 0;
		let leaderboard = results.map((result, index) => {
			if (!index || (index && result.score < results[index - 1].score)) rank++;

			return {
				username: result.username,
				score: result.score,
				gamesPlayed: result.gamesPlayed,
				rank: rank,
			};
		});

		return res.json({ leaderboard });
	} catch (err) {
		return res.status(400).json({ error: "Something went wrong." });
	}
};

module.exports = getLeaderboard;
