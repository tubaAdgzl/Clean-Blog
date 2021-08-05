const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')
const mongoose = require('mongoose');
const app = express();

//MongoDB
mongoose.connect("mongodb+srv://tubaAdgzl:TNe8UQr0VHQGz6fa@cleanblog-db.sh1zc.mongodb.net/cleanblog-db?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
}).then(()=>{
  console.log("DB CONNECTED")
}).catch((err)=>{
  console.log(err) 
})


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

const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log(`Sunucu ${PORT} portunda başlatıldı`)
})