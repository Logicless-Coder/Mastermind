import React from "react";

import "./Hero.css";

const Hero = () => {
	return (
		<div className='hero'>
			<div className='hero__title'>The Game of Minds</div>
			<div className='hero__subtitle'>
				A <span>colour</span> based code breaking game.
			</div>
			<div className='hero__play'>Play Now</div>
		</div>
	);
};

export default Hero;
