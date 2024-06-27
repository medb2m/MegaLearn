import express from 'express'
import { addMessage , getMessages } from '../controllers/chat.controller.js'
import authorize from '../_middleware/authorize.js'

const router = express.Router()

router.post('/add', authorize(), addMessage)
router.get('/claim/:claimID', authorize(), getMessages)

export default router;