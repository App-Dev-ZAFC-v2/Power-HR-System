import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000/applicants/";

const initialState = {
    applicant: [],
};

export const getApplicantByID = createAsyncThunk(
    'applicant/getApplicantByID',
    async (id) => {
        const res = await axios.get(API_URL + id);
        return res.data;
    }
);

const applicantSlice = createSlice({
    name: 'applicant',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getApplicantByID.fulfilled, (state, action) => {
                state.applicant = action.payload;
            });
    }
});

const {reducer} = applicantSlice;
export default reducer;
