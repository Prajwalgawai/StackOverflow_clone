import express from 'express';
import {AskQuestion,getAllquestions, deleteQuestion,voteQuestions} from '../controllers/Questions.js';
import auth from '../middleware/auth.js';

const router=express.Router();

router.post('/Ask',auth, AskQuestion);
router.get('/get', getAllquestions);
router.delete('/delete/:id',auth, deleteQuestion);
router.patch('/vote/:id',auth, voteQuestions);

export default router;