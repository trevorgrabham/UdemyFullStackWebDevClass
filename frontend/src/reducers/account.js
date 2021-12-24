import { ACCOUNT } from '../actions/types.js';
import fetchStates from './fetchStates.js';

const DEFAULT_ACCOUNT = { loggedIn: false };

const account = (state=DEFAULT_ACCOUNT, action) => {
    switch(action.type) {
        case ACCOUNT.FETCH:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case ACCOUNT.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, message: action.message, loggedIn: true };
        default:
            return state;
    }
}

export default account;