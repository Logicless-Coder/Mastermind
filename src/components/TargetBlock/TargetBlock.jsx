import React from "react";

import { DEFAULT_COLOR } from "./../../constants/colors";

import ColorCircle from "./../ColorCircle/ColorCircle";

import "./TargetBlock.css";

const TargetBlock = ({ targetCode, guessesLeft }) => {
	return (
		<div className='block'>
			<div className='guesses-left'>{guessesLeft}</div>
			<div className='target-code'>
				{targetCode &&
					targetCode.map((color, index) => {
						color = "?";
						return <ColorCircle color={color} id={"target-color-" + index} />;
					})}
			</div>
		</div>
	);
};

export default TargetBlock;
