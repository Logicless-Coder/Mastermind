import { UPDATE_SCORE } from "../../constants/action-types";

function updateScore(payload) {
	return { type: UPDATE_SCORE, payload };
}

export default updateScore;
