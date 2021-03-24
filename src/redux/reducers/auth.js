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
				...state,
				authenticated: true,
				token: action.payload.token,
				user: action.payload.player,
			};
		case LOGOUT_USER:
			return {
				...state,
				authenticated: false,
				token: null,
				user: {},
			};
		case UPDATE_SCORE:
			return {
				...state,
				user: {
					...state.user,
					score: action.payload.score,
				},
			};
		default:
			return state;
	}
};

export default authReducer;
