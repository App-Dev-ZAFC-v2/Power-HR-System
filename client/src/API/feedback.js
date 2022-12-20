import axios from "axios";
const API_URL = "http://localhost:5000/feedbacks/";

const feedbackAPI = {
  async getFeedbacks() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getFeedbackByID(feedbackID) {
    const response = await axios.get(API_URL + feedbackID);
    return response.data;
  },

  async createFeedback(data) {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  async updateFeedback(feedbackID, data) {
    const response = await axios.patch(API_URL + feedbackID, data);
    return response.data;
  },

  async deleteFeedback(feedbackID) {
    const response = await axios.delete(API_URL + feedbackID);
    return response.data;
  },
};

export default feedbackAPI;

// export default {
//     getFeedbacks(){
//         return axios.get(API_URL)
//         .then(response => {
//             return response.data;
//         })
//     },

//     getFeedbackByID(formID){
//         return axios.get(API_URL + feedbackID)
//         .then(response =>{
//             return response.data;
//         })
//     },

//     createFeedback(data){
//         return axios.post(API_URL, data)
//         .then(response =>{
//             return response.data;
//         })
//     },

//     updateFeedback(feedbackID){
//         return axios.patch(API_URL + feedbackID, data)
//         .then(response =>{
//             return response.data;
//         })
//     },

//     deleteFeedback(feedbackID){
//         return axios.delete(API_URL + feedbackID)
//         .then(response =>{
//             return response.data;
//         })
//     }
// }
