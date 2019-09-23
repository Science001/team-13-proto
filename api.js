const express = require("express");
const api = express.Router();

//Body Parser ------------------------------------------------
const bodyParser = require('body-parser')
api.use(bodyParser.json())
//------------------------------------------------------------

//Database ---------------------------------------------------
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})
//------------------------------------------------------------

// Code Starts here-------------------------------------------
api.get('/', (req, res) => {
    res.send({message: "I repeat. Team 13, FTW!"})
})

//------------------------------------------------------------

module.exports = api;