import express from "express";
import {login, signup} from '../controllers/auth.js';
import {getAllUsers,updateProfile, getUser} from '../controllers/users.js';
const router=express.Router();

router.post('/signup', signup);  
router.post('/login', login);

router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:id', getUser);
router.patch("/update/:id",  updateProfile);
export default router;
