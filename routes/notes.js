const { parse } = require("path");

const notes = require("express").Router();
const {readFile, writeFile} = require("fs").promises;

notes.get("/", (req, res) =>
    readFile("./db/db.json", "utf-8")
        .then((data) => res.json(JSON.parse(data)))
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

module.exports = notes;