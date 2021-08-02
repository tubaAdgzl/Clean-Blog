const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

const app = express();

app.use(express.urlencoded({extended:true})) 
app.use(express.json())

app.set("view engine","ejs")

app.use(express.static("public"))

app.get("/", async (req,res) =>{
    const posts = await Post.find({})
    res.render('index', {
      posts
    });
})

app.get("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post',{
        post
    })
  });

app.get("/about",(req,res) =>{
    res.render("about")
})

app.get("/add",(req,res) =>{
    res.render("add_post")
})

app.post('/posts', async (req, res) => { 
    await Post.create(req.body)           
    res.redirect('/')
  });

const PORT = 3000;

app.listen(PORT,() =>{
    console.log(`Sunucu ${PORT} portunda başlatıldı`)
})