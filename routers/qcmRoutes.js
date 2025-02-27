const express=require('express')
const {generatQcm,updateResultat}=require('../controllers/qcmController')
const router=express.Router()


router.post('/generatQcm',generatQcm)
router.put('/updateResultat/:id',updateResultat)


module.exports=router