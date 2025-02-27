const QCM= require("../models/QCM")
const question=require('../models/question')


exports.generatQcm = async (req, res) => {
    try {
      
      const questions = await question.aggregate([{ $sample: { size: 3 } }]);
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: "Aucune question trouvée." });
      }
      const newQCM = new QCM({
        questions: questions.map(q => q._id) ,
        resulalt:0
      });
  
      const savedQCM = await newQCM.save();
      const populatedQCM = await QCM.findById(savedQCM._id).populate("questions");
  
      res.status(201).json(populatedQCM);
    } catch (error) {
      console.error("Erreur lors de la création du QCM :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  exports.updateResultat = async (req, res) => {
    try {
      const { id } = req.params;
      const { resultatQcm } = req.body;
      const qcm = await QCM.findByIdAndUpdate(id, { $set: { resulalt: resultatQcm } }, { new: true });
  
      if (!qcm) {
        return res.status(404).json({ message: "QCM non trouvé" });
      }
      return res.status(200).json({ message: "QCM mis à jour avec succès", qcm });
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

