import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "https://powerhr-server.azurewebsites.net/admins/";

const initialState = {
    admin: [],
    currentAdmin: null,
    loading: false,
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

export const updateCurrentAdmin = createAsyncThunk(
    'admin/updateCurrentAdmin',
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
            .addCase(updateAdmin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAdmins.fulfilled, (state, action) => {
                state.admin = action.payload;
            })
            .addCase(updateAdmin.fulfilled, (state, action) => {
                for (let i = 0; i < state.admin.length; i++) {
                    if (state.admin[i]._id === action.payload._id) {
                        state.admin[i] = action.payload;
                    }
                }
                state.loading = false;
            })
            .addCase(getAdminByID.fulfilled, (state, action) => {
                state.currentAdmin = action.payload;
            })
            .addCase(updateCurrentAdmin.fulfilled, (state, action) => {
                state.currentAdmin = action.payload;
                for (let i = 0; i < state.admin.length; i++) {
                    if (state.admin[i]._id === action.payload._id) {
                        state.admin[i] = action.payload;
                    }
                }
            });

    }
});

const {reducer} = adminSlice;
export default reducer;