const router = require("express").Router();

// import our modular routers
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;