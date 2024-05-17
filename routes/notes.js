const notes = require("express").Router();
const {readFile, writeFile} = require("fs").promises;
const {v4: uuidv4} = require("uuid");

notes.get("/", (req, res) =>
    readFile("./db/db.json", "utf-8")
        .then((data) =>  res.json(JSON.parse(data)))
);

// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFile("./db/db.json", "utf-8")
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((notes) => notes.note_id === noteId);
            return result.length > 0
            ? res.json(result)
            : res.json("No note with that ID");
    });
});

 // DELETE Route for a specific note
 notes.delete("/:note_id", (req, res) => {
    const noteId = req.params.note_id;
    readFile("./db/db.json", "utf-8")
        .then((data) => JSON.parse(data))
        .then((json) => {
            // make a new array of all notes except the one with the ID provided in the URL
            const result = json.filter((notes) => notes.note_id !== noteId);
    
            // save that array to db.json
            writeFile("./db/db.json", result);
    
            // respond to the DELETE request
            res.json(`Note ${noteId} has been deleted`);
        });
  });
  
// POST Route for a new note
notes.post("/", (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
        // create a new object for saved note
        const newNote = {
            title,
            text,
            note_id: uuidv4()
        };
        
        // rewrite file with newNote object appended
        readFile("./db/db.json", "utf8")
            .then((data) => JSON.parse(data))
            .then((json) => {
                const parsedData = json;
                parsedData.push(newNote);
                writeFile("./db/db.json", JSON.stringify(parsedData));
                res.json("Note added successfully");
            })
            .catch((err) => console.log(err));
    } else {
        res.error("Error in adding note")
    }
});

module.exports = notes;