const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

// Inscription d'un administrateur
const registerAdmin = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email déjà utilisé !" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ fullName, email, password: hashedPassword });
        await newAdmin.save();

        // Création du token JWT
        const token = jwt.sign(
            { id: newAdmin._id, email: newAdmin.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "Admin inscrit avec succès !", token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Connexion d'un administrateur
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin non trouvé !" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect !" });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { registerAdmin, loginAdmin };
