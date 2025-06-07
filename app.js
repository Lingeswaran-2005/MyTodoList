const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const getConnection = require("./db")
const Note = require("./models/Notes")

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

getConnection();

app.get("/notes",async(req,res)=>{
    const allnotes = await Note.find()
    res.status(200).json(allnotes)
})

app.post("/notes", async (req,res)=>{
    const {title,content} = req.body
    const newnote =new Note({title,content});
    await newnote.save() 
    res.status(200).json({message:"Successfully saved"})
})

app.delete("/notes/:title", async(req,res)=>{
    const result = await Note.deleteOne({title : req.params.title})
    console.log(result)

    res.status(200).json({message:"deleted"})
})

app.listen(5000,()=>{
    console.log("http://localhost:5000")
})