import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";
import { postAnswer, deleteQuestion, voteQuestion } from "../../actions/question";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import '../../App.css'
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";

const QuestionsDetails = () => {
  
  const location = useLocation();
  const { id , user_id} = useParams();

  const questionsList = useSelector((state) => state.questionsReducer);
  const weather = useSelector((state) => state.fetchWeather);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User2 = useSelector((state) => state.currentUserReducer);
  const user = useSelector((state) => state.currentUserReducer);
  const User = User2?.result?._id;
  let theme = useSelector((state) => state.fetchWeather);
  // theme = "light";
  theme=theme?.data
  const [Answer, setAnswer] = useState("");
  const [sumVotes, setSumVotes] = useState(0);

  const handlePostAns = (e, answerLength, id) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        alert("dispatch successful");
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: user?.result?.name,
            userId: User,
          })
        );
      }
    }
  };

  const handleDelete = (que_id) => {
    dispatch(deleteQuestion(que_id, Navigate));
  };

  const handleUpVote = (id) => {
    dispatch(voteQuestion(id, "upVote", User));
  };

  const [loading, setLoading]=useState(false);

  const handleDownVote = (id) => {
    dispatch(voteQuestion(id, "downVote", User));
  };

  const handleShare = () => {
    
    const url = "http://localhost:3000";
    copy(url + location.pathname);
    alert("Copied url: " + url + location.pathname);
  };
  var valu=false;

  return (
    <div className={`${theme!=="dark"?"question-details-page":"question-details-page-dark"}`}>
      
      {questionsList.data === null ? 
        <h1>Loading...</h1>
       : (
        <>
          {questionsList.data
            .filter((question) => (question._id === id || (id==="user" && question.userId===user_id)))
            .map((question) => (

              <div key={question._id}>
                {valu=true}
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className={`${theme !== "dark" ? "question-votes" : "question-votes-dark"}`}>
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={() => {
                          handleUpVote(question._id);
                        }}
                      />
                     
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={() => {
                          handleDownVote(question._id);
                        }}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <div
                        className="question-body"
                        dangerouslySetInnerHTML={{ __html: question.questionBody }}
                      ></div>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User === question?.userId && (
                            <button type="button" onClick={() => handleDelete(question._id)}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section
                  className={`${theme !== "dark" ? "post-ans-container" : "post-ans-container-dark"}`}
                >
                  <h3>Your Answer</h3>
                  <form onSubmit={(e) => handlePostAns(e, question.answer.length, question._id)}>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
            
        </>
      )}
     {valu === false?<h2>Either you haven't sign in or havent ask any question yet.</h2>:""}
    </div>
    
  );
};

export default QuestionsDetails;