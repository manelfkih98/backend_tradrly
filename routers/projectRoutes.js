const express  = require('express')
const {addProject}=require("../controllers/projectController")
const router =express.Router()
  

router.post("/addpost",addProject)



module.exports=router
