require("dotenv").config();
const express =require("express")
const connectDB = require ('./config/database')
const cors = require('cors')
const adminRoutes = require("./routers/adminRoutes");
const departRoutes= require("./routers/departementRoutes")
const offreRoutes=require("./routers/offreRoutes")
const articleRoutes=require('./routers/articleRoutes')
const postRoutes=require("./routers/postRoutes")
const projectRoutes =require("./routers/projectRoutes")
const reponceRoutes=require("./routers/reponceRoutes")
const propoRoutes=require("./routers/propositionRoutes")
const questionRoutes=require('./routers/questionRoutes')
const qcmRoutes=require('./routers/qcmRoutes')
const app= express();


app.use(cors())
app.use(express.json())
connectDB();
const PORT = process.env.PORT || 3000;

app.use("/project",projectRoutes)
app.use("/admin", adminRoutes);
app.use("/depart",departRoutes)
app.use("/offreEmploi",offreRoutes)
app.use("/article",articleRoutes)
app.use("/post",postRoutes)
app.use("/reponce",reponceRoutes)
app.use("/propos",propoRoutes)
app.use("/question",questionRoutes)
app.use('/qcm',qcmRoutes)
//app.use('/uploads', express.static('uploads'));

 

app.listen(PORT, () => {
    console.log(` Serveur démarré sur le port ${PORT}`);
});


