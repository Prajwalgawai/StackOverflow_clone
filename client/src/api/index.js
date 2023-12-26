import axios from "axios";
const API=axios.create({baseURL:'http://localhost:1000'});
// const API=axios.create({baseURL:'https://stackoverflow-prajwal.onrender.com'});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const getMyQuestions = (id) => API.get(`/questions/get/${id}`);

export const deleteQuestion=(id)=>API.delete(`/questions/delete/${id}`);
export const voteQuestion=(id,value , userId)=>API.patch(`/questions/vote/${id}`, {value, userId}); 
export const countUpvotedQuestions=(userId)=>API.get(`/questions/getVoteCount/${userId}`);

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered , userId});

export const deleteAnswer=(id, answerId, noOfAnswers, userId)=>API.patch(`/answer/delete/${id}`, {id, answerId, noOfAnswers, userId});



export const fetchAllUsers=()=>API.get('/user/getAllUsers');
export const getUser=(id)=>API.get(`/user/getUser/${id}`);

export const updateProfile=(id, updateData)=>API.patch(`/user/update/${id}`, updateData);