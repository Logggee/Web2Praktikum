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
  const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      const id = req.params.id;
      const quantity = req.query.quantity;
      console.log(id);
      console.log(quantity);
      let status = prodDao.changeQuantity(id, quantity);
      res.status(status).send(`Produkt mit ID ${id} wurde die Menge auf ${quantity} geändert`); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

//Produkt mit einer Bestimmten id löschen
router.delete('/produkte/loeschen/:id', (req,res) =>
{
  const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      const id = req.params.id;
      let status = prodDao.deleteProduct(id);
      res.status(status).send(`Produkt mit ID ${id} wurde gelöscht`); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.post("/produkte/hinzufuegen", (req, res) => 
{
  console.log(req.body);
  const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      const name = req.body.name;
      const text = req.body.text;
      const unit = req.body.unit;
      const quantity = req.body.quantity;
      console.log(name);
      console.log(text);
      console.log(unit);
      console.log(quantity);
      let status = prodDao.createProduct(name, text, unit, quantity);
      res.status(status).send("Produkt wurde erfolgreich angelegt");
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

module.exports = router;