import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import loginUser from "./redux/actions/loginUser";
import { BACKEND_URL } from "./constants/route-urls";

import Loader from "./components/Loader/Loader";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile";
import Play from "./pages/Play/Play";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import HowToPlay from "./pages/HowToPlay/HowToPlay";

import "./App.css";

const App = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token) {
			axios
				.get(BACKEND_URL + "/auth", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					if (response.data.error === "Token expired.") {
						localStorage.removeItem("token");
					} else if (response.data.username && response.data.email) {
						dispatch(
							loginUser({
								player: {
									username: response.data.username,
									email: response.data.email,
									score: response.data.score,
								},
								token,
							})
						);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [dispatch, token]);

	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/'>
						{auth.authenticated ? (
							<Home />
						) : token ? (
							<Loader />
						) : (
							<Redirect to='/login' />
						)}
					</Route>
					<Route exact path='/register'>
						{auth.authenticated ? <Redirect to='/' /> : <Register />}
					</Route>
					<Route exact path='/login'>
						{auth.authenticated ? <Redirect to='/' /> : <Login />}
					</Route>
					<Route exact path='/profile'>
						{auth.authenticated ? (
							<Profile />
						) : token ? (
							<Loader />
						) : (
							<Redirect to='/login' />
						)}
					</Route>
					<Route exact path='/leaderboard'>
						{auth.authenticated ? (
							<Leaderboard />
						) : token ? (
							<Loader />
						) : (
							<Redirect to='/login' />
						)}
					</Route>
					<Route exact path='/play'>
						{auth.authenticated ? (
							auth.user.firstTime === true ? (
								<Redirect to='/how-to-play' />
							) : (
								<Play />
							)
						) : token ? (
							<Loader />
						) : (
							<Redirect to='/login' />
						)}
					</Route>
					<Route exact path='/how-to-play'>
						{auth.authenticated ? (
							<HowToPlay />
						) : token ? (
							<Loader />
						) : (
							<Redirect to='/login' />
						)}
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
