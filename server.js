const express = require("express");

const app = express();

const PORT = 3001;

app.use(express.static("public"));

app.get("/", (req, res) => console.log(res));

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);