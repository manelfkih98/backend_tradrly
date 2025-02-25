const express = require('express');

const { addOffreEmploi,getAllOffres,getOffreById ,updateOffre,deleteOffre} = require('../controllers/offreEmploiController');
//const auth = require('../middleware/auth');
const router = express.Router();
router.post('/add', addOffreEmploi);
router.get('/all', getAllOffres);
router.get('/offreById/:id', getOffreById);
router.put('/update/:id', updateOffre);
router.delete('/delete/:id', deleteOffre);

module.exports = router;
