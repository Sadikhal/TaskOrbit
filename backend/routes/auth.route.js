import express from 'express';
import { getUser, login, logOut, register, updateUser } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlware/verifyToken.js';

const router = express.Router();

//register the user
router.post('/register', register);

//login the user
router.post('/login', login);

//logout the user
router.post('/logout', logOut);

//get the single user
router.get('/user', verifyToken, getUser); 

//update the user
router.put('/user/update', verifyToken, updateUser); 


export default router;
