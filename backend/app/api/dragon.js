// Routing for the /dragon routes
//
// Imported by the index.js file in the app folder

const {Router} = require('express');

const router = Router();

router.get("/new", (req, res) => {
    res.json({ dragon: req.app.locals.generationEngine.generation.newDragon() });
});

module.exports = router;