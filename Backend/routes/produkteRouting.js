const express = require('express');
const ProduktDao = require('../dao/produktDao.js');
// Create a router instance
let router = express.Router();

//Rouer um alle Produkte zu laden
router.get("/produkte/alle", (req, res) => 
{
    const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      let arr = prodDao.loadAll();
      console.log(arr.length);
      console.log(JSON.stringify(arr));
      res.status(200).json(arr); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

//Router um alle vorhanden Id`s zu bekommen
router.get("/produkte/id/alle", (req,res) =>
{
  const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      let arr = prodDao.loadAllId();
      console.log(arr.length);
      console.log(JSON.stringify(arr));
      res.status(200).json(arr); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

//Produkte bestandsmenge mit einer bestimmten id ändern
router.patch('/produkte/aendern/:id', (req, res) => 
{
  const id = req.params.id;
  res.status(200).send(`Produkt mit ID ${id} wurde geändert`);
});

//Produkt mit einer Bestimmten id löschen
router.delete('/produkte/loeschen/:id', (req,res) =>
{
  const id = req.params.id;
  res.status(200).send(`Produkt mit ID ${id} wurde gelöscht`);
});

router.post("/produkte/hinzufuegen", (req, res) => 
{
  console.log(req.body);
  res.status(200).send("Produkt ändern Routing wurde erreicht");
});

module.exports = router;