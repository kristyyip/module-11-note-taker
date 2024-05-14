// import necessary modules
const express = require("express");
const {readFile, writeFile} = require("fs").promises;
const path = require("path");

const app = express();

const PORT = 3001;

app.use(express.static("public"));

app.get("/", (req, res) => 
    console.log(res)
);

app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);