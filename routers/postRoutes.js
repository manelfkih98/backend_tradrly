const express = require("express");
const upload = require("../middleware/upload"); 
const { addPost,getAllPost,getPostsByJobId } = require("../controllers/postController");

const router=express.Router()


router.post("/addPost", upload.single("cv"), addPost);
 router.get("/getAll",getAllPost)
 router.get("/postByOffre/:jobId",getPostsByJobId)


module.exports=router