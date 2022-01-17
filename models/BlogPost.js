const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title:{
        type:String,
        required:[true,"Please Provide a Title"]
    },
    body:{
        type:String,
        required:[true, "Please Provide a Body"]
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    datePosted: {
        type:Date,
        default: new Date()
    },
    image:{
        type:String,
    }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;