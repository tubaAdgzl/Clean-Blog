const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
const methodOverride = require('method-override')
const app = express();

app.use(express.urlencoded({extended:true})) 
app.use(express.json())

app.use(methodOverride('_method'));

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

app.get('/posts/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('edit', {
      post,
    });
});

app.put('/posts/:id', async (req,res) =>{
  const post = await Post.findOne({_id:req.params.id})
  post.title = req.body.title
  post.detail = req.body.detail
  post.save()

  res.redirect(`/posts/${req.params.id}`)
})

const PORT = 3000;

app.listen(PORT,() =>{
    console.log(`Sunucu ${PORT} portunda başlatıldı`)
})