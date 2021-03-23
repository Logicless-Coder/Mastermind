import React, { useState, useEffect } from "react";

import { DEFAULT_COLOR } from "./../../constants/colors";

import ColorCircle from "../ColorCircle/ColorCircle";

import "./CodeBlock.css";

const CodeBlock = ({
	codeGuess,
	targetCode,
	checkVictory,
	selectedBlock,
	blockId,
	guessesLeft,
	numberOfGuesses,
}) => {
	const [hint, setHint] = useState({
		correctPlaceAndColor: 0,
		correctColor: 0,
	});

	useEffect(() => {
		if (codeGuess.filter((x) => x === DEFAULT_COLOR).length === 0) {
			let count1 = 0,
				count2 = 0;
			for (let i = 0; i < targetCode.length; i++) {
				if (targetCode[i] === codeGuess[i]) count1++;
			}
			let flags = new Array(targetCode.length);
			for (let i = 0; i < flags.length; i++) {
				flags[i] = 1;
			}
			for (let i = 0; i < codeGuess.length; i++) {
				for (let j = 0; j < flags.length; j++) {
					if (flags[j] === 1 && targetCode[j] === codeGuess[i]) {
						count2++;
						flags[j] = 0;
						break;
					}
				}
			}

			console.log(
				"guessesLeft: " + guessesLeft,
				"numberOfGuesses: " + numberOfGuesses,
				"selectedBlock: " + selectedBlock
			);
			if (selectedBlock === numberOfGuesses - guessesLeft) {
				checkVictory();
			}

			setHint({
				correctPlaceAndColor: count1,
				correctColor: count2,
			});
		}
	}, [blockId, checkVictory, codeGuess, selectedBlock, targetCode]);

	return (
		<div className='code-block'>
			<div className='guess-hint'>
				{`${hint.correctPlaceAndColor} | ${hint.correctColor}`}
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
