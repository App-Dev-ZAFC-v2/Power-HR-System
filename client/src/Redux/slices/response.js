import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000/feedbacks/";

const initialState = {
    response: [],
    loading: false,
    saved: true,
}

export const createResponse = createAsyncThunk(
    'response/create',
    async (data) => {
        const res = await axios.post(API_URL, data);
        return res.data;
    }
);

export const getAllResponse = createAsyncThunk(
    'response/fetch',
    async () => {
        const res = await axios.get(API_URL);
        return res.data;
    }
);


const responseSlice = createSlice({
    name: 'response',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createResponse.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllResponse.pending, (state, action) => {
            state.loading = true;
        })

        .addCase(createResponse.fulfilled, (state, action) => {
            state.response.push(action.payload);
            state.loading = false;
            state.saved = true;
        })
        .addCase(getAllResponse.fulfilled, (state, action) => {
            state.response = [...action.payload];
            state.loading = false;
        })
    }
});

const {reducer} = responseSlice;
export default reducer;