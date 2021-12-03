// Routing for the /generation routes
//
// Imported by the index.js file in the app folder

const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({ generation: req.app.locals.generationEngine.generation });
});

module.exports = router;