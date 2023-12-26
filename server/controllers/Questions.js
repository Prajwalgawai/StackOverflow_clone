import Questions from '../models/Questions.js';
import mongoose from 'mongoose';

export const AskQuestion=async(req, res)=>{
    const postQuestionData=req.body;
// console.log(postQuestionData);
    const postQuestion=new Questions(postQuestionData);   
    try{
        await postQuestion.save();
        res.status(200).json("Posted a question successfully");
    }catch(error){
        console.log(error);
        res.status(409).json("Could'n post a new question");
    }
}

export const getAllquestions=async(req, res)=>{
try{
const questionList=await Questions.find();
res.status(200).json(questionList);
}catch(error){
res.status(404).json({message:error.message});
}
}

export const getMyquestions=async(req, res)=>{
    try{
        const { que_id: _id } = req.params;
// console.log("user id for my quesitnos is +"+que_id);
    const questionList=await Questions.find({userId:_id});
    // console.log(questionList);
    res.status(200).json(questionList);
    }catch(error){
    res.status(404).json({message:error.message});
    }
    }


export const deleteQuestion=async(req, res)=>{

    const { id: _id } = req.params;
// console.log(_id);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try{
const deleted_one=await Questions.findByIdAndDelete(_id);
// console.log("deleted one is :"+deleted_one);

res.status(200).json({message:"sucessfully deleted..."});
    }catch(error){
        console.log(error);
res.status(404).json({message:error.message});
    }
}




export const voteQuestions=async(req, res)=>{
    const {id:_id}=req.params;
    const {value, userId}=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...');
    }

    try{
    const question=await Questions.findById(_id);
    const upIndex=question.upVote.findIndex((id)=>id===String(userId));
    const downIndex=question.downVote.findIndex((id)=>id===String(userId));
    // console.log("value of value is :"+value);

    if(value==='upVote'){
        if(downIndex !==-1){
            question.downVote=question.downVote.filter((id)=>id!==String(userId))
        }
        if(upIndex===-1){
            question.upVote.push(userId);
        }else{
            question.upVote=question.upVote.filter((id)=>id!==String(userId));
        }
    }else if(value==='downVote'){
        if(upIndex !==-1){
            question.upVote=question.upVote.filter((id)=>id!==String(userId))
        }
        if(downIndex===-1){
            question.downVote.push(userId);
        }else{
            question.downVote=question.downVote.filter((id)=>id!==String(userId));
        }
    }

    const result=await Questions.findByIdAndUpdate(_id, question);
    // console.log(result);
    res.status(200).json({message:'voted successfully...'});
        }catch(error){
        
    res.status(404).json({message:"id not found"});
    }
}

export const countUpvotedQuestions=async(req, res)=>{
const {userId}=req.params;
// console.log("inside countupvotedquestions📌");
try{
    let count=0;
    const result=await Questions.find({"userId":userId});
    // console.log("countupvoted questions is "+result);
    result.map((ele)=>{
        // console.log(ele.upVote.length-ele.downVote.length);
        if((ele.upVote.length-ele.downVote.length)>=5){
            count=count+1;
        }
    })
    count=count*10;
res.status(201).json({data:count});
}catch(error){
res.status(404).json({message:"error in question_countUpvoted"});
}
}