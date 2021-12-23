import { GENERATION_ACTION_TYPE } from "./types.js";

export const generationActionCreator = (payload) => {
    return {
        type: GENERATION_ACTION_TYPE,
        generation: payload
    };
};