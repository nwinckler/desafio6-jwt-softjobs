const {Pool} = require("pg")

const config={
    user:"postgres",
    password:"postgres",
    host:"localhost",
    port:5432,
    database:"softjobs"
}

const pool = new Pool(config)

module.exports = {pool}