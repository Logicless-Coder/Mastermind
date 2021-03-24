import React, { useState, useEffect } from "react";

import { DEFAULT_COLOR } from "./../../constants/colors";

import ColorCircle from "../ColorCircle/ColorCircle";

import "./CodeBlock.css";

const CodeBlock = ({ codeGuess, correctColor, correctPlaceAndColor }) => {
	return (
		<div className='code-block'>
			<div className='guess-hint'>
				{`${correctPlaceAndColor} | ${correctColor}`}
			</div>
			<div className='guess-code'>
				{codeGuess &&
					codeGuess.map((color, index) => {
						return <ColorCircle color={color} id={"target-color-" + index} />;
					})}
			</div>
		</div>
	);
};

export default CodeBlock;
