import express from 'express'
import { Addstory } from '../Controller/story.controller.js'
const router = express.Router()

router.post('/add-story', Addstory)


export default router