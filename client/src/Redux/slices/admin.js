import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000/admins/";

const initialState = {
    admin: [],
};

export const getAdmins = createAsyncThunk(
    'admin/getAdmins',
    async () => {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return res.data;
    }
);

export const getAdminByID = createAsyncThunk(
    'admin/getAdminByID',
    async (id) => {
        const res = await axios.get(API_URL + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return res.data;
    }
);

export const updateAdmin = createAsyncThunk(
    'admin/updateAdmin',
    async (data) => {
        const res = await axios.patch(API_URL + data._id, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return res.data;
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAdmins.fulfilled, (state, action) => {
                state.admin = action.payload;
            })
            .addCase(updateAdmin.fulfilled, (state, action) => {
                state.admin = action.payload;
            })
            .addCase(getAdminByID.fulfilled, (state, action) => {
                state.admin = action.payload;
            });

    }
});

const {reducer} = adminSlice;
export default reducer;