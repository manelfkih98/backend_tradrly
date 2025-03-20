const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    jobId: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'offre', 
       
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, ]
    },
    number: {
        type: String,
        required: true
    },
    niveau: {
        type: String,
        required: true,
       
    },
    cv_url: {
        type: String,
        required: true
    },
      password:{type:String,require}
    
}, { timestamps: true });  

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
