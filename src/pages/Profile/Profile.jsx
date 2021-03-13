import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { BACKEND_URL } from "../../constants/route-urls";

import "./Profile.css";

const Profile = () => {
	const auth = useSelector((state) => state.auth);
	const [rank, setRank] = useState(-1);

	useEffect(() => {
		getRank(auth.user);
	}, [auth]);

	const getRank = (user) => {
		axios
			.post(BACKEND_URL + "/auth/rank", {
				username: user.username,
			})
			.then((response) => {
				setRank(response.data.rank);
			});
	};

	if (rank === -1) return <Loader />;

	return (
		<div className='profile'>
			<Navbar />
			<div className='main'>
				<div className='player'>
					<div className='username'>{auth.user.username}</div>
					<div className='email'>{auth.user.email}</div>
					<div className='data'>
						<div className='score-box'>
							<div className='score'>{auth.user.score}</div>
							<div className='label'>Points</div>
						</div>
						<div className='rank-box'>
							<div className='rank'>{`#${rank}`}</div>
							<div className='label'>Rank</div>
						</div>
					</div>
				</div>
				<div className='trophies'>
					{/* <div className='trophies-title'>Trophies</div>
					<div className='trophies-box'>
						<div className='trophy'>Trophy</div>
					</div> */}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Profile;
