import React from 'react'
import {Link} from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import {deleteAnswer} from '../../actions/question';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation} from "react-router-dom";
import copy from "copy-to-clipboard";
import { useParams } from 'react-router-dom';

import moment from 'moment';

const DisplayAnswer = ({question}) => {

  const location = useLocation();
  const url = "http://localhost:3000";


  const dispatch=useDispatch();

  const User2 = useSelector((state) => state.currentUserReducer);
  const User=User2?.result?._id;

  const handleShare = () => {
   
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

 

const handleDelete=(id, answerId, noOfAnswers)=>{
dispatch(deleteAnswer(id, answerId, noOfAnswers-1,User));
}



  return (
    <div>
      {
        question.answer.map((ans)=>(
          <div className="display-ans" key={ans._id}>
            <p>{ans.answerBody}</p>
            <div className="question-actions-user">
              <div>
                <button type="button" onClick={handleShare}>Share</button>
      {User === ans?.userId && (
                  <button type="button" onClick={()=>{
                    handleDelete(question._id,ans._id, question.noOfAnswers)
                  }}>
                    Delete
                  </button>
                )}
              </div>
              <div>
                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:"#0086d8"}}>
    <Avatar backgroundColor="green" px="8px" py="5px">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
<div>
    {ans.userAnswered}
</div>
</Link>
              </div>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswer