import {
	LOGIN_USER,
	LOGOUT_USER,
	UPDATE_SCORE,
} from "./../../constants/action-types";

const initialState = {
	authenticated: false,
	token: null,
	user: {},
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return {
				authenticated: true,
				token: action.payload.token,
				user: {
					...state.user,
					...action.payload.player,
				},
			};
		case LOGOUT_USER:
			return {
				authenticated: false,
				token: null,
				user: {},
			};
		case UPDATE_SCORE:
			return {
				authenticated: state.authenticated,
				token: state.token,
				user: {
					...state.user,
					score: action.payload.score,
					gamesPlayed: state.user.gamesPlayed + 1,
					firstTime: false,
				},
			};
		default:
			return state;
	}
};

export default authReducer;
