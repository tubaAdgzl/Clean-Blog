const express = require('express');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')

const app = express();

app.use(express.urlencoded({extended:true})) 
app.use(express.json())

app.use(methodOverride('_method',{
  methods:["POST","GET"]
}));

app.set("view engine","ejs")

app.use(express.static("public"))

app.get("/", postController.getAllPosts)
app.get("/posts/:id", postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost)
app.delete('/posts/:id', postController.deletePost)

app.get("/about", pageController.getAboutPage)
app.get("/add", pageController.getAddPage)
app.get('/posts/edit/:id', pageController.getEditPage);

const PORT = 3000;

app.listen(PORT,() =>{
    console.log(`Sunucu ${PORT} portunda başlatıldı`)
})