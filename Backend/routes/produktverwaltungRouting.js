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


router.post("/produktverwaltung/hinzufuegen", productAdd(req,res));

const productAdd = (req, res) =>
{

  try
  {
    const name = req.body.name;
    const text = req.body.text;
  }

  catch
  {

  }
  res.status(200).send("Produkt wurde hinzugefuegt");
}
*/

module.exports = router;