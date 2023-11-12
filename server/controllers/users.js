import mongoose from 'mongoose';
import User from '../models/auth.js';

export const getAllUsers=async(req,res)=>{
    try{
        const allUsers=await User.find();
        const allUserDetails=[];
        allUsers.forEach(users=>{
            allUserDetails.push({_id:users._id, name:users.name, about:users.about, tags:users.tags, joinedOn:users.joinedOn});
        })
        res.status(200).json(allUserDetails);
    }catch(error){
       res.status(404).json({message:error.message});
    }
}

export const updateProfile=async(req, res)=>{
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
    
console.log("name about id and tags is :"+name+" "+about+" "+_id+" "+tags);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try{
        const updatedProfile=await User.findByIdAndUpdate(_id, {$set:{'name':name, 'about':about, 'tags':tags}}, {new:true})//if we dont write new:true, then it will return the older record even though it will update the record in the database.
        res.status(200).json(updateProfile);
    }catch(error){

res.status(405).json({message:error.message});
    }
}