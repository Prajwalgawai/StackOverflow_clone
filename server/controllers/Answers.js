import mongoose from 'mongoose';
import Questions from '../models/Questions.js';
import users from '../models/auth.js';

export const postAnswer = async (req, res) => {
    const { id:_id } = req.params;                //id is the question id.
   
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
    
    // console.log("quest'n id is :"+_id);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
  await  updateNoOfQuestions(_id, noOfAnswers);
 
    try {
      await updateAnswerCount(_id,userId, "increase_count");
      // console.log("user id is :"+JSON.stringify(req.body));
      const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
        $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
      });

      // console.log(updatedQuestion);
      res.status(200).json(updatedQuestion);
    } catch (error) {
      res.status(400).json('error in updating');
    }
  };

export const updateNoOfQuestions=async(_id, noOfAnswers)=>{
 try{
    await Questions.findByIdAndUpdate(_id, {$set:{'noOfAnswers':noOfAnswers}});
 }catch(error){
console.log(error);
 }
}

export const updateAnswerCount=async(question_Id,userId, operation)=>{   //_id is a question id.
  try{
const {answers}=await users.findById({_id:userId});
let result=0;
if(operation=="increase_count"){
  //  result=await users.findByIdAndUpdate({_id:userId}, {$set:{'answers':answers+1}}, {new:true});
  const temp_answers=await users.findById({_id:userId});
  // console.log("updated ans count array"+temp_answers?.answers);
  let a=0;
  temp_answers?.answers.map((ele)=>{
    if(ele.question_id===question_Id){
      a=1;
    }
  })
  if(a===0){
    const result=await users.findByIdAndUpdate({_id:userId}, {$addToSet:{answers:[{question_id:question_Id}]}}, {new:true});
    // console.log("new answers updated "+result);
  }

}else if(operation=="decrease_count"){
  result=await users.findByIdAndUpdate({_id:userId}, {$pull:{'answers':{question_id:question_Id}}}, {new:true});
  // console.log("answers from user auth deleted "+result);
  //  result=await users.findByIdAndUpdate({_id:userId}, {$set:{'answers':answers-1}}, {new:true});
}
// console.log("updated ans count"+result);
  }catch(error){
console.log(error);
  }
}



export const deleteAnswer=async(req, res) =>{
const {id:_id}=req.params;                    //id is question_id
const {answerId, noOfAnswers,userId}=req.body;
// console.log('deleted que id is '+_id);
if(!mongoose.Types.ObjectId.isValid(_id)){
  return res.status(404).send('question unavailable...');
}
if(!mongoose.Types.ObjectId.isValid(answerId)){
  return res.status(404).send('Answer unavailable...');
}
updateNoOfQuestions(_id, noOfAnswers);
await updateAnswerCount(userId, "decrease_count");
try{

  await Questions.updateOne(
    {_id}, 
    {$pull:{'answer':{_id:answerId}}}
  )
  res.status(200).json({message:"Successfully deleted..."})
}catch(error){
  res.status(405).json(error);
}
}