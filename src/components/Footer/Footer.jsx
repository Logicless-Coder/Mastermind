import React from "react";

import "./Footer.css";

const Footer = () => {
	return (
		<div className='footer'>
			{/* <div className='balls-container'>
				<svg className='ball red' width='100px' height='100px'>
					<circle cx='50px' cy='50px' r='45px' />
				</svg>
				<svg className='ball green' width='100px' height='100px'>
					<circle cx='50px' cy='50px' r='45px' />
				</svg>
				<svg className='ball blue' width='100px' height='100px'>
					<circle cx='50px' cy='50px' r='45px' />
				</svg>
				<svg className='ball yellow' width='100px' height='100px'>
					<circle cx='50px' cy='50px' r='45px' />
				</svg>
			</div> */}
			<div className='credit'>
				Made with <span className='heart'>❤</span> by Abhishek Rathore
			</div>
		</div>
	);
};

export default Footer;
