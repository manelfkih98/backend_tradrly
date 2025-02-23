const express =require('express')
const {addDep,getAllDeps,getDepById,updateDep,deleteDep}=require("../controllers/departementControllr")
const auth = require('../middleware/auth');
const router=express.Router()

router.post('/add',auth,addDep)
router.get('/allDep',auth,getAllDeps)
router.get('/allDepById/:id',auth,getDepById)
router.put('/updateDep/:id',auth,updateDep)
router.delete('/deleteDep/:id',auth,deleteDep)
module.exports = router






