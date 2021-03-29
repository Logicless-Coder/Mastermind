import React from "react";

import "./ColorCircle.css";

const ColorCircle = ({ color, addColor, id }) => {
	return (
		<div
			className='color-circle'
			style={{ background: color }}
			id={id}
			onClick={addColor}>
			{color === "?" && color}
		</div>
	);
};

export default ColorCircle;
