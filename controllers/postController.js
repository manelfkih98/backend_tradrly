const Post = require("../models/post");
//const upload = require("../middleware/upload");
exports.addPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Le fichier CV est requis." });
    }

    const { name, email, number, niveau, jobId } = req.body;

    if (!name || !email || !number || !niveau || !jobId) {
      return res
        .status(400)
        .json({
          message:
            "Tous les champs sont requis, y compris l'ID de l'offre d'emploi.",
        });
    }

    const cv_url = `/uploads/${req.file.filename}`;

    const newPost = new Post({ name, email, number, niveau, cv_url, jobId });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Candidature ajoutée avec succès", post: newPost });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Erreur lors de l'ajout de la candidature",
        error: error.message,
      });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const Postes = await Post.find();
    if (!Postes) {
      return res.status(404).json({ message: "les poste non trouvée " });
    }
    res.status(200).json(Postes);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur", error });
  }
};
exports.getPostsByJobId = async (req, res) => {
    try {
        const { jobId } = req.params;

      
        const posts = await Post.find({ jobId });

        if (posts.length === 0) {
            return res.status(404).json({ message: "Aucune candidature trouvée pour cette offre d'emploi." });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des candidatures", error: error.message });
    }
};