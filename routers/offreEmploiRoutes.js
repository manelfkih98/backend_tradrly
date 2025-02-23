const express = require('express');

const { addOffreEmploi,getAllOffres,getOffreById ,updateOffre,deleteOffre} = require('../controllers/offreEmploiController');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/add',auth, addOffreEmploi);
router.get('/all',auth, getAllOffres);
router.get('/offreById/:id',auth, getOffreById);
router.put('/update/:id', auth, updateOffre);
router.delete('/delete/:id', auth, deleteOffre);

module.exports = router;
