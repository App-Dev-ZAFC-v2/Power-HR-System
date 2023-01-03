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
        return res.data;
    }
);



//Question
//add
export const addQuestion = createAsyncThunk(
    'form/addQuestion',
    async (data) => {
        var question = {
            questionText: "Untitled Question " + data.length,
            questionType: "Multiple Choice",
            questionImage: "",
            required: data.required,
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


export const editView = createAsyncThunk(
    'form/editView',
    async (index) => {
        return index;
    }
);

export const editQuestionText = createAsyncThunk(
    'form/editQuestionText',
    async (data) => {
        return data;
    }
);

export const editQuestionType = createAsyncThunk(
    'form/editQuestionType',
    async (data) => {
        return data;
    }
);

//set save state
export const setSaved = createAsyncThunk(
    'form/setSaved',
    async (data) => {
        return data;
    }
);

//reorder
export const reorderQuestion = createAsyncThunk(
    'form/reorderQuestion',
    async (result) => {
        return result;
    }
);

//option
//add
export const addOption = createAsyncThunk(
    'form/addOption',
    async (data) => {
        var option = {
            optionText: "Option " + (data.j+2),
            optionImage: "",
            optionScale: 0,
        }
        return {data, option};
    }
);

//delete
export const deleteOption = createAsyncThunk(
    'form/deleteOption',
    async (index) => {
        return index;
    }
);

//edit optionText
export const editOptionText = createAsyncThunk(
    'form/editOptionText',
    async (data) => {
        return data;
    }
);

//edit optionScale
export const editOptionScale = createAsyncThunk(
    'form/editOptionScale',
    async (data) => {
        return data;
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
                action.payload.questions[0].openView = true;
                for(let i = 1; i < action.payload.questions.length; i++){
                    action.payload.questions[i].openView = false;
                }
                state.form = action.payload;
                state.loading = false;
            })
            .addCase(getFormsByUser.fulfilled, (state, action) => {
                state.form = [...action.payload];
                state.loading = false;
            })
            .addCase(getFormsByCollaborator.fulfilled, (state, action) => {
                state.formCollaborate = [...action.payload];
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
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.form.questions.splice(action.payload, 1);
                if(action.payload === 0){
                    state.form.questions[0].openView = true;
                }
                else{
                    state.form.questions[action.payload - 1].openView = true;
                }
            })
            

            .addCase(editView.fulfilled, (state, action) => {
                for(let i = 0; i < state.form.questions.length; i++){
                    state.form.questions[i].openView = false;
                }
                state.form.questions[action.payload].openView = true;
            })
            .addCase(editQuestionText.fulfilled, (state, action) => {
                state.form.questions[action.payload.i].questionText = action.payload.value;
                state.saved = false;
            })
            .addCase(editQuestionType.fulfilled, (state, action) => {
                var prev = state.form.questions[action.payload.i].questionType;
                state.form.questions[action.payload.i].questionType = action.payload.value;
                if(action.payload.value === "Linear Scale"){
                    state.form.questions[action.payload.i].options = [
                        { optionText: "", optionImage: "", optionScale: 1 },
                        { optionText: "", optionImage: "", optionScale: 5 }];
                }
                else if(action.payload.value === "Multiple Choice" || action.payload.value === "Checkboxes" || action.payload.value === "Drop-down"){
                    if(prev !== "Multiple Choice" && prev !== "Checkboxes" && prev !== "Drop-down"){
                        state.form.questions[action.payload.i].options = [{ optionText: "Option 1", optionImage: "" }];
                    }
                }
                else{
                    if(prev !== "Paragraph" && prev !== "Short Answer"){
                        state.form.questions[action.payload.i].options = [];
                    }
                }
                
                state.saved = false;
            })

            .addCase(addOption.fulfilled, (state, action) => {
                state.form.questions[action.payload.data.i].options.push(action.payload.option);
                state.saved = false;
            })
            .addCase(deleteOption.fulfilled, (state, action) => {
                state.form.questions[action.payload.i].options.splice(action.payload.j, 1);
                state.saved = false;
            })
            .addCase(editOptionText.fulfilled, (state, action) => {
                state.form.questions[action.payload.i].options[action.payload.j].optionText = action.payload.value;
                state.saved = false;
            })
            .addCase(editOptionScale.fulfilled, (state, action) => {
                state.form.questions[action.payload.i].options[action.payload.j].optionScale = action.payload.value;
                state.saved = false;
            })

            .addCase(setSaved.fulfilled, (state, action) => {
                state.saved = action.payload;
            })

    }
});


const {reducer} = formSlice;
export default reducer;