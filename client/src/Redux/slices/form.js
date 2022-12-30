import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000/forms/";

const initialState = [];

//Create
export const createForm = createAsyncThunk(
    'form/create',
    async (data) => {
        const res = await axios.post(API_URL, data);
        return res.data;
    }
);

//Get
export const getForms = createAsyncThunk(
    'form/getAll',
    async () => {
        const res = await axios.get(API_URL);
        return res.data;
    }
);

export const getFormByID = createAsyncThunk(
    'form/getByID',
    async (formID) => {
        const res = await axios.get(API_URL + formID);
        return res.data;
    }
);


//Update
export const updateForm = createAsyncThunk(
    'form/update',
    async (data) => {
        const res = await axios.patch(API_URL + data._id, data);
        return res.data;
    }
);


//Delete
export const deleteForm = createAsyncThunk(
    'form/delete',
    async (formID) => {
        const res = await axios.delete(API_URL + formID);
        return res.data;
    }
);


//Slice
const formSlice = createSlice({
    name: 'form',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createForm.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(getForms.fulfilled, (state, action) => {
                return [...action.payload];
            })
            .addCase(getFormByID.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(updateForm.fulfilled, (state, action) => {
                const index = state.findIndex(form => form._id === action.payload._id);
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            })
            .addCase(deleteForm.fulfilled, (state, action) => {
                let index = state.findIndex(form => form._id === action.payload._id);
                state.splice(index, 1);
            });
    }
});


const {reducer} = formSlice;
export default reducer;