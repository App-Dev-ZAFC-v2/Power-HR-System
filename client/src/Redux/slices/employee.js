import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000/employees/";

const initialState = {
    employee: [],
};

export const getEmployeeByID = createAsyncThunk(
    'employee/getEmployeeByID',
    async (id) => {
        const res = await axios.get(API_URL + "f/" + id);
        return res.data;
    }
);

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeeByID.fulfilled, (state, action) => {
                state.employee = action.payload;
            });
    }
});

const {reducer} = employeeSlice;
export default reducer;