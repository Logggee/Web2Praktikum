//Express Backend Server Anwedung für Web2 Praktikum

console.log('Starting server...');

try
{
    // connect database
    console.log('Connect database...');
    //hier muss nun enstprechender Code zum Verbinden der Datenbank eingefügt werden


    //create Server
    const HTTP_PORT = 8000;     //Constante Variable für Port auf dem der Serber horchen soll
    const TOPLEVELPATH = '/api/v1'; //Toplevel Path 
    var express = require('express');   //express einbinde
    var path = require('path');    
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');

    console.log('Creating and configuring Web Server...');
    var app = express();    //express object erzeugen

    //Midelwares die Standartmäßig erzeugt wurden
    app.use(logger('dev'));     //Logger Middleware um HTTP verkehr auf der Konsole zu loggen parameter gibt den Stil an
    app.use(express.json());    //Middleware die den Requestbody in JSON parsen kann
    app.use(express.urlencoded({ extended: false }));   //Diese Middleware kann URL-codierten Anfragedaten im Request-Body parsen und in ein JavaScript-Objekt umwandeln. Der Parameter extended gibt an, ob die URL-Codierung der Anfrage verarbeitet werden soll.
    app.use(cookieParser());    //Middleware zum parsen von Cookies
    app.use(express.static(path.join(__dirname, 'public')));    //Middleware für statische Dateien wie Html Und Css um sie dem Client zur verfügung zu stellen

    //Router und binden auf die Endpunkte
    // Create a router instance
    console.log('Binding enpoints, top level Path at ' + TOPLEVELPATH);

    /*
    var router = require('./routes/start.js');
    app.use(TOPLEVELPATH, router);

    var router = require('./routes/ueberuns.js');
    app.use(TOPLEVELPATH, router);
    */

    var router = require('./routes/produkte.js');
    app.use(TOPLEVELPATH, router);

    /*
    var router = require('./routes/reservierungen.js');
    app.use(TOPLEVELPATH, router);

    var router = require('./routes/produktverwaltung.js');
    app.use(TOPLEVELPATH, router);
    */

    // send default error message if no matching endpoint found
    app.use(function (request, response) 
    {
        console.log('Error occured, 404, resource not found');
        response.status(404).json({'fehler': true, 'nachricht': 'Resource nicht gefunden'});
    });

    // starting the Web Server
    console.log('\nBinding Port and starting Webserver...');

    var webServer = app.listen(HTTP_PORT, () => {
        console.log('Listening at localhost, port ' + HTTP_PORT);
        console.log('\nUsage: http://localhost:' + HTTP_PORT + TOPLEVELPATH + "/SERVICENAME/SERVICEMETHOD/....");
        console.log('\nVersion 4.0, 21.02.2023\nSommersemester 2023, HS Albstadt-Sigmaringen, INF');
        console.log('\n\n-----------------------------------------');
        console.log('exit / stop Server by pressing 2 x CTRL-C');
        console.log('-----------------------------------------\n\n');
    });

    module.exports = app;
}

catch(ex) 
{
    console.error(ex);  //Im Fehlerfall wird die Exeption ausgegeben
}