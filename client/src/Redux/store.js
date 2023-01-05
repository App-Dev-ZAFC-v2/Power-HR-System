import {configureStore} from '@reduxjs/toolkit';
import formsReducer from './slices/form';
import responseReducer from './slices/response';
import adminReducer from './slices/admin';

const reducer = {
    forms: formsReducer,
    responses: responseReducer,
    admins: adminReducer,
};

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});