import { DRAGON } from "./types.js";
import { BACKEND } from '../config.js';

export const fetchDragon = () => (dispatch) => {
    dispatch({ type: DRAGON.FETCH });

    return fetch(`${BACKEND.ADDRESS}/dragon/new`)
        .then((response) => response.json())
        .then((json) => {
            if(json.type === 'error') {
                dispatch({
                    type: DRAGON.FETCH_ERROR,
                    message: json.message
                });
            } else {
                dispatch({
                    type: DRAGON.FETCH_SUCCESS,
                    dragon: json.dragon
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: DRAGON.FETCH_ERROR,
                message: json.message
            });
        });
}