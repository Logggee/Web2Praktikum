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
      console.log(Object.keys(req.body).length);
      const warenkorb = Object.values(req.body);
      console.log("Anzahl der Produkte:", warenkorb.length);
      for (let i = 0; i < warenkorb.length; i++) {
        const produkt = warenkorb[i].produkt;
        const menge = warenkorb[i].menge;
        console.log(produkt, menge);
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