const notes = require("express").Router();
const {readFile, writeFile} = require("fs").promises;

notes.get("/notes", (req, res) =>
    readFile("./db/db.json", "utf-8")
        .then((data) => res.json(data))
);