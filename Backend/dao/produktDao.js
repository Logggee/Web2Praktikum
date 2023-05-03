class ProduktDao
{
    constructor(dbConnection)
    {
        this.conn = dbConnection;
    }

    getConnection()
    {
        return this.conn;
    }

    loadAll()
    {
        let sql = 'SELECT * FROM produkt;';
        let statment = this.conn.prepare(sql);
        let result = statment.all();

        return result;
    }

    loadbyID(id)
    {
        let sql = 'SELECT * FROM produkt WHERE produkt_id=?;';        
        let statment = this.conn.prepare(sql);       
        let result = statment.get(id);

        return result;
    }

    create(name,beschreibung,bild,einheit,lagermenge) {
        //abfrage für einheitsschlüssel
        /*
        let sql = 'SELECT einheit_id FROM einheit WHERE name=?;';        
        let statment = this.conn.prepare(sql);
        let params = [einheit];
        let result = statment.all();
        */
        sql = 'INSERT INTO produkt (name, beschreibung, bild, fk_einheit, lagermenge) VALUES (?,?,?,?,?);';        
        statment = this.conn.prepare(sql);
        params = [name,beschreibung,bild,1,lagermenge];
        result = statement.run(params);
        
        return result;
    }

    update(id,name,beschreibung,bild,lagermenge){
        sql = 'UPDATE produkt SET name=?, beschreibung=?, bild=?, lagermenge=?) WHERE produkt_id=?;';        
        statment = this.conn.prepare(sql);
        params = [name,beschreibung,bild,,lagermenge,id];
        result = statement.run(params);

        return result;
    }

    delete(id)
    {
        let sql = 'DELETE FROM produkt WHERE produkt_id=?;';        
        let statment = this.conn.prepare(sql);        
        let result = statment.run(id);

        return result;
    }

    toString()
    {
        console.log("ProduktDao [_conn = " + this.conn + "]");
    }
}

module.exports = ProduktDao;