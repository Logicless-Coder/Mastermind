import { LOGIN_USER } from "../../constants/action-types";

function loginUser(payload) {
	return { type: LOGIN_USER, payload };
}

export default loginUser;
