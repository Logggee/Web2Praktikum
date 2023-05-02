const express = require('express');
const bodyParser = require('body-parser');
// Create a router instance
var router = express.Router();

const app = express();
app.use(bodyParser.json());

router.post("/warenkorb", (req, res) => 
  {
    try
    {
      const warenkorb = req.body.Produkte;  //JSON Array aus dem Body herausholen
      console.log("Anzahl der Produkte:", warenkorb.length);  //Anzahl der Produkte die in dem Warenkorb waren
      for (let i = 0; i < warenkorb.length; i++)  //For schleife die alle Produkte aus dem JSON Holt das JSON Array könnte aber hier vermutlich gleich an DAO weitergeleitet werden 
      {
        const name = warenkorb[i].name;
        const menge = warenkorb[i].menge;
        console.log(name, menge);
      }
      res.status(201).send("Die Reservierung wurde erfolgreich entgegen genommen");
    }

    catch (error)
    {
      res.status(500).send("Warenkorb konnte nicht in die Datenbank gespeichert werden");
      console.error(error);
    }
    
  });

module.exports = router;