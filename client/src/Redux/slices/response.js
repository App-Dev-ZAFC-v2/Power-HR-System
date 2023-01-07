import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/feedbacks/";

const initialState = {
  feedback: [],
  loading: false,
  saved: "SAVED",
  count: -1,
};

export const createResponse = createAsyncThunk(
  "response/create",
  async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  }
);

export const getResponse = createAsyncThunk("response/get", async (data) => {
  const { formID, employeeID } = data;
  const res = await axios.get(API_URL + formID + "/" + employeeID);
  return res.data;
});

export const getAllResponse = createAsyncThunk("response/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const getResponseByFormID = createAsyncThunk(
  "response/fetchByFormID",
  async (formID) => {
    const res = await axios.get(API_URL + formID);
    return res.data;
  }
);

export const getResponseByEmployeeID = createAsyncThunk(
  "response/fetchByEmployeeID",
  async (employeeID) => {
    const res = await axios.get(API_URL + employeeID);
    return res.data;
  }
);

export const updateResponse = createAsyncThunk(
  "response/update",
  async (data) => {
    const res = await axios.patch(API_URL + data._id, data);
    return res.data;
  }
);

//set save state
export const setSaving = createAsyncThunk("response/setSaving", async () => {
  return "SAVING";
});

const responseSlice = createSlice({
  name: "response",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getResponseByFormID.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getResponseByEmployeeID.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateResponse.pending, (state, action) => {
        state.saved = "SAVING";
      })

      .addCase(createResponse.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.count = state.count + 1;
        state.saved = true;
      })
      .addCase(getAllResponse.fulfilled, (state, action) => {
        state.feedback = [...action.payload];
        state.loading = false;
      })
      .addCase(getResponse.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.feedback = [];
          state.count = 0;
          state.loading = false;
          return;
        }

        var temp = new Date(action.payload[0].date);
        var index = 0;
        //get latest date and draft is true
        for (let i = 1; i < action.payload.length; i++) {
          if (
            temp < new Date(action.payload[i].date) &&
            action.payload[i].draft === true
          ) {
            temp = new Date(action.payload[i].date);
            index = i;
          }
        }

        state.count = action.payload.length;

        if (action.payload[index].draft === true) {
          state.feedback = action.payload[index];
        }

        state.loading = false;
      })
      .addCase(getResponseByFormID.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.loading = false;
      })
      .addCase(getResponseByEmployeeID.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.loading = false;
      })
      .addCase(updateResponse.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.saved = "SAVED";
      })
      .addCase(setSaving.fulfilled, (state, action) => {
        state.saved = action.payload;
      });
  },
});

const { reducer } = responseSlice;
export default reducer;
