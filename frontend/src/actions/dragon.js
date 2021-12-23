import { DRAGON } from "./types.js";

export const fetchDragon = () => (dispatch) => {
    dispatch({ type: DRAGON.FETCH });

    return fetch('http://localhost:8080/dragon/new')
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