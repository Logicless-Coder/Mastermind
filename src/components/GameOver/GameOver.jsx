import React from "react";

import "./GameOver.css";

const GameOver = ({ pointsEarned }) => {
	const outcome = pointsEarned > 0 ? "victory" : "defeat";
	const message = pointsEarned > 0 ? "Ayyy! You won!" : "Ooof, Get good Noob";
	const points = pointsEarned > 0 ? `+${pointsEarned}` : `${pointsEarned}`;

	return (
		<div className='gameover-page'>
			<div className='gameover-box'>
				<div className='message'>{message}</div>
				<div className={`points ${outcome}`}>{points}</div>
				<div className='links'>
					<a href='/' className='button'>
						Main Menu
					</a>
					<a href='/leaderboard' className='button'>
						Leaderboard
					</a>
					<a href='/profile' className='button'>
						Profile
					</a>
					<a href='/play' className='button big-button'>
						Play Again
					</a>
				</div>
			</div>
		</div>
	);
};

export default GameOver;
