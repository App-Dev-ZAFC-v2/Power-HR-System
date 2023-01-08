import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5000/forms/";

const initialState = {
    form: [],
    formsCollab: [],
    loading: false,
    saved: "SAVED",
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

export const getFormsByUser = createAsyncThunk(
    'forms/form/User/fetch',
    async (userID) => {
        const res = await axios.get(API_URL + userID + "/u");
        return res.data;
    }
);

export const getFormsByCollaborator = createAsyncThunk(
    'forms/form/Collaborator/fetch',
    async (userID) => {
        const res = await axios.get(API_URL + userID + "/c");
        return res.data;
    }
);

export const getFormsByPublished = createAsyncThunk(
    'forms/form/Published/fetch',
    async () => {
        const res = await axios.get(API_URL + "published");
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
        return formID;
    }
);



//Question
//add
export const addQuestion = createAsyncThunk(
    'form/addQuestion',
    async (data) => {
        var question = {
            questionText: "Untitled Question " +( data.length + 1),
            questionType: "Multiple Choice",
            questionImage: "",
            required: data.required,
            options: [{optionText: "Option 1", optionImage: ""}],
            openView: true,
        }
        return question;
    }
);



//set save state
export const setSaving = createAsyncThunk(
    'form/setSaving',
    async () => {
        return "SAVING";
    }
);





//Slice
const formSlice = createSlice({
    name: 'form',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateForm.rejected, (state, action) => {
                state.saved = "FAILED";
            })
            .addCase(deleteForm.rejected, (state, action) => {
                state.saved = "FAILED";
            })
            .addCase(addQuestion.rejected, (state, action) => {
                state.saved = "FAILED";
            })



            .addCase(createForm.pending, (state) => {
                state.loading = true;
            })
            .addCase(getForms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFormByID.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFormsByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFormsByCollaborator.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFormsByPublished.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateForm.pending, (state) => {
                state.loading = true;
                state.saved = "SAVING";
            })
            .addCase(deleteForm.pending, (state) => {
                state.saved = "SAVING";
            })
            .addCase(addQuestion.pending, (state) => {
                state.saved = "SAVING";
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
                state.form = action.payload;
                state.loading = false;
            })
            .addCase(getFormsByUser.fulfilled, (state, action) => {
                state.form = [...action.payload];
                state.loading = false;
            })
            .addCase(getFormsByCollaborator.fulfilled, (state, action) => {
                state.formsCollab = [...action.payload];
                state.loading = false;
            })
            .addCase(getFormsByPublished.fulfilled, (state, action) => {
                state.form = [...action.payload];
                state.loading = false;
            })
            .addCase(updateForm.fulfilled, (state, action) => {
                state.form = action.payload;
                state.loading = false;
                state.saved = "SAVED";
            })
            .addCase(deleteForm.fulfilled, (state, action) => {
                const index = state.form.findIndex((form) => form._id === action.payload);
                state.form.splice(index, 1);
                state.loading = false;
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                for(let i = 0; i < state.form.questions.length; i++){
                    state.form.questions[i].openView = false;
                }
                state.form.questions.push(action.payload);
            })
            .addCase(setSaving.fulfilled, (state, action) => {
                state.saved = action.payload;
            })

    }
});


const {reducer} = formSlice;
export default reducer;