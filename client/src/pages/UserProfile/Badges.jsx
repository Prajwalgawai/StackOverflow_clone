import React, {useState} from 'react'
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
  
  

  const noOfHonourBadges=parseInt(parseInt(answer_score/5)+(question_score/100));  //5 answers=1 badge.
  const noOfSilverBadges=parseInt(noOfHonourBadges/10);                  //10 honour badge=1 silver badge.
  const noOfGoldBadges=parseInt(noOfSilverBadges/10);                    //10 silver badge=1 gold badge.

  const [instruction, setInstructions]=useState(false);
  

  function showInstructions(){
    if(instruction){
      setInstructions(false);
    }else{
      setInstructions(true);
    }
  }

  return (
    <div className={`${theme!=="dark"?'badges':'badges-dark'}`}>
<h1>Badges</h1><p style={{marginBottom:"3px"}} onClick={()=>{
  showInstructions();
}}>{instruction===false?"How to get Badges 🔗":"click 🔗 to see badges"}</p>
{instruction===true?<div style={{width:"100%" ,marginBottom:"3px"}}>
  <ul>
  <li>if user post a question and receives at least 5 upvotes then he will get 10 points. </li>
  <li>if user get's total 100 points on questions then he be awarded with 1 honour badge. </li>
  <li>if user answered 5 questions then he will get 1 honour badge. </li>
  <li>1 silver badge=10 honour badges. </li>
  <li>1 gold badge=10 silver badges. </li>
  </ul>
</div>:<div className='badges-div'>

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



</div>}

    </div>
  )
}

export default Badges;