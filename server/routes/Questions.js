import express from 'express';
import {AskQuestion,getAllquestions, getMyquestions,deleteQuestion,voteQuestions,countUpvotedQuestions} from '../controllers/Questions.js';
import auth from '../middleware/auth.js';

const router=express.Router();

router.post('/Ask',auth, AskQuestion);
router.get('/get', getAllquestions);
router.get('/get/:que_id', getMyquestions);
router.delete('/delete/:id',auth, deleteQuestion);
router.patch('/vote/:id',auth, voteQuestions);
router.get('/getVoteCount/:userId', auth, countUpvotedQuestions);
export default router;