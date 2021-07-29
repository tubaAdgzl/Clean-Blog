const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.set("view engine","ejs")

app.use(express.static("public"))

app.get("/",(req,res) =>{
    res.render("index")
})

app.get("/about",(req,res) =>{
    res.render("about")
})

app.get("/add",(req,res) =>{
    res.render("add_post")
})

const PORT = 3000;

app.listen(PORT,() =>{
    console.log(`Sunucu ${PORT} portunda başlatıldı`)
})