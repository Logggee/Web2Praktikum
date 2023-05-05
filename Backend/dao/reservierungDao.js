class ReservierungDao {

    constructor(dbConnection) {
        this.conn = dbConnection;
    }

    getConnection() {
        return this.conn;
    }

    createReservierung(mail){ // Generiere Reservierung und gebe id zurück
        let sql = 'insert into reservierung (mail) values (?);'; 
        let statement = this.conn.prepare(sql);
        statement.run(mail);

        let sql2 = 'select reservierung_id from reservierung where mail = ?;'; 
        let statement2 = this.conn.prepare(sql2);
        let result = statement2.run(mail);

        return result;
    }

    createAuftrag(reservierung, produkt, menge){ // Erstellt eine Bestellposition
        // Lukas: Das muss in einer Schleife aufgerufen werden, in welcher reservierung gleich bleibt - aber produkt und menge durch itteriert
        let sql = 'INSERT INTO auftrag (fk_reservierung, fk_produkt, menge) VALUES (?,?,?);'; 
        let statement = this.conn.prepare(sql);
        let params = [reservierung, produkt, menge];
        let result = statement.run(params);
        
        // Bestellte Menge abziehen
        let sql3 = 'Select lagermenge from produkt where produkt_id = ?;';
        let statement3 = this.conn.prepare(sql3);
        let bestandmenge = statement3.run(produkt);

        let lagermengeNeu = bestandmenge.lagermenge-menge;
        let sql2 = 'UPDATE produkt lagermenge=? WHERE produkt_id=?;';
        let statement2 = this.conn.prepare(sql);
        let params2 = [lagermengeNeu, id];
        statement2.run(params2);

        return 200;
    }

    deleteReservierung(id) { // Ablehnung von Reservierung
        //Array bestellte Menge, Produktschlüssel holen
        let sql3 = 'SELECT fk_produkt, menge FROM auftrag WHERE fk_reservierung = ?;';
        let statement3 = this.conn.prepare(sql3);
        let arrayProdukte = statement3.run(id);
    
        for (let i = 0; i < arrayProdukte.length; i++) { // einzelne Auftragszeilen durchgehen
            // in bestandsmenge wird die aktuelle bestandsmenge von der jeweiligen Auftragsposition geholt
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

        // nun können vorhgandene Reservierungen und Aufträge entfernt werden
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
        //  result muss für die jeweilige Reservierung durch itteriert werden da Ergebnis:
        // https://i.imgur.com/2BXzQk1.png
        // Alle Reservierungen gibt (nur überprüfen dass result.reservierungid = die id von der jeweiligen reservierung)
        let sql = 'select r.reservierung_id ,r.mail, p.name,a.menge , e.name from Auftrag a, Reservierung r, produkt p, einheit e  WHERE a.fk_reservierung = r.reservierung_id and a.fk_produkt = p.produkt_id and p.fk_einheit = e.einheit_id;';
        let statement = this.conn.prepare(sql);
        let result = statement.all();

        return result;
    }


    loadbyId(id){
        let sql = 'select r.reservierung_id ,r.mail, p.name,a.menge , e.name from Auftrag a, Reservierung r, produkt p, einheit e  WHERE a.fk_reservierung = r.reservierung_id and a.fk_produkt = p.produkt_id and p.fk_einheit = e.einheit_id and r.reservierung_id = ?;';
        let statement = this.conn.prepare(sql);
        let result = statement.run(id);

        return result;
    }


    toString() {
        console.log('ReservierungDao [_conn=' + this.conn + ']');
    }
}

module.exports = ReservierungDao;