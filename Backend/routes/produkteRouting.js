const express = require('express');
// Create a router instance
var router = express.Router();

router.get("/produkte/alle", (req, res) => {
    //Hier muss nun jedes Produkt mit seinen Inhalten von der Db geladen werden und die Inhalte in JSON an die Produkt.js geschickt werden.
    res.send("Alle Produkte laden");
  });

module.exports = router;