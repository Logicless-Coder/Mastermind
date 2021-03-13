import { LOGOUT_USER } from "../../constants/action-types";

function logoutUser(payload) {
	return { type: LOGOUT_USER, payload };
}

export default logoutUser;
