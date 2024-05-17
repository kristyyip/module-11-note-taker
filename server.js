// import necessary modules
const express = require("express");
const {readFile, writeFile} = require("fs").promises;
const path = require("path");
const api = require("./routes/index.js")

const app = express();

const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/api", api)

app.get("/", (req, res) => 
    console.log(res)
);

app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);