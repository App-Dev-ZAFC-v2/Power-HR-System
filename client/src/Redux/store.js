import {configureStore} from '@reduxjs/toolkit';
import formReducer from './slices/form';

const reducer = {
    form: formReducer,
};

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});