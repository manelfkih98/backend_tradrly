const express = require("express");
const upload = require("../middleware/upload"); 
const { addPost,getAllPost,getPostsByJobId,refuser,accepter } = require("../controllers/postController");

const router=express.Router()


router.post("/addPost", upload.single("cv"), addPost);
 router.get("/getAll",getAllPost)
 router.get("/postByOffre/:jobId",getPostsByJobId)
 router.post("/refuser/:id",refuser)
 router.post("/accepter/:id",accepter)


module.exports=router