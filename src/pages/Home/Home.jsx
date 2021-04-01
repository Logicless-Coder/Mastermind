import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

const Home = () => {
	return (
		<div className='home'>
			<Navbar />
			<Hero />
			<Footer />
		</div>
	);
};

export default Home;
