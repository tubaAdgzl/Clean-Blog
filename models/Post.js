const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/cleanblog-test-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

//create schema 
const PostSchema = new Schema({
    title:String,
    detail:String,
    dateCreated:{
        type:Date,
        default:Date.now
    },
})

const Post = mongoose.model("Post",PostSchema)

module.exports = Post;