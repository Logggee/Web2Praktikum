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
      res.status(200).json(result); 
    }

    catch (ex)
    {
      console.log("Routing Reservierung: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.delete('/reservierungen/akzeptieren/:id', (req,res) =>
{
  const reservierungDao = new ReservierungDao(req.app.locals.dbConnection);
    try
    {
      console.log(req.params.id)
      const id = req.params.id;
      let status = reservierungDao.deleteReservierung(id);
      res.status(status).send(`Produkt mit ID ${id} wurde gelöscht`); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.delete('/reservierungen/ablehnen/:id', (req,res) =>
{
  const reservierungDao = new ReservierungDao(req.app.locals.dbConnection);
    try
    {
      const id = req.params.id;
      let status = reservierungDao.updateDeleteReservierung(id);
      res.status(status).send(`Produkt mit ID ${id} wurde gelöscht`); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.post("/warenkorb", (req, res) => 
  {
    const reservierungDao = new ReservierungDao(req.app.locals.dbConnection);

    try
    {
      const warenkorb = req.body.Produkte;  //JSON Array aus dem Body herausholen
      let reservierung_id = reservierungDao.createReservierung(warenkorb[0].mail);

      for (let i = 0; i < warenkorb.length; i++)
      {
        let status = reservierungDao.createAuftrag(reservierung_id, warenkorb[i].id, warenkorb[i].menge);
        console.log(reservierung_id, warenkorb[i].id, warenkorb[i].menge);
      }
    }

    catch(ex)
    {
      console.log("Routing Auftäge: Reservation failed. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
    
  });

module.exports = router;