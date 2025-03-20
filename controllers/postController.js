const Post = require("../models/post");
const {google}=require("googleapis");
const fs=require("fs");
const path=require("path");
const multer=require("multer")
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const auth = new google.auth.GoogleAuth({
  keyFile: "C:/tradrly/meniproject.json",
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});
const drive = google.drive({ version: "v3", auth });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });

async function uploadFileToDrive(filePath, fileName) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "application/pdf",
        parents: ["1hoyiqu8KlpuRBfeka3CQG88XJG9AW_So"], 
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(filePath),
      },
    });

    
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

   
    const result = await drive.files.get({
      fileId: response.data.id,
      fields: "webViewLink",
    });

    return result.data.webViewLink;
  } catch (error) {
    console.error("Erreur lors de l'upload vers Google Drive:", error);
    throw error;
  }
}

exports.addPost = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Erreur lors de l'upload du fichier" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Le fichier CV est requis." });
      }

      const { name, email, number, niveau, jobId } = req.body;

      if (!name || !email || !number || !niveau || !jobId) {
        return res.status(400).json({
          message: "Tous les champs sont requis, y compris l'ID de l'offre d'emploi.",
        });
      }

      const filePath = req.file.path;
      const fileName = req.file.filename;

      
      const cv_url = await uploadFileToDrive(filePath, fileName);

      fs.unlinkSync(filePath);

      const password = generatePassword(12);

    
      const newPost = new Post({
        name,
        email,
        number,
        niveau,
        cv_url,
        jobId,
        password,
      });

      await newPost.save();

      res.status(201).json({
        message: "Candidature ajoutée avec succès",
        post: newPost,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de l'ajout de la candidature",
      error: error.message,
    });
  }
};
exports.getAllPost = async (req, res) => {
  try {
    const postes = await Post.find().populate("jobId");

    if (!postes || postes.length === 0) {
      return res.status(404).json({ message: "Aucune candidature trouvée" });
    }

    res.status(200).json(postes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getPostsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    const posts = await Post.find({ jobId });

    if (posts.length === 0) {
      return res.status(404).json({
        message: "Aucune candidature trouvée pour cette offre d'emploi.",
      });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des candidatures",
      error: error.message,
    });
  }
};

exports.refuser = async (req, res) => {
  try {
    const poste = await Post.findById(req.params.id).populate("jobId");
    if (!poste) {
      return res.status(404).json({ message: "Candidature non trouvée." });
    }
    if (!poste.jobId) {
      return res
        .status(404)
        .json({ message: "Offre d'emploi associée non trouvée." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manelfkih123@gmail.com",
        pass: "uwze prbc lohc kfzh",
      },
    });

    const mailOptions = {
      from: "manelfkih13@gmail.com",
      to: poste.email,
      subject: `Réponse à votre candidature pour le poste ${poste.jobId.titre}`,
      text: `Bonjour ${poste.name},

       Nous vous remercions de l'intérêt que vous portez à notre société « Tradrly » en postulant au poste de ${poste.jobId.titre}. Après une étude attentive de votre candidature, nous avons le regret de vous informer que nous ne pouvons pas y donner une suite favorable.

      Nous vous remercions néanmoins pour l’intérêt que vous portez à notre entreprise et vous souhaitons plein succès dans vos recherches.

      Cordialement,

      L'équipe de recrutement
      Tradrly`,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès!", info });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email", error });
  }
};

exports.accepter = async (req, res) => {
  try {
    const poste = await Post.findById(req.params.id).populate("jobId");
    if (!poste) {
      return res.status(404).json({ message: "Candidature non trouvée." });
    }
    if (!poste.jobId) {
      return res
        .status(404)
        .json({ message: "Offre d'emploi associée non trouvée." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manelfkih123@gmail.com",
        pass: "uwze prbc lohc kfzh",
      },
    });

    const mailOptions = {
      from: "manelfkih13@gmail.com",
      to: poste.email,
      subject: `Réponse à votre candidature pour le poste ${poste.jobId.titre}`,
      html: `Bonjour ${poste.name},<br><br>
      Nous vous remercions de l'intérêt que vous portez à notre société « Tradrly » en postulant au poste de ${poste.jobId.titre}. Après une étude attentive de votre candidature, nous avons le regret de vous informer que nous ne pouvons pas y donner une suite favorable.<br><br>
      Nous vous remercions néanmoins pour l’intérêt que vous portez à notre entreprise et vous souhaitons plein succès dans vos recherches.<br><br>
      Veuillez trouver ci-dessous votre mot de passe généré pour la plateforme Tradrly :<br><br>
      Mot de passe : ${poste.password}<br><br>
      <b>Cordialement,</b><br>
      L'équipe de recrutement<br>
      Tradrly<br><br>
      <a href="http://localhost:3000/" target="_blank">Cliquez ici pour accéder à votre test</a>`,
    };
    const info = await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Email d'acceptation envoyé avec succès!", info });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email", error });
  }
};

function generatePassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }
  return password;
}

exports.addPostWithoutOffre = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Le fichier CV est requis." });
    }

    const { name, email, number, niveau } = req.body;

    if (!name || !email || !number || !niveau ) {
      return res.status(400).json({
        message:
          "Tous les champs sont requis, y compris l'ID de l'offre d'emploi.",
      });
    }

    const cv_url = `/uploads/${req.file.filename}`;
    const password = generatePassword(12);

    const newPost = new Post({
      name,
      email,
      number,
      niveau,
      cv_url,
      password
      
    });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Candidature ajoutée avec succès", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de l'ajout de la candidature",
      error: error.message,
    });
  }
};

exports.getPostWithoutOffre = async (req,res)=>
{
  try{
    const PostWithoutOffre =await Post.find({jobId:null})
    if(PostWithoutOffre.length==0)
    {
      res.status(400).json({message:"aucune post WithoutOffre "})
    }
    res.status(200).json({post:PostWithoutOffre})
  }catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de l'ajout de la candidature",
      error: error.message,
    })

}}
