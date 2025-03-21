const express = require("express");
const upload = require("../middleware/upload"); 
const { addPost,getAllPost,getPostsByJobId,refuser,accepter,addPostWithoutOffre,getPostWithoutOffre } = require("../controllers/postController");

const router=express.Router()


router.post("/addPost", addPost);
 router.get("/getAll",getAllPost)
 router.get("/postByOffre/:jobId",getPostsByJobId)
 router.post("/refuser/:id",refuser)
 router.post("/accepter/:id",accepter)
 router.post("/addPostWithoutOffre",upload.single("cv"),addPostWithoutOffre)
 router.get('/postWithoutOffre',getPostWithoutOffre)



module.exports=router