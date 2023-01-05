import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/feedbacks/";

const initialState = {
  feedback: [],
  loading: false,
  saved: true,
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

export const updateResponse = createAsyncThunk(
  "response/update",
  async (data) => {
      const res = await axios.patch(API_URL + data._id, data);
      return res.data;
  }
);

const responseSlice = createSlice({
  name: "response",
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
        state.feedback = action.payload;
        state.loading = false;
        state.saved = true;
      })
      .addCase(getAllResponse.fulfilled, (state, action) => {
        state.feedback = [...action.payload];
        state.loading = false;
      })
      .addCase(getResponse.fulfilled, (state, action) => {

        var temp = new Date(action.payload[0].date);
        var index = 0;
        //get latest date and draft is false
        for(let i = 1; i < action.payload.length; i++){
          if(temp < new Date(action.payload[i].date) && action.payload[i].draft === false){
            temp = new Date(action.payload[i].date);
            index = i;
          }
        }
        state.feedback = action.payload[index];
        state.loading = false;
      })
      .addCase(getResponseByFormID.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.loading = false;
      })
      .addCase(updateResponse.fulfilled, (state, action) => {
        state.feedback = action.payload;
        state.saved = false;
      });
  },
});

const { reducer } = responseSlice;
export default reducer;
