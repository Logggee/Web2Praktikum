const express = require('express');
var nodemailer = require('nodemailer');
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

router.delete('/reservierungen/akzeptieren/:id/:mail', (req,res) =>
{
  const reservierungDao = new ReservierungDao(req.app.locals.dbConnection);
    try
    {
      const id = req.params.id;
      const mail = req.params.mail;
      console.log("Die Adresse lautet: " + mail)
      let status = reservierungDao.deleteReservierung(id);
      res.status(status).send(`Produkt mit ID ${id} wurde gelöscht`);
      //sendingMailAccept(id, mail); 
    }

    catch(ex)
    {
      console.log("Routing Produkt: Error loading all records. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
});

router.delete('/reservierungen/ablehnen/:id/:mail', (req,res) =>
{
  const reservierungDao = new ReservierungDao(req.app.locals.dbConnection);
    try
    {
      const id = req.params.id;
      const mail = req.params.mail;
      let status = reservierungDao.updateDeleteReservierung(id, mail);
      res.status(status).send(`Produkt mit ID ${id} wurde gelöscht`); 
      //sendingMailCancel(id, mail); 
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
      console.log(warenkorb);
      let reservierung_id = reservierungDao.createReservierung(warenkorb[0].mail);

      for (let i = 0; i < warenkorb.length; i++)
      {
        reservierungDao.createAuftrag(reservierung_id, warenkorb[i].id, warenkorb[i].menge);
        console.log(reservierung_id, warenkorb[i].id, warenkorb[i].menge);
      }

      res.status(200).send("Daten wurden in Datenbank geladen!");
    }

    catch(ex)
    {
      console.log("Routing Auftäge: Reservation failed. Exception occured: " + ex.message);
      res.status(400).json({"fehler": true, "nachricht": ex.message});
    }
  });
/*
  async function sendingMailAccept(id, mail) {
    // Generate test SMTP service account from ethereal.email
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.gmx.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "unser.hofladen@gmx.de", // generated ethereal user
        pass: "Hofladen!HAS", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: 'unser.hofladen@gmx.de', // sender address
      to: mail, // list of receivers
      subject: "ID der Reservierung: " + id, // Subject line
      html: "<h3>Ihre Reservierung bei <u><b>unser Hofladen</b></u> wurde erfolgreich entgegengenommen!</h3>", // html body
    });
  }

  async function sendingMailCancel(id, mail) {
    // Generate test SMTP service account from ethereal.email
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.gmx.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "unser.hofladen@gmx.de", // generated ethereal user
        pass: "Hofladen!HAS", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: 'unser.hofladen@gmx.de', // sender address
      to: mail, // list of receivers
      subject: "ID der Reservierung: " + id, // Subject line
      html: "<h3>Ihre Reservierung bei <u><b>unser Hofladen</b></u> wurde leider abgelehnt!</h3>", // html body
    });
  }
*/
module.exports = router;