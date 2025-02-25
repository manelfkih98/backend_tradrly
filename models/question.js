const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  reponse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reponse", 
  },
  propositions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "proposition",
    },
  ],
});

module.exports = mongoose.model("question", questionSchema);
