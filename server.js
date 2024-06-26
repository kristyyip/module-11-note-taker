// import necessary modules
const express = require("express");
const path = require("path");
const api = require("./routes/index.js")

const app = express();

const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/api", api)

// GET route for notes page
app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET wildcard route to direct users to index.html otherwise
app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);