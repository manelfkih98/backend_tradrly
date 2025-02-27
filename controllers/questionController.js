const question = require("../models/question");
const Departement=require("../models/departement")

//add question sont creation les collection reponse et proposition
exports.addQuestion = async (req, res) => {
    try {
      const { questionText, reponse, propositions ,departement_name} = req.body;
  
     
      if (!questionText || !reponse || !departement_name) {
        return res.status(400).json({ message: "Tous les champs sont requis et les propositions doivent être un tableau." });
      }
      const departement = await Departement.findOne({
        NameDep: departement_name,
      });
      if (!departement) {
        return res.status(400).json({ message: "Département non trouvé" });
      }
      const newQuestion = new question({ questionText, reponse, propositions,departement:departement.id });
      const savedQuestion = await newQuestion.save(); 
      res.status(201).json({ message: "Question ajoutée avec succès", question: savedQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de l'ajout de la Question",
        error: error.message,
      });
    }
  };

  exports.getAllQuestion=async(req,res)=>
  {
    try {
      const questions = await question.find();
      res.json(questions);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }

  }
  
  /*exports.addQuestion = async (req, res) => {
    try {
      const { questionText, reponsee, propositions } = req.body;
  
     
      if (!questionText || !reponsee ) {
        return res.status(400).json({ message: "Tous les champs sont requis et les propositions doivent être un tableau." });
      }
      const existingReponse = await reponse.findById(reponse);
      if (!existingReponse) {
        return res.status(404).json({ message: "Réponse non trouvée" });
      }
      const existingPropositions = await proposition.find({ _id: { $in: propositions } });
      if (existingPropositions.length !== propositions.length) {
        return res.status(404).json({ message: "Une ou plusieurs propositions sont introuvables" });
      }
      const newQuestion = new question({ questionText, reponsee, propositions });
      const savedQuestion = await newQuestion.save(); 
  
      res.status(201).json({ message: "Question ajoutée avec succès", question: savedQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de l'ajout de la Question",
        error: error.message,
      });
    }
  };*/
  
