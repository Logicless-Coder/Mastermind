import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getColors, DEFAULT_COLOR } from "./../../constants/colors";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ColorCircle from "../../components/ColorCircle/ColorCircle";
import TargetBlock from "../../components/TargetBlock/TargetBlock";
import CodeBlocks from "../../components/CodeBlocks/CodeBlocks";

import "./Play.css";

const Play = () => {
	const settings = useSelector((state) => state.settings);

	const [gameData, setGameData] = useState({
		colorsToBeUsed: [],
		targetCode: [],
		numberOfGuesses: settings.numberOfGuesses,
		guesses: [],
		selectedIndex: 0,
		gameStatus: "ongoing",
		guessesLeft: settings.numberOfGuesses,
	});

	function randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const generateTargetCode = () => {
		let targetCode = new Array(settings.lengthOfCode);
		let colorsToBeUsed = getColors(settings.numberOfColors);
		console.log(colorsToBeUsed);

		for (let i = 0; i < settings.lengthOfCode; i++) {
			targetCode[i] =
				colorsToBeUsed[randomIntFromInterval(0, settings.numberOfColors - 1)];
		}

		setGameData((prev) => {
			return { ...prev, targetCode, colorsToBeUsed };
		});
	};

	const generateGuesses = () => {
		let guesses = [];
		for (let i = 0; i < settings.numberOfGuesses; i++) {
			let guess = [];
			for (let j = 0; j < settings.lengthOfCode; j++) {
				guess.push(DEFAULT_COLOR);
			}
			guesses.push(guess);
		}
		setGameData((prev) => {
			return { ...prev, guesses };
		});
	};

	useEffect(() => {
		generateTargetCode();
		generateGuesses();
	}, []);

	const checkVictory = () => {
		let count = 0;
		const row = Math.floor(gameData.selectedIndex / settings.lengthOfCode);
		for (let i = 0; i < gameData.targetCode.length; i++) {
			if (gameData.guesses[row][i] === gameData.targetCode[i]) {
				count++;
			}
		}

		const newGuessesLeft = gameData.guessesLeft - 1;
		setGameData((prev) => {
			return { ...prev, guessesLeft: newGuessesLeft };
		});

		if (count === gameData.targetCode.length) {
			setGameData((prev) => {
				return { ...prev, gameStatus: "won" };
			});
			alert("You won!");
		} else if (newGuessesLeft === 0) {
			setGameData((prev) => {
				return { ...prev, gameStatus: "lost" };
			});
			alert("You lost!");
		}
	};

	const rgbToHex = (rgb) => {
		return (
			"#" +
			rgb
				.substr(4, rgb.indexOf(")") - 4)
				.split(",")
				.map((color) => String("0" + parseInt(color).toString(16)).slice(-2))
				.join("")
		);
	};

	const addColor = (event) => {
		const colorToAdd = rgbToHex(event.target.style.backgroundColor);
		let index = gameData.selectedIndex;
		const row = Math.floor(index / settings.lengthOfCode);
		const col = Math.floor(index % settings.lengthOfCode);
		let guesses = gameData.guesses;
		guesses[row][col] = colorToAdd;
		setGameData((prev) => {
			return { ...prev, guesses, selectedIndex: index + 1 };
		});
	};

	return (
		<div className='play'>
			<Navbar />
			<div className='play-area'>
				<TargetBlock
					targetCode={gameData.targetCode}
					guessesLeft={gameData.guessesLeft}
				/>
				<CodeBlocks
					guesses={gameData.guesses}
					targetCode={gameData.targetCode}
					checkVictory={checkVictory}
					guessesLeft={gameData.guessesLeft}
					numberOfGuesses={gameData.numberOfGuesses}
					selectedBlock={Math.floor(
						gameData.selectedIndex / settings.lengthOfCode
					)}
				/>
			</div>
			<div className='color-menu'>
				{gameData.colorsToBeUsed.map((color, index) => {
					return (
						<ColorCircle
							color={color}
							id={"color-" + index}
							addColor={addColor}
						/>
					);
				})}
			</div>
			<Footer />
		</div>
	);
};

export default Play;
