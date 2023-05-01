const express = require('express');
// Create a router instance
var router = express.Router();

/*
router.patch("/produktverwaltung/aendern", (req, res) =>{
  res.status(200).send("Neues Produkt wurde hinzugefuegt");
});

router.delete("/produktverwaltung/loeschen", (req, res) =>{ 
  res.status(200).send("Produkt würde geloescht");
});

router.post("/produktverwaltung/hinzufuegen", (req, res) =>{ 
  res.status(200).send("Produkt wurde hinzugefuegt");
});*/

router.get("/produktverwaltung", (req, res) => {
  res.status(200).send("Alle Produkte wurden geladen");
});

module.exports = router;