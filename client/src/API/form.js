import axios from 'axios';
const API_URL = "http://localhost:5000/forms/";


const FormAPI = {
    async getForms(){
        const response = await axios.get(API_URL);
        return response.data;
    },

    async getFormByID(formID){
        const response = await axios.get(API_URL + formID);
        return response.data;
    },

    async createForm(data){
        const response = await axios.post(API_URL, data);
        return response.data;
    },

    async updateForm(formID, data){
        const response = await axios.patch(API_URL + formID, data);
        return response.data;
    },

    async deleteForm(formID){
        const response = await axios.delete(API_URL + formID);
        return response.data;
    }
}

export default FormAPI;