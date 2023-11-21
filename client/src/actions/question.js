import * as api from "../api/index.js";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllQuestions = () => async (disptach) => {
  try {
   console.log("fetch all questions called");
    const { data } = await api.getAllQuestions();
    disptach({ type: "FETCH_ALL_QUESTIONS", payload: data });
    
  } catch (error) {
    console.log(error);
  }
};


export const deleteQuestion=(id, navigate)=>async(dispatch)=>{
  try{
const {data}=api.deleteQuestion(id);
dispatch(fetchAllQuestions()); 
navigate('/');
  }catch(error){
console.log(error);
  }
}


export const postAnswer=(answerdata)=>async(dispatch)=>{
  try{
    console.log("answer data is :"+JSON.stringify(answerdata));
    const {id, noOfAnswers, answerBody, userAnswered, userId}=answerdata;

  const {data}=await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId);

  console.log('userid of post answer is :'+JSON.stringify(answerdata));
  dispatch({type:'POST_ANSWER', payload:data});
dispatch(fetchAllQuestions());
  }catch(error){
    console.log(error);
  }
}

export const deleteAnswer=(id, answerId, noOfAnswers,userId)=>async(dispatch)=>{
  try{
    console.log("right id is"+id);
const {data}=await api.deleteAnswer(id, answerId, noOfAnswers,userId);
dispatch(fetchAllQuestions());
  }catch(error){
console.log(error);
  }
}

export const voteQuestion=(id, value, userId)=>async(dispatch)=>{

try{
  const {data}=await api.voteQuestion(id, value, userId);
  dispatch(fetchAllQuestions());

}catch(error){
console.log(error);
}

}

export const countUpvotedQuestions=(userId)=>async(dispatch)=>{
try{
console.log("countupvotd clicked"+userId);
let {data}=await api.countUpvotedQuestions(userId);
data=data.data;
dispatch({type:"setQuestionCountScore", payload:data});
}catch(error){
console.log(error);
}
}