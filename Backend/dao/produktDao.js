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
        let sql = 'SELECT * FROM produkt';
        let statment = this.conn.prepare(sql);
        let result = statment.all();

        return result;
    }

    toString()
    {
        console.log("ProduktDao [_conn = " + this.conn + "]");
    }
}

module.exports = ProduktDao;