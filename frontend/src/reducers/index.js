import { combineReducers } from "redux";
import generation from "./generation.js";
import dragon from './dragon.js';
import account from './account.js';
import accountDragons from './accountDragons';
import accountInfo from './accountInfo.js';

export default combineReducers({ 
    account, 
    accountDragons, 
    accountInfo, 
    dragon, 
    generation
});