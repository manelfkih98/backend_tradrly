const project =require('../models/project')
const departements=require('../models/departement')


exports.addProject = async (req, res) => {
    try {
        const { name_project, description_project, departementId } = req.body;
    

      
        if (!name_project || !description_project || !departementId) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const departement = await departements.findById(departementId);
        if (!departement) {
            return res.status(400).json({ message: "Département non trouvé." });
        }

       
        const newProject = new project({ name_project, description_project, departementId });
        await newProject.save();

        res.status(201).json({ message: "Projet ajouté avec succès.", newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'insertion du projet.", error: error.message });
    }
};
