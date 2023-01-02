import {configureStore} from '@reduxjs/toolkit';
import formsReducer from './slices/form';
import responseReducer from './slices/response';

const reducer = {
    forms: formsReducer,
    responses: responseReducer,
};

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});