import { ACCOUNT_DRAGONS } from './types.js';
import { fetchFromAccount } from './account.js';

export const fetchAccountDragons = () => fetchFromAccount({
    endpoint: 'dragons',
    options: { 
        credentials: 'include' 
    },
    SUCCESS_TYPE: ACCOUNT_DRAGONS.FETCH_SUCCESS,
    FETCH_TYPE: ACCOUNT_DRAGONS.FETCH,
    ERROR_TYPE: ACCOUNT_DRAGONS.FETCH_ERROR
});