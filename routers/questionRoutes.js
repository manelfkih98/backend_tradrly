const express=require('express')
const {addQuestion,getAllQuestion}=require('../controllers/questionController')
const router=express.Router()


router.post('/addQuestion',addQuestion)
router.get('/getAllQuestion',getAllQuestion)


module.exports=router