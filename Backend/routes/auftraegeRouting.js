const express = require('express');
const ReservierungDao = require('../dao/reservierungDao.js');
// Create a router instance
let router = express.Router();

router.get("/reservierungen/alle", (req, res) =>
{
    const reservierungDao = new ReservierungDao(req.app.locals.dbConnection);

    try
    {
      let result = reservierungDao.loadAll();
      console.log(result.length);
      console.log(JSON.stringify(result));
    }

    catch (ex)
    {
      console.log("Routing Reservierung: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});









/*router.get("/reservierungen/akzeptieren", (req, res) =>{
  res.status(200).send("Die Reservierung wurde akzeptiert");
});

router.get("/reservierungen/ablehnen", (req, res) =>{
  res.status(200).send("Die Reservierung wurde abgelehnt");
});

router.post("/warenkorb", (req, res) => 
  {
    const reservierungDao = new ReservierungDao(req.app.locals.dbConnection);

    try
    {
      const warenkorb = req.body.Produkte;  //JSON Array aus dem Body herausholen
      console.log("Anzahl der Produkte:", warenkorb.length);  //Anzahl der Produkte die in dem Warenkorb waren
      let arr = reservierungDao.loadAll();
      console.log(arr.length);
      console.log(JSON.stringify(arr));
      res.status(200).json(arr);

      res.status(201).send("Die Reservierung wurde erfolgreich entgegen genommen");
    }

    catch (error)
    {
      res.status(500).send("Warenkorb konnte nicht in die Datenbank gespeichert werden");
      console.error(error);
    }
    
  });*/

module.exports = router;