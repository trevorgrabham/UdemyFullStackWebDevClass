import { combineReducers } from "redux";
import generation from "./generation.js";
import dragon from './dragon.js';
import account from './account.js';

export default combineReducers({ account, dragon, generation});