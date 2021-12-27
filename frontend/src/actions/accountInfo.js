import { fetchFromAccount } from './account.js';
import { ACCOUNT_INFO } from './types.js';

export const fetchAccountInfo = () => fetchFromAccount({
    endpoint: 'info',
    options: { credentials: 'include' },
    SUCCESS_TYPE: ACCOUNT_INFO.FETCH_SUCCESS,
    FETCH_TYPE: ACCOUNT_INFO.FETCH,
    ERROR_TYPE: ACCOUNT_INFO.FETCH_ERROR
})