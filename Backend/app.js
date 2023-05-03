//Express Backend Server Anwedung für Web2 Praktikum

console.log('Starting server...');

try
{
    // connect database
    console.log('Connect database...');
    const Database = require('better-sqlite3');
    const dbOptions = { verbose: console.log };
    const dbFile = './DB/db.sqlite';
    const dbConnection = new Database(dbFile, dbOptions);


    //create Server
    const HTTP_PORT = 8000;     //Constante Variable für Port auf dem der Serber horchen soll
    const TOPLEVELPATH = '/api/v1'; //Toplevel Path 
    var express = require('express');   //express einbinde
    var path = require('path');    
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');

    console.log('Creating and configuring Web Server...');
    var app = express();    //express object erzeugen

    app.locals.dbConnection = dbConnection;

    //Midelwares die Standartmäßig erzeugt wurden
    app.use(logger('dev'));     //Logger Middleware um HTTP verkehr auf der Konsole zu loggen parameter gibt den Stil an
    app.use(express.json());    //Middleware die den Requestbody in JSON parsen kann
    app.use(express.urlencoded({ extended: false }));   //Diese Middleware kann URL-codierten Anfragedaten im Request-Body parsen und in ein JavaScript-Objekt umwandeln. Der Parameter extended gibt an, ob die URL-Codierung der Anfrage verarbeitet werden soll.
    app.use(cookieParser());    //Middleware zum parsen von Cookies
    app.use(express.static('public'));    //Middleware für statische Dateien wie Html Und Css um sie dem Client zur verfügung zu stellen

    //Router Instanz erzeugen und binden auf die Endpunkte
    console.log('Binding enpoints, top level Path at ' + TOPLEVELPATH);

    //Alle Routen die auf die Routings verweißen
    
    var router = require('./public/JavaScript/tests.js');
    app.use(TOPLEVELPATH, router);

    var router = require('./routes/warenkorbRouting.js');
    app.use(TOPLEVELPATH, router);


    var router = require('./routes/produkteRouting.js');
    app.use(TOPLEVELPATH, router);

    
    var router = require('./routes/reservierungenRouting.js');
    app.use(TOPLEVELPATH, router);

    var router = require('./routes/produktverwaltungRouting.js');
    app.use(TOPLEVELPATH, router);
    

    // senden einer default Error Message wenn kein Passender Endpunkt gefunden wurde
    app.use(function (request, response) 
    {
        console.log('Error occured, 404, resource not found');
        response.status(404).json({'fehler': true, 'nachricht': 'Resource nicht gefunden'});
    });

    //Starten des Servers auf dem gegebenen Port
    console.log('\nBinding Port and starting Webserver...');

    var webServer = app.listen(HTTP_PORT, () => {
        console.log('Listening at localhost, port ' + HTTP_PORT);
        console.log('\nUsage: http://localhost:' + HTTP_PORT + TOPLEVELPATH + "/SERVICENAME/SERVICEMETHOD/....");
    });

    //exportieren der App Instanz diese kann dann in einer anderen Datei mir require importiert werden und weiterverarbeitet werden
    module.exports = app;
}

catch(ex) 
{
    console.error(ex);  //Im Fehlerfall wird die Exeption ausgegeben
}