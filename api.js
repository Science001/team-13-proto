const express = require("express");
const api = express.Router();
const crypto = require('crypto')

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




// Helpers -----------------------------------------------------------------------
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pdkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
// -------------------------------------------------------------------------------

//Code Starts here ---------------------------------------------------------------
api.get('/', (req, res) => {
    res.send({ message: "Team 13, FTW!" })
})

api.get('/db', (req, res) => {
    pool.query('SELECT now()', (err, result) => {
        if (err) {
            console.log("Error querying DB: ", err)
            res.status(500).send({ message: "Error querying database" })
        }
        else {
            res.send(result.rows[0])
        }
    })
})

api.post('/sensor-data', (req, res, next) => {
    // var { temperature, humidity, aqi, hcho, coords } = req.body
    // if(!temperature || !humidity || !aqi || !hcho || !coords) {
    //     res.status(400).send("Not all expected data was sent")
    // }
    // else
    next()
}, (req, res) => {
    console.log("SENSOR DATA:", req.body)
    var { temperature, humidity, aqi, hcho, coords } = req.body
    temperature = temperature || ''
    humidity = humidity || ''
    aqi = aqi || ''
    hcho = hcho || ''
    coords = coords || ''
    pool.query("insert into sensor_data(temperature, humidity, aqi, hcho, coords) values ($1, $2, $3, $4, $5)", [temperature, humidity, aqi, hcho, coords], (err, _) => {
        if (err) {
            console.log("Error inserting sensor data: ", err)
            res.status(500).send(err)
        }
        else {
            res.send("INSERTED INTO DB")
        }
    })
})

api.get('/all-sensor-data', (req, res) => {
    pool.query("select * from sensor_data", (err, result) => {
        if (err) {
            console.log("Error getting sensor data: ", err)
            res.status(500).send(err)
        }
        else {
            res.send(result.rows)
        }
    })
})

module.exports = api;