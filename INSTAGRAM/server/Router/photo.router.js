import express from 'express'
import { AddLike, AddPhoto, Getpost } from '../Controller/photo.controller.js';
const router = express.Router();

router.post('/add-photo', AddPhoto);
router.post('/like', AddLike);
router.get('/getpost/:id', Getpost);


export default router;