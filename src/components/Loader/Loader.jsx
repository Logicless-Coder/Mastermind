import React from "react";

import "./Loader.css";

const Loader = () => {
	return (
		<div className='loader'>
			<div className='circle'>
				<span className='blur'></span>
				<span className='blur'></span>
				<span className='blur'></span>
				<span className='blur'></span>
			</div>
		</div>
	);
};

export default Loader;
