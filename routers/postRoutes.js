const express = require("express");
const upload = require("../middleware/upload"); 
const { addPost,getAllPost,getPostsByJobId,refuser,accepter,addPostWithoutOffre,getPostWithoutOffre ,refuserDemande,accepterDemande} = require("../controllers/postController");

const router=express.Router()


router.post("/addPost", addPost);
 router.get("/getAll",getAllPost)
 router.get("/postByOffre/:jobId",getPostsByJobId)
 router.post("/refuser/:id",refuser)
 router.post("/accepter/:id",accepter)
 router.post("/addPostWithoutOffre",addPostWithoutOffre)
 router.get('/postWithoutOffre',getPostWithoutOffre)
 router.post("/refuserDemande/:id",refuserDemande)
 router.post("/accepterDemande/:id",accepterDemande)




module.exports=router