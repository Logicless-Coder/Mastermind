import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { BACKEND_URL } from "../../constants/route-urls";

import Navbar from "./../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Leaderboard.css";

const Leaderboard = () => {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		getLeaderboard();
	}, []);

	const getLeaderboard = () => {
		axios.get(BACKEND_URL + "/game/leaderboard").then((response) => {
			setLeaderboard(response.data.leaderboard);
		});
	};

	const auth = useSelector((state) => state.auth);

	return (
		<div className='leaderboard-page'>
			<Navbar />
			<div className='leaderboard-title'>Top Players</div>
			<table className='table'>
				<thead>
					<tr className='table-header'>
						<th className='serial-num'>Sr. No.</th>
						<th className='username-heading'>Username</th>
						<th className='score-heading'>Total Score</th>
						<th className='games-played'>Games Played</th>
						<th className='average-score'>Average Score</th>
					</tr>
				</thead>
				<tbody>
					{leaderboard &&
						leaderboard.map((player, index) => {
							return (
								<tr
									className={`table-row ${
										player.username === auth.user.username ? "active-row" : ""
									}`}>
									<td className='serial-num'>{player.rank}</td>
									<td className='username-heading'>{player.username}</td>
									<td className='score-heading'>{player.score}</td>
									<td className='games-played'>{player.gamesPlayed}</td>
									<td className='average-score'>
										{player.gamesPlayed
											? (player.score / player.gamesPlayed).toFixed(2)
											: player.score}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			<Footer />
		</div>
	);
};

export default Leaderboard;
