import React from 'react'
import {Link, useLocation,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import "./HomeMainbar.css";
import Questions from "./Questions"
import QuestionList from './QuestionList';


const HomeMainbar = () => {

//   const redirect=()=>{
//     alert("login or signup to ask a question")
//     navigate('/Auth');
// }

const location= useLocation();
const user=1;
const navigate=useNavigate();

const questionsList=useSelector(state=>state.questionsReducer);
let theme=useSelector((state)=>state.fetchWeather);
theme=theme?.data
// theme="light";
//   var questionsList=[{
//     id:1,
//     votes:3,
//     noOfAnswers:2,
//     questionTitle:"What is a function?",
//     questionBody:"It meant to be",
//     questionTags:["java", "node js", "react js", "mongo db", "express js"],
//     userPosts:'mano',
//     askedOn:"jan 1"
//   },{
//     id:2,
//     votes:0,
//     noOfAnswers:0,
//     questionTitle:"What is a function?",
//     questionBody:"It meant to be",
//     questionTags:["javascript", "R", "python"],
//     userPosted:"mono",
//     askedOn:"jan 1"
//   }, {
//     id:3,
//     votes:1,
//     noOfAnswers:0,
//     questionTitle:"What is a function?",
//     questionBody:"It meant to be",
//     questionTags:["javascript", "R", "python"],
//     userPosted:"mono",
//     askedOn:"jan 1"
//   }
// ]




const checkAuth=()=>{
  if(user === null){
      alert("login or signup to ask a question")
      navigate('/Auth'); 
  }else{
    navigate('/AskQuestions');
  }
}
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
{
  location.pathname==='/'?<h1>Top Questions</h1>: <h1>All Questions</h1>
}

<button to="/AskQuestions" className={`${theme!=="dark"?'ask-btn':'ask-btn-dark'}`} onClick={checkAuth}>Ask Questions</button>

      </div>

<div>
  {
    questionsList.data===null?
    <h1>Loading...</h1>:
    <>
    <p>{questionsList.data.length} questions</p>
 <QuestionList className="questions_container" questionsList={questionsList.data}/>
    </>
  }
</div>

    </div>
  )
}

export default HomeMainbar;