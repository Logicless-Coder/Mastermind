import React from "react";

import "./ColorCircle.css";

const ColorCircle = ({ color, addColor, id }) => {
	return (
		<div
			className='color-circle'
			style={{ backgroundColor: color }}
			id={id}
			onClick={addColor}></div>
	);
};

export default ColorCircle;
