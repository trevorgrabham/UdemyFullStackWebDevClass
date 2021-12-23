import { DRAGON } from "../actions/types.js";
import fetchStates from "./fetchStates.js";

const DEFAULT_DRAGON = { 
    id: '', 
    birthdate: '', 
    nickname: '', 
    generationId: '', 
    traits: []
};

const dragonReducer = (state=DEFAULT_DRAGON, action) => {
    switch(action.type) {
        case DRAGON.FETCH:
            return { ...state, status: fetchStates.fetching };
        case DRAGON.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case DRAGON.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, ...action.dragon };
        default:
            return state;
    }
}

export default dragonReducer;