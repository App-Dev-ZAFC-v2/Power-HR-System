import axios from 'axios';
const API_URL = "http://localhost:5000/forms/";


export default {
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

    async updateForm(formID){
        const response = await axios.patch(API_URL + formID, data);
        return response.data;
    },

    async deleteForm(formID){
        const response = await axios.delete(API_URL + formID);
        return response.data;
    }
}

// export default {
//     getForms(){
//         return axios.get(API_URL)
//         .then(response => {
//             return response.data;
//         })
//     },

//     getFormByID(formID){
//         return axios.get(API_URL + formID)
//         .then(response =>{
//             return response.data;
//         })
//     },

//     createForm(data){
//         return axios.post(API_URL, data)
//         .then(response =>{
//             return response.data;
//         })
//     },

//     updateForm(formID){
//         return axios.patch(API_URL + formID, data)
//         .then(response =>{
//             return response.data;
//         })
//     },

//     deleteForm(formID){
//         return axios.delete(API_URL + formID)
//         .then(response =>{
//             return response.data;
//         })
//     }
// }