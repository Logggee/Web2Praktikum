const express = require('express');
const ProduktDao = require('../dao/produktDao.js');
// Create a router instance
let router = express.Router();

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

router.get("/produkte/id", (req, res) => 
{
    const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      let obj = prodDao.loadbyID(1);
      console.log(obj);      
      res.status(200).json(obj); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.get("/produkte/create", (req, res) => 
{
    const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      let obj = prodDao.create("neuesProdukt","neueBeschreibung","pfad","Kilo","77");
      console.log(obj);      
      res.status(200).json(obj); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.get("/produkte/update", (req, res) => 
{
    const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      let obj = prodDao.update(4,"neuesProdukt","neueBeschreibung","pfad","Kilo","77");
      console.log(obj);
      res.status(200).json(obj); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.get("/produkte/delete", (req, res) => 
{
    const prodDao = new ProduktDao(req.app.locals.dbConnection);
    try
    {
      let obj = prodDao.delete(4);
      console.log(obj);      
      res.status(200).json(obj); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

module.exports = router;