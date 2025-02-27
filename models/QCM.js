const mongoose = require('mongoose');

const QCMSchema = new mongoose.Schema({
 
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }], 
  resulalt:{type:Number,require:true}
});

module.exports = mongoose.model('QCM', QCMSchema);
