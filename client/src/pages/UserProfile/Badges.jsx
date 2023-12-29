import React from 'react'
import {useDispatch, useSelector} from "react-redux";
const Badges = () => {

  const dispatch=useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  let answer_score=useSelector((state)=>state.getUser);
  // alert((JSON.stringify(answer_score)));

  answer_score=answer_score?.data?.answers;
  answer_score=answer_score?.length;
  let  question_score=useSelector((state)=>state.questionVoteScore);
  question_score=question_score.data;
  
  
  let theme=useSelector((state)=>state.fetchWeather);
  // theme="light";
  theme=theme?.data;
  
  

  const noOfHonourBadges=parseInt(answer_score/5);
  const noOfSilverBadges=parseInt(noOfHonourBadges/10);                  //10 honour badge=1 silver badge.
  const noOfGoldBadges=parseInt(noOfSilverBadges/10);                    //10 silver badge=1 gold badge.

  

  return (
    <div className={`${theme!=="dark"?'badges':'badges-dark'}`}>
<h1>Badges</h1>
<div className='badges-div'>

    <div className='badges-sub-div'>
        <img src="/gold_badge.webp" alt="img error" height="48px" width="53px"/>
        <div className='badges-sub-div-2 badge1'>
<h2>{noOfGoldBadges}</h2>
    <p>gold badges</p>
        </div>
    </div>
    <div className='badges-sub-div badge2'>
    <img src="/silver_badge.webp" alt="img error" height="48px" width="50px"/>
    <div className='badges-sub-div-2'>
    <h2>{noOfSilverBadges}</h2>
    <p>silver badges</p>
    </div>
    </div>

    <div className='badges-sub-div badge3'>
    <img src="/honour_badge.webp" alt="img error" height="48px" width="53px"/>
    <div className='badges-sub-div-2'>
    <h2>{noOfHonourBadges}</h2>
    <p>honour badges</p>
    </div>
 
    </div>
   
  
   
</div>
    </div>
  )
}

export default Badges;