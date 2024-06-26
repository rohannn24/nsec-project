import express from 'express'
import { CheckUsername, GetStory, Getdata, Login, Register, updateUser } from '../Controller/user.contoller.js';
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.put('/update/:id', updateUser);
router.get('/get-data/:id', Getdata);
router.get('/get-story/:id', GetStory);
router.post('/check-username', CheckUsername);

export default router;