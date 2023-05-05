class ProduktDao {
    
    constructor(dbConnection) {
        this.conn = dbConnection;
    }

    getConnection() {
        return this.conn;
    }

    loadAll() {
        let sql = 'select p.name, p.beschreibung, p.bild, e.name as "einheit" , p.lagermenge, p.produkt_id  from produkt p, einheit e where p.fk_einheit = e.einheit_id;';
        let statement = this.conn.prepare(sql);
        let result = statement.all();

        return result;
    }

    /*findAllId() {
        let sql = 'SELECT id FROM produkt;';
        let statement = this.conn.prepare(sql);
        let result = statement.all();

        return result;
    }*/

    createProduct(name, beschreibung, einheit, lagermenge) {
        /*
    createProduct(name, beschreibung, bild, einheit, lagermenge) {
        let sql = 'INSERT INTO produkt (name, beschreibung, bild, fk_einheit, lagermenge) VALUES (?,?,?,?,?);';
        let statement = this.conn.prepare(sql);
        let params = [name, beschreibung, bild, einheit, lagermenge];
        */
       let fkEinheit;
        switch (einheit) {
            case 'Kilo':
                fkEinheit = 1;
              break;
            case 'Stück':
                fkEinheit = 2;
              break;
            case 'Liter':
                fkEinheit = 3;
              break;
            default:
                fkEinheit = 1;
              break;
          }
        let sql = 'INSERT INTO produkt (name, beschreibung, fk_einheit, lagermenge) VALUES (?,?,?,?);';
        let statement = this.conn.prepare(sql);
        let params = [name, beschreibung, fkEinheit, lagermenge];
        statement.run(params);

        return 200;
    }

    changeQuantity(id, lagermenge) {
        let sql = 'UPDATE produkt set lagermenge=? WHERE produkt_id=?;';
        let statement = this.conn.prepare(sql);
        let params = [lagermenge, id];
        statement.run(params);

        return 200;
    }

    deleteProduct(id) {
        let sql = 'DELETE FROM produkt WHERE produkt_id=?;';
        let statement = this.conn.prepare(sql);
        statement.run(id);

        return 200;
    }

    toString() {
        return "ProduktDao [_conn = " + this.conn + "]";
    }
}

module.exports = ProduktDao;