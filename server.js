const express = require("express")
const app = express()
const fs = require("fs")
const uniqid = require("uniqid")
const PORT = process.env.PORT || 3001

// Set up static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// GET the index html 
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
    })
    

// GET the notes html
app.get("/notes", (req,res) => {
    res.sendFile(__dirname + "/public/notes.html")
})

// Getting the notes
app.get("/api/notes", (req,res) => {
    fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.log(err)
        }
        else {
            return res.json(JSON.parse(data))
        }      })
})

// // Saving the notes
app.post("/api/notes", (req, res) => {
    fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
        }
        else {
            const db = JSON.parse(data)
            const notesData = req.body
            const id = "id"
            const noteId = uniqid()
            notesData[id] = noteId
            db.push(notesData)
            fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    return res.json(db)
                }
            })
        }      })
})


app.delete("/api/notes/:id", (req,res) => {
    fs.readFile('db/db.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
        }
        else {
const db = JSON.parse(data)
const noteId = req.params.id
for (let i = 0; i < db.length; i++) {
    if ( noteId == db[i].id) {
        db.splice([i],1)
        fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
            if (err) {
                console.log(err)
            } else {
                return res.json(db)
            }})}}
        }
    })})


app.listen(PORT, function(){
    console.log(`Listening on http://localhost:${PORT}`)
})




//DONE 
// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page


// TO DO 
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
// ```