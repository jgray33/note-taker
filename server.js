const express = require("express")
const app = express()


app.use(express.static('public'));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
    })
    
app.get("/notes", (req,res) => {
    res.sendFile(__dirname + "/public/notes.html")
})

app.listen(3000, function(){
    console.log("Listening")
})