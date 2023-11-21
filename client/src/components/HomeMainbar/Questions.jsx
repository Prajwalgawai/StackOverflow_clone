import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Questions = ({question}) => {


    let theme=useSelector((state)=>state.fetchWeather);
    theme="light";

  return (

    <div className={`${theme!=="dark"?'display-question-container':'display-question-container-dark'}`}>
      <div className="display-votes-ans">
        <p>{question.upVote.length - question.downVote.length}</p>
        <p>votes</p>

      </div>
<div className="display-votes-ans">
    <p>{question.noOfAnswers}</p>
    <p>answers</p>
</div>
<div className="display-question-details">
    <Link to={`/Questions/${question.id}`} className='question-title-link'>
        {question.questionTitle} </Link>
        <div className="display-tags-time">
            <div className={`${theme!=="dark"?'display-tags':'display-tags-dark'}`}>
                {
                    question.questionTags?.map((tag)=>{
return (<p key={tag}> {tag}</p>)
                    })
                }
            </div>
            <p className="display-time">
                asked {
                    moment(question.postedOn).fromNow()+" "

                }

                {
                     question.userPosted
                }
            </p>
        </div>
</div>

    </div>
  )
}

export default Questions
