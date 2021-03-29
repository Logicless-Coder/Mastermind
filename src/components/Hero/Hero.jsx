import React from "react";
import { Link } from "react-router-dom";

import RotatingBalls from "../RotatingBalls/RotatingBalls";

import "./Hero.css";

const Hero = () => {
	return (
		<div className='hero'>
			<div className='left'>
				<div className='hero__title'>The Game of Minds</div>
				<div className='hero__subtitle'>
					A <span>colour</span> based code breaking game.
				</div>
				<div className='hero__play'>
					<Link to='/play' className='play-link'>
						Play Now
					</Link>
				</div>
			</div>
			<div className='right'>
				<RotatingBalls />
			</div>
		</div>
	);
};

export default Hero;
