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
						<a href='#' className='nav-link'>
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
