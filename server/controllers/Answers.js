import mongoose from 'mongoose';
import Questions from '../models/Questions.js';


export const postAnswer = async (req, res) => {
    const { id:_id } = req.params;
   
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
    
    // console.log("quest'n id is :"+_id);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
  await  updateNoOfQuestions(_id, noOfAnswers);
    try {
      console.log("user id is :"+JSON.stringify(req.body));
      const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
        $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
      });

      console.log(updatedQuestion);
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

export const deleteAnswer=async(req, res) =>{
const {id:_id}=req.params;
const {answerId, noOfAnswers}=req.body;
console.log('deleted que id is '+_id);
if(!mongoose.Types.ObjectId.isValid(_id)){
  return res.status(404).send('question unavailable...');
}
if(!mongoose.Types.ObjectId.isValid(answerId)){
  return res.status(404).send('Answer unavailable...');
}
updateNoOfQuestions(_id, noOfAnswers);
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