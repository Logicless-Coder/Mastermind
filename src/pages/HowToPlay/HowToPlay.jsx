import React from "react";

import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";

import "./HowToPlay.css";

const HowToPlay = () => {
	return (
		<div className='how-to-play-page'>
			<Navbar />
			<div className='guide'>
				<div className='guide-title'>How to Play Mastermind</div>
				<div className='section overview'>
					<div className='guide-subtitle'>Overview</div>
					<div className='guide-desc'>
						<div className='guide-text'>
							<p>
								Mastermind is a <b>code breaking game</b>. The player gets
								certain number of <b>guesses</b> to guess the correct (hidden)
								sequence of colors.
							</p>
							<p>
								After each guess the player makes, a <b>hint</b> is shown
								reflecting how good (or accurate) the guess was. The player then
								is able to make a better guess, to be able to find the correct
								sequence.
							</p>
						</div>
					</div>
				</div>
				<div className='section target-code-guide'>
					<div className='guide-subtitle'>Target Code</div>
					<div className='guide-desc'>
						<div className='guide-image'>
							<img
								src='target-code.png'
								alt='4 circles and 8 written above it showing an example of target code'
							/>
						</div>
						<div className='guide-text'>
							<p>
								This is the <b>hidden sequence</b> of colors that needs to be
								guessed. When the player makes a guess which matches this code,
								the game ends in a victory. It is shown on the <b>left side</b>{" "}
								of the screen.
							</p>
							<p>
								The number written above this code represents the
								<b> number of guesses</b> the player has left before the game
								ends in defeat.
							</p>
						</div>
					</div>
				</div>
				<div className='section code-menu-guide'>
					<div className='guide-subtitle'>Code Menu</div>
					<div className='guide-desc'>
						<div className='guide-text'>
							<p>
								This is the <b>menu of colors</b> that player can choose the
								next color of the guess from. It can be found at the{" "}
								<b>bottom</b> of the screen.
							</p>
							<p>
								<b>Clicking</b> on any color from this menu will insert that
								color in the next slot of the guesses. Note: You cannot revert
								back selecting a color, a color when once chosen will become a
								part of the guess and you <b>cannot unselect</b> it.
							</p>
						</div>
						<div className='guide-image'>
							<img
								src='code-menu.png'
								alt='4 coloured circles showing an example of code menu'
							/>
						</div>
					</div>
				</div>
				<div className='section guess-grid-guide'>
					<div className='guide-subtitle'>Guess Grid</div>
					<div className='guide-desc'>
						<div className='guide-image'>
							<img
								src='guess-grid.png'
								alt='32 circles showing the history of and remainging guesses'
							/>
						</div>
						<div className='guide-text'>
							<p>
								This grid shows and keeps track of <b>all the guesses</b> you
								have made so far. As you make a new guess, it will be shown
								here. Number of columns represent the total number of guesses
								available.
							</p>
							<p>
								Each <b>column</b> of this grid is a guess you made. Light gray
								color represents that you are yet to make that guess. The
								guesses are filled in from <b>top-to-bottom</b> and{" "}
								<b>left-to-right</b>.
							</p>
						</div>
					</div>
				</div>
				<div className='section hint-guide'>
					<div className='guide-subtitle'>Hints</div>
					<div className='guide-desc'>
						<div className='guide-text'>
							<p>
								These 2 numbers represent the <b>hints</b> given by the game
								based upon the guess you made. It is shown <b>above</b> its
								corresponding guess.
							</p>
							<p>
								First number represents the number of circles which have the{" "}
								<b>correct color</b> and are in the <b>correct position</b>.
								While the second number represents the number of circles which
								have <b>just the correct color</b>.
							</p>
						</div>
						<div className='guide-image'>
							<img
								src='hints.png'
								alt='2 numbers separated by a pipe character above the guessed code'
							/>
						</div>
					</div>
				</div>
				<div className='section scoring-guide'>
					<div className='guide-subtitle'>Scoring</div>
					<div className='guide-desc'>
						<div className='guide-image'>
							<img src='scoring.png' alt='+20 score on winning the game' />
						</div>
						<div className='guide-text'>
							<p>
								Scoring in Mastermind is <b>relative</b>. The higher your rank
								is the harder it is for you to score. This is to keep the game
								fun and give it a <b>difficultly curve</b> especially at higher
								ranks.
							</p>
							<p>
								The player is <b>awarded with points</b> on victory based on how
								prominent the game was. On the dark side, points are{" "}
								<b>deducted</b> whenever the player loses a game.
							</p>
						</div>
					</div>
				</div>
			</div>
			<a href='/play' className='go-to-play-button'>
				Let's Play!
			</a>
			<Footer />
		</div>
	);
};

export default HowToPlay;
