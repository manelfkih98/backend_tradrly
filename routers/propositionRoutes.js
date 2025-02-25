const express=require("express")
const{addProposition,getAllPropositions,getPropositionById,updateProposition,deleteProposition} =require("../controllers/propositionController")
const route=express.Router()

route.post('/addprop',addProposition)

module.exports=route