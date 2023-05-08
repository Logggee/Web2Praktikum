class ReservierungDao {

    constructor(dbConnection) {
        this.conn = dbConnection;
    }

    getConnection() {
        return this.conn;
    }

    createReservierung(mail){ // Generiere Reservierung und gebe id zurück
        let sqlCheck = 'SELECT COUNT(*) as anzahl from Reservierung r WHERE mail = ? ;'; 
        let statementCheck = this.conn.prepare(sqlCheck);
        let resultCheck = statementCheck.get(mail).anzahl;

        if(resultCheck == 0)
        {
            let sql = 'insert into reservierung (mail) values (?);'; 
            let statement = this.conn.prepare(sql);
            statement.run(mail);
        }

        let sqlGenerateId = 'SELECT reservierung_id from Reservierung r WHERE mail = ?;'; 
        let statementGenerateId = this.conn.prepare(sqlGenerateId);
        let resultGenerateId = statementGenerateId.get(mail).reservierung_id;
        console.log(resultGenerateId);
        return resultGenerateId;
    }

    createAuftrag(reservierung, produkt, menge){ // Erstellt eine Bestellposition
        let sql = 'INSERT INTO auftrag (fk_reservierung, fk_produkt, menge) VALUES (?,?,?);'; 
        let statement = this.conn.prepare(sql);
        let params = [reservierung, produkt, menge];
        statement.run(params);
        
        // Bestellte Menge abziehen
        let sql3 = 'Select lagermenge from produkt where produkt_id = ?;';
        let statement3 = this.conn.prepare(sql3);
        let bestandmenge = statement3.get(produkt).lagermenge;
        console.log("Bestandsmenge:" + bestandmenge);
        let lagermengeNeu = bestandmenge-menge;
        console.log("LagermengeNeu:" + lagermengeNeu);
        let sql2 = 'UPDATE produkt set lagermenge=? WHERE produkt_id=?;';
        let statement2 = this.conn.prepare(sql2);
        let params2 = [lagermengeNeu, produkt];
        statement2.run(params2);

        return 200;
    }

    deleteReservierung(id) {
        // nun können vorhandene Reservierungen und Aufträge entfernt werden
        let sql = 'DELETE FROM reservierung WHERE reservierung_id = ?;';
        let statement = this.conn.prepare(sql);
        statement.run(id);
        // Reservierungen gelöscht
        let sql2 = 'DELETE FROM auftrag WHERE fk_reservierung = ?;';
        let statement2 = this.conn.prepare(sql2);
        statement2.run(id);
        // Aufträge gelöscht
        console.log("Aufträge akzeptiert und gelöscht!");
        return 200;
    }

    updateDeleteReservierung(id) {
        //Array bestellte Menge, Produktschlüssel holen
        let sql3 = 'SELECT fk_produkt, menge FROM auftrag WHERE fk_reservierung = ?;';
        let statement3 = this.conn.prepare(sql3);
        let arrayProdukte = statement3.all(id);
    
        console.log("Löschen des Arrays0:" + arrayProdukte.length);
    
        for (let i = 0; i < arrayProdukte.length; i++) { // einzelne Auftragszeilen durchgehen
            // in bestandsmenge wird die aktuelle bestandsmenge von der jeweiligen Auftragsposition geholt
    
            console.log("Löschen des Arrays:" + arrayProdukte[i].fk_produkt);
    
            let tempsqlmenge = 'SELECT lagermenge FROM produkt WHERE produkt_id = ?;';
            let statementtempsqlmenge = this.conn.prepare(tempsqlmenge);
            let bestandmenge = statementtempsqlmenge.get(arrayProdukte[i].fk_produkt).lagermenge;
            // neuen wert (die vorher abgezogene Menge) wieder addieren
            bestandmenge += arrayProdukte[i].menge;
            let tempsql = 'UPDATE produkt SET lagermenge = ? WHERE produkt_id = ?;';
            let statementtemp = this.conn.prepare(tempsql);
            let paramstemp = [bestandmenge, arrayProdukte[i].fk_produkt];
            statementtemp.run(paramstemp);
            // neue (alte) Werte reinschreiben
        }
    
        // nun können vorhandene Reservierungen und Aufträge entfernt werden
        let sql = 'DELETE FROM reservierung WHERE reservierung_id = ?;';
        let statement = this.conn.prepare(sql);
        statement.run(id);
        // Reservierungen gelöscht
        let sql2 = 'DELETE FROM auftrag WHERE fk_reservierung = ?;';
        let statement2 = this.conn.prepare(sql2);
        statement2.run(id);
        // Aufträge gelöscht
        return 200;
    }
    

    loadAll() {
        let sql = 'SELECT r.reservierung_id, r.mail FROM Reservierung r';
        let statement = this.conn.prepare(sql);
        let arrayRes = statement.all();
        let reservierungen = [];
        for (let i = 0; i < arrayRes.length; i++) {
          let produkte = this.loadbyId(arrayRes[i].reservierung_id);
          let obj = {
            reservierung_id: arrayRes[i].reservierung_id,
            mail: arrayRes[i].mail,
            produkte: produkte
          };
          reservierungen.push(obj);
        }
        return reservierungen;
      }

    loadbyId(id) {
        let sql = 'SELECT p.name, a.menge, e.name AS einheit ' +
                'FROM Auftrag a ' +
                'JOIN Reservierung r ON a.fk_reservierung = r.reservierung_id ' +
                'JOIN Produkt p ON a.fk_produkt = p.produkt_id ' +
                'JOIN Einheit e ON p.fk_einheit = e.einheit_id ' +
                'WHERE r.reservierung_id = ?;';
        let statement = this.conn.prepare(sql);
        let rows = statement.all(id);
        let result = [];
        for (let i = 0; i < rows.length; i++) {
        let obj = {
            name: rows[i].name,
            menge: rows[i].menge,
            einheit: rows[i].einheit
        };
        result.push(obj);
        }
        return result;
    }
  


    toString() {
        console.log('ReservierungDao [_conn=' + this.conn + ']');
    }
}

module.exports = ReservierungDao;