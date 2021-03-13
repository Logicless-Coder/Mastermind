import React from "react";
import { useSelector, useDispatch } from "react-redux";

import logoutUser from "./../../redux/actions/logoutUser";

import "./Logout.css";

const Logout = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const logout = () => {
		localStorage.removeItem("token");
		dispatch(logoutUser());
	};

	return (
		<button className='logout-button' onClick={logout}>
			Logout
		</button>
	);
};

export default Logout;
