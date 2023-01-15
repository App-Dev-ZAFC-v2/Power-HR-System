import {configureStore} from '@reduxjs/toolkit';
import formsReducer from './slices/form';
import responseReducer from './slices/response';
import adminReducer from './slices/admin';
import applicantReducer from './slices/applicant';
import employeeReducer from './slices/employee';

const reducer = {
    forms: formsReducer,
    responses: responseReducer,
    admins: adminReducer,
    applicants: applicantReducer,
    employees: employeeReducer,
};

export const store = configureStore({
    reducer: reducer,
    //TODO: turn off devTools for production
    devTools: false,
});