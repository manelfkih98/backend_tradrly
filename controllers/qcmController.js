const QCM= require("../models/QCM")
const question=require('../models/question')
const Departement=require('../models/departement')
const Post=require('../models/post');
const { all } = require("../routers/adminRoutes");

/*exports.generatQcm = async (req, res) => {
  try {

    const dep_name = req.body["dep_name "]?.trim();
    console.log("Corps de la requête :", dep_name);

    const departementFind = await Departement.findOne({ NameDep: dep_name });
    if (!departementFind) {
      return res.status(404).json({ message: "Département non trouvé." });
    }

   
   const questions = await question.aggregate([
      { $match: { departement: departementFind._id } },
      { $sample: { size: 3 } }
    ]);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "Aucune question trouvée pour ce département." });
    }

   
    const newQCM = new QCM({
      questions: questions.map(q => q._id),
      resultat: 0 
    });

    const savedQCM = await newQCM.save();
    const populatedQCM = await QCM.findById(savedQCM._id).populate("questions");

    res.status(201).json(populatedQCM);
  } catch (error) {
    console.error("Erreur lors de la création du QCM :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};*/

exports.generatQcm = async (req, res) => {
  try {
    const postId = req.params.postId; 
    
    if (!postId) {
      return res.status(400).json({ message: "L'ID du post est requis." });
    }
    const post = await Post.findById(postId).populate("jobId"); 
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé." });
    }


   const departementFind = await Departement.findById({_id:post.jobId.departement}); 
    if (!post) {
      return res.status(404).json({ message: "Département non trouvé pour ce post." });
    }

    
    const questions = await question.aggregate([
      { $match: { departement: departementFind._id } },
      { $sample: { size: 3 } }
    ]);

    if (!questions.length) {
      return res.status(404).json({ message: "Aucune question trouvée pour ce département." });
    }

    
    const newQCM = new QCM({
      post_id:postId,
      questions: questions.map(q => q._id),
      resultat: 0 
    });
    
    const savedQCM = await newQCM.save();
    const populatedQCM = await QCM.findById(savedQCM._id).populate("questions");

    res.status(201).json(populatedQCM);
  } catch (error) {
    console.error("Erreur lors de la création du QCM :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
exports.getAllQcm = async (req, res) => {
  try {
    const allQCM = await QCM.find().populate("post_id");

    if (!allQCM || allQCM.length === 0) {
      return res.status(404).json({ message: "Aucun QCM disponible." });
    }

    return res.status(200).json(allQCM);
  } catch (error) {
    console.error("Erreur lors de la récupération des QCM :", error);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
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

