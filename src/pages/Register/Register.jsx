import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import loginUser from "./../../redux/actions/loginUser";
import { BACKEND_URL } from "./../../constants/route-urls";

import "./Register.css";

const Register = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({});
	const [message, setMessage] = useState("");

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
			.post(BACKEND_URL + "/auth/register", formData)
			.then((response) => {
				dispatch(
					loginUser({
						player: response.data.player,
						token: response.data.token,
					})
				);
				localStorage.setItem("token", response.data.token);
				console.log(response);
			})
			.catch((error) => {
				setMessage(error.response.data.message);
			});
	};

	return (
		<div className='register-page'>
			<div className='register-form-box'>
				<div className='title'>Registration Page</div>
				<form
					action='/register'
					className='register-form'
					method='POST'
					onSubmit={handleFormSubmit}>
					<div className='input-group'>
						<label htmlFor='username' className='label'>
							Username
						</label>
						<input
							className={`input ${
								message.includes("username") ? "wrong-input" : ""
							}`}
							type='text'
							name='username'
							id='username'
							value={formData.username}
							onChange={handleFormChange}
						/>
					</div>
					{message.includes("username") && (
						<p className='server-message'>{message}</p>
					)}

					<div className='input-group'>
						<label htmlFor='email' className='label'>
							Email Address
						</label>
						<input
							className={`input ${
								message.includes("email") ? "wrong-input" : ""
							}`}
							type='email'
							name='email'
							id='email'
							value={formData.email}
							onChange={handleFormChange}
						/>
					</div>
					{message.includes("email") && (
						<p className='server-message'>{message}</p>
					)}

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
					<button className='register-button' type='submit'>
						Register
					</button>
					<Link to='/login' className='login-link'>
						Already a member? Login here.
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Register;
