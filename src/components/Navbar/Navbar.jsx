import React from "react";

import Logout from "./../../components/Logout/Logout";

import "./Navbar.css";

const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='brand'>
				<a href='/'>Mastermind</a>
			</div>
			<nav className='nav'>
				<ul className='nav-list'>
					<li className='nav-item'>
						<a href='/how-to-play' className='nav-link'>
							How to Play
						</a>
					</li>
					<li className='nav-item'>
						<a href='/leaderboard' className='nav-link'>
							Leaderboard
						</a>
					</li>
					<li className='nav-item'>
						<a href='/profile' className='nav-link'>
							Profile
						</a>
					</li>
					<li className='nav-item'>
						<Logout />
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
