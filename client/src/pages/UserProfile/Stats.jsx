import React from 'react'
import {useDispatch, useSelector} from "react-redux";



const Stats = () => {
const dispatch=useDispatch();
const User = useSelector((state) => state.currentUserReducer);
let answer_score=useSelector((state)=>state.getUser);
answer_score=answer_score?.data?.answers;
answer_score=answer_score?.length;
let  question_score=useSelector((state)=>state.questionVoteScore);
question_score=question_score.data;
console.log("ans -socre is "+answer_score);

const points=parseInt(question_score+(parseInt(answer_score/5))*5);
const questionsList=useSelector(state=>state.questionsReducer);
// const noOfHonourBadges=parseInt(answer_score/5);
// const noOfSilverBadges=parseInt(noOfHonourBadges/10);                  //10 honour badge=1 silver badge.
// const noOfGoldBadges=parseInt(noOfSilverBadges/10);                       //10 silver badge=1 gold badge.


// console.log("answer score and question score is "+JSON.stringify(question_score.data)+" and "+JSON.stringify(answer_score?.length));

  return (
    <div className='stats-div'>
          <h1>stats</h1>
          <div className='stats-div-main'>
   <div className='stats-div-1'>
   <div className='stats-sub-div-2'>
    <h3>{points}</h3>
    <p>points</p>
    </div>
    <div className='stats-sub-div-2'>
    <h3>4453</h3>
    <p>reached</p>
    </div>
   </div>
       <div className='stats-div-1'>
       <div className='stats-sub-div-2'>
    <h3>{answer_score}</h3>
    <p>answers</p>
    </div>
    <div className='stats-sub-div-2'>
    <h3>{questionsList.data.length}</h3>
    <p>questions</p>
    </div>
       </div>
       </div>
    
    </div>
  )
}

export default Stats