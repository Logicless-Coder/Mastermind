import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { DEFAULT_COLOR, getColors } from "./../../constants/colors";
import { BACKEND_URL } from "../../constants/route-urls";
import updateScore from "../../redux/actions/updateScore";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ColorCircle from "../../components/ColorCircle/ColorCircle";
import TargetBlock from "../../components/TargetBlock/TargetBlock";
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import GameOver from "../../components/GameOver/GameOver";

import "./Play.css";

const Play = () => {
	const auth = useSelector((state) => state.auth);
	const settings = useSelector((state) => state.settings);
	const dispatch = useDispatch();

	function randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

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

	const generateTargetCode = () => {
		let targetCode = new Array(settings.lengthOfCode);
		let colorsToBeUsed = getColors(settings.numberOfColors);

		for (let i = 0; i < settings.lengthOfCode; i++) {
			targetCode[i] =
				colorsToBeUsed[randomIntFromInterval(0, settings.numberOfColors - 1)];
		}

		return targetCode;
	};

	const initGuesses = (rows, cols) => {
		let arr = [];
		for (let i = 0; i < rows; i++) {
			let row = [];
			for (let j = 0; j < cols; j++) {
				row.push(DEFAULT_COLOR);
			}
			arr.push(row);
		}
		return arr;
	};

	const initHints = (rows) => {
		let arr = [];
		for (let i = 0; i < rows; i++) {
			arr.push(["-", "-"]);
		}
		return arr;
	};

	const [gameData, setGameData] = useState({
		targetCode: generateTargetCode(),
		colorsToBeUsed: getColors(settings.lengthOfCode),
		guessesLeft: settings.numberOfGuesses,
		clicksLeft: settings.numberOfGuesses * settings.lengthOfCode,
		guesses: initGuesses(settings.numberOfGuesses, settings.lengthOfCode),
		hints: initHints(settings.numberOfGuesses, settings.lengthOfCode),
		status: "ongoing",
		points: 0,
	});

	const generateHint = (code) => {
		let hint1 = 0,
			hint2 = 0;

		for (let i = 0; i < code.length; i++) {
			if (gameData.targetCode[i] === code[i]) {
				hint1++;
			}
		}

		let flag = [];
		for (let j = 0; j < code.length; j++) flag[j] = true;

		for (let j = 0; j < code.length; j++) {
			for (let k = 0; k < code.length; k++) {
				if (flag[k] && gameData.targetCode[k] === code[j]) {
					hint2++;
					flag[k] = false;
					break;
				}
			}
		}

		return [hint1, hint2];
	};

	const endGame = (status) => {
		let newPoints = gameData.points;
		if (status === "victory") {
			newPoints = 20;
		} else if (status === "defeat") {
			newPoints = -5;
		}

		setGameData((prev) => {
			return { ...prev, points: newPoints };
		});

		const token = auth.token;

		axios
			.patch(
				BACKEND_URL + "/game/score",
				{ points: newPoints },
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			)
			.then((response) => {
				dispatch(updateScore({ score: response.data.score }));
				// window.location.reload();
			});
	};

	const addColor = (event) => {
		const color = rgbToHex(event.target.style.backgroundColor);
		const index =
			settings.numberOfGuesses * settings.lengthOfCode - gameData.clicksLeft;
		const newClicksLeft = gameData.clicksLeft - 1;

		const row = Math.floor(index / settings.lengthOfCode);
		const col = Math.floor(index % settings.lengthOfCode);

		let newGuesses = gameData.guesses;
		newGuesses[row][col] = color;

		setGameData((prev) => {
			return { ...prev, guesses: newGuesses, clicksLeft: newClicksLeft };
		});

		if (newClicksLeft % settings.lengthOfCode === 0) {
			const code = newGuesses[row];
			const [hint1, hint2] = generateHint(code);

			let newHints = gameData.hints;
			newHints[row] = [hint1, hint2];
			let newGuessesLeft = gameData.guessesLeft - 1;

			setGameData((prev) => {
				return { ...prev, hints: newHints, guessesLeft: newGuessesLeft };
			});

			if (hint1 === settings.lengthOfCode && hint2 === settings.lengthOfCode) {
				endGame("victory");
				setGameData((prev) => {
					return { ...prev, status: "victory" };
				});
			} else if (newClicksLeft === 0 && gameData.status === "ongoing") {
				endGame("defeat");
				setGameData((prev) => {
					return { ...prev, status: "defeat" };
				});
			}
		}
	};

	if (gameData.status === "ongoing") {
		return (
			<div className='play'>
				<Navbar />
				<div className='play-area'>
					<TargetBlock
						targetCode={gameData.targetCode}
						guessesLeft={gameData.guessesLeft}
					/>
					<div className='code-blocks'>
						{gameData &&
							gameData.guesses.map((guess, index) => {
								return (
									<CodeBlock
										correctPlaceAndColor={gameData.hints[index][0]}
										correctColor={gameData.hints[index][1]}
										codeGuess={guess}
										id={"codeblock-" + index}
									/>
								);
							})}
					</div>
				</div>
				<div className='color-menu'>
					{gameData.colorsToBeUsed &&
						gameData.colorsToBeUsed.map((color, index) => {
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
	} else if (gameData.status === "victory" || gameData.status === "defeat") {
		return <GameOver pointsEarned={gameData.points} />;
	} else {
		return <></>;
	}
};

export default Play;
