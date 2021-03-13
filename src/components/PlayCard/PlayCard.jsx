import React from "react";
import { FaCogs, FaPlay } from "react-icons/fa";

import "./PlayCard.css";

const PlayCard = () => {
	return (
		<div className='play-card'>
			<img
				className='card-bg'
				src='https://unsplash.it/400'
				alt='play card background showing gameplay'
			/>
			<div className='content'>
				<div className='settings'>
					<FaCogs />
				</div>
				<div className='play'>
					<FaPlay />
				</div>
			</div>
		</div>
	);
};

export default PlayCard;
