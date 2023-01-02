import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000/forms/";

const initialState = {
    form: [],
    loading: false,
    saved: true,
}

//form
//Create
export const createForm = createAsyncThunk(
    'forms/form/create',
    async (data) => {
        const res = await axios.post(API_URL, data);
        return res.data;
    }
);

//Get
export const getForms = createAsyncThunk(
    'forms/fetch',
    async () => {
        const res = await axios.get(API_URL);
        return res.data;
    }
);

export const getFormByID = createAsyncThunk(
    'forms/form/fetch',
    async (formID) => {
        const res = await axios.get(API_URL + formID);
        return res.data;
    }
);


//Update
export const updateForm = createAsyncThunk(
    'forms/form/save',
    async (data) => {
        const res = await axios.patch(API_URL + data._id, data);
        return res.data;
    }
);


//Delete
export const deleteForm = createAsyncThunk(
    'forms/form/delete',
    async (formID) => {
        const res = await axios.delete(API_URL + formID);
        return res.data;
    }
);

//Question
//add
export const addQuestion = createAsyncThunk(
    'form/addQuestion',
    async (num) => {
        var question = {
            questionText: "Untitled Question " + num,
            questionType: "Multiple Choice",
            questionImage: "",
            required: false,
            options: [{optionText: "Option 1", optionImage: ""}],
            openView: true,
        }
        return question;
    }
);

//delete
export const deleteQuestion = createAsyncThunk(
    'form/deleteQuestion',
    async (index) => {
        return index;
    }
);

//reorder
export const reorderQuestion = createAsyncThunk(
    'form/reorderQuestion',
    async (result) => {
        return result;
    }
);

//edit value
export const editName = createAsyncThunk(
    'form/editName',
    async (name) => {
        return name;
    }
);

export const editDescription = createAsyncThunk(
    'form/editDescription',
    async (description) => {
        return description;
    }
);








//Slice
const formSlice = createSlice({
    name: 'form',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createForm.pending, (state) => {
                state.loading = true;
            })
            .addCase(getForms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFormByID.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateForm.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteForm.pending, (state) => {
                state.loading = true;
            })

            .addCase(createForm.fulfilled, (state, action) => {
                state.form.push(action.payload);
                state.loading = false;
            })
            .addCase(getForms.fulfilled, (state, action) => {
                state.form = [...action.payload];
                state.loading = false;
            })
            .addCase(getFormByID.fulfilled, (state, action) => {
                action.payload.questions[0].openView = true;
                for(let i = 1; i < action.payload.questions.length; i++){
                    action.payload.questions[i].openView = false;
                }
                state.form = action.payload;
                state.loading = false;
            })
            .addCase(updateForm.fulfilled, (state, action) => {
                state.loading = false;
                state.saved = true;
            })
            .addCase(deleteForm.fulfilled, (state, action) => {
                let index = state.findIndex(form => form._id === action.payload._id);
                state.splice(index, 1);
                state.loading = false;
            })

            
            .addCase(addQuestion.fulfilled, (state, action) => {
                for(let i = 1; i < action.payload.questions.length; i++){
                    action.payload.questions[i].openView = false;
                }
                state.form.questions.push(action.payload);
                state.saved = false;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.form.questions.splice(action.payload, 1);
                if(action.payload === 0){
                    state.form.questions[0].openView = true;
                }
                else{
                    state.form.questions[action.payload - 1].openView = true;
                }
                state.saved = false;
            })
            .addCase(reorderQuestion.fulfilled, (state, action) => {
                const {source, destination} = action.payload;
                const [removed] = state.form.questions.splice(source.index, 1);
                state.form.questions.splice(destination.index, 0, removed);
                state.saved = false;
            })
            .addCase(editName.fulfilled, (state, action) => {
                state.form.name = action.payload;
                state.saved = false;
            })
            .addCase(editDescription.fulfilled, (state, action) => {
                state.form.description = action.payload;
                state.saved = false;
            })
    }
});


const {reducer} = formSlice;
export default reducer;