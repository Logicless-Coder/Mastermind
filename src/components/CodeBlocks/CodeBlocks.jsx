import React from "react";

import CodeBlock from "../CodeBlock/CodeBlock";

import "./CodeBlocks.css";

const CodeBlocks = ({
	guesses,
	targetCode,
	checkVictory,
	selectedBlock,
	guessesLeft,
	numberOfGuesses,
}) => {
	return (
		<div className='blocks'>
			{guesses &&
				guesses.map((guess, index) => {
					return (
						<CodeBlock
							codeGuess={guess}
							targetCode={targetCode}
							checkVictory={checkVictory}
							selectedBlock={selectedBlock}
							numberOfGuesses={numberOfGuesses}
							guessesLeft={guessesLeft}
							id={"codeblock-" + index}
						/>
					);
				})}
		</div>
	);
};

export default CodeBlocks;
