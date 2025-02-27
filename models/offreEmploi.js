const mongoose =require('mongoose')

const offreEmploiShema=new mongoose.Schema({

  titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true 
    },
    date_publi: {
        type: Date,
        default: Date.now
    },
    date_limite: {
        type: Date,
        required: true
    },
    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departements',
        required: true
    }
}, { timestamps: true });

const OffreEmploi = mongoose.model('offreemplois', offreEmploiShema);
module.exports = OffreEmploi;
