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

//Limit
export const setOnceForm = createAsyncThunk(
    'forms/form/setLimit',
    async (data) => {
        return data;
    }
);

//RequiredAll
export const setRequiredAll = createAsyncThunk(
    'forms/form/setRequiredAll',
    async (data) => {
        return data;
    }
);

//published
export const setPublished = createAsyncThunk(
    'forms/form/setPublished',
    async (data) => {
        return data;
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
            .addCase(setOnceForm.pending, (state) => {
                state.loading = true;
            })
            .addCase(setRequiredAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(setPublished.pending, (state) => {
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
                const index = state.form.findIndex((form) => form._id === action.payload);
                state.form.splice(index, 1);
                state.loading = false;
            })
            .addCase(setOnceForm.fulfilled, (state, action) => {
                state.form.once = action.payload;
                state.loading = false;
                state.saved = false;
            })
            .addCase(setRequiredAll.fulfilled, (state, action) => {
                state.form.requiredAll = action.payload;
                for(let i = 0; i < state.form.questions.length; i++){
                    state.form.questions[i].required = action.payload;
                }
                state.loading = false;
                state.saved = false;
            })
            .addCase(setPublished.fulfilled, (state, action) => {
                state.form.published = action.payload;
                state.loading = false;
                state.saved = false;
            })

            
            .addCase(addQuestion.fulfilled, (state, action) => {
                for(let i = 1; i < state.form.questions.length; i++){
                    state.form.questions[i].openView = false;
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
                state.form.questions[action.payload.i].questionType = action.payload.value;
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

    }
});


const {reducer} = formSlice;
export default reducer;