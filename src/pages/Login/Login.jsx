import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import loginUser from "./../../redux/actions/loginUser";
import { BACKEND_URL } from "./../../constants/route-urls";

import "./Login.css";

const Login = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({});

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		axios
			.post(BACKEND_URL + "/auth/login", formData)
			.then((response) => {
				dispatch(
					loginUser({
						player: response.data.player,
						token: response.data.token,
					})
				);
				localStorage.setItem("token", response.data.token);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='login-page'>
			<div className='login-form-box'>
				<div className='title'>Player Login Form</div>
				<form
					action='/login'
					className='login-form'
					method='POST'
					onSubmit={handleFormSubmit}>
					<div className='input-group'>
						<label htmlFor='email' className='label'>
							Email Address
						</label>
						<input
							className='input'
							type='email'
							name='email'
							id='email'
							value={formData.email}
							onChange={handleFormChange}
						/>
					</div>
					<div className='input-group'>
						<label htmlFor='password' className='label'>
							Password
						</label>
						<input
							className='input'
							type='password'
							name='password'
							id='password'
							value={formData.password}
							onChange={handleFormChange}
						/>
					</div>
					<button className='login-button' type='submit'>
						Login
					</button>
					<Link to='/register' className='register-link'>
						Not a member yet? Register here.
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
