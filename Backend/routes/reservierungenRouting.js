const express = require('express');
// Create a router instance
var router = express.Router();

router.get("/reservierungen/akzeptieren", (req, res) =>{
  res.status(200).send("Die Reservierung wurde akzeptiert");
});

router.get("/reservierungen/ablehnen", (req, res) =>{
  res.status(200).send("Die Reservierung wurde abgelehnt");
});

router.get("/reservierungen", (req, res) =>{
  res.status(200).send("Die Reservierungen wurden geladen");
});

module.exports = router;