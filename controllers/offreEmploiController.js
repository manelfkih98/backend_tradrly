const OffreEmploi = require("../models/offreEmploi");
const Departement = require("../models/departement");

exports.addOffreEmploi = async (req, res) => {
  try {
    const { id_offre, titre, description, status, date_limite, departementId } =
      req.body;
    const departement = await Departement.findById(departementId);
    if (!departement) {
      return res.status(400).json({ message: "Département non trouvé" });
    }
    if (new Date(date_limite) <= new Date()) {
      return res
        .status(400)
        .json({ message: "La date limite doit être future." });
    }
    const newOffre = new OffreEmploi({
      id_offre,
      titre,
      description,
      status: status ?? true,
      date_limite,
      departement: departementId,
    });

    await newOffre.save();
    res
      .status(201)
      .json({ message: "Offre d'emploi ajoutée avec succès", newOffre });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
exports.getAllOffres = async (req, res) => {
  try {
    const offres = await OffreEmploi.find().populate("departement");
    res.status(200).json(offres);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
exports.getOffreById = async (req, res) => {
  try {
    const { id } = req.params;
    const offre = await OffreEmploi.findById(id).populate("departement");
    if (!offre) {
      return res.status(404).json({ message: "offre d'emploi non trouvée" });
    }

    res.status(200).json(offre);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur", error });
  }
};

exports.updateOffre = async (req, res) => {
  try {
    const { id } = req.params;
    const updateoffre = req.body;
    const offreUpdated = await OffreEmploi.findByIdAndUpdate(id, updateoffre, {
      new: true,
    });
    if (!offreUpdated) {
      return res.status(404).json({ message: "offre non trouvée" });
    }
    res
      .status(200)
      .json({ message: "offre mise à jour avec succeé", offreUpdated });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.deleteOffre = async (req, res) => {
    try {
        const { id } = req.params;
        const offreDeleted = await OffreEmploi.findByIdAndDelete(id);

        if (!offreDeleted) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }

        res.status(200).json({ message: "Offre supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

