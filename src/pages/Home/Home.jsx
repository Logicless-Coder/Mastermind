import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

const Home = () => {
	const auth = useSelector((state) => state.auth);

	return (
		<div className='home'>
			<Navbar />
			<Hero />
			<Footer />
		</div>
	);
};

export default Home;
