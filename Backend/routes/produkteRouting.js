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

module.exports = router;