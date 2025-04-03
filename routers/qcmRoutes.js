const express=require('express')
const {generatQcm,updateResultat,getAllQcm}=require('../controllers/qcmController')
const router=express.Router()


router.post('/generatQcm/:postId',generatQcm)
router.put('/updateResultat/:id',updateResultat)
router.get('/allQcm',getAllQcm)


module.exports=router