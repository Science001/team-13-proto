// Imports -----------------------------------------------------------------------
const express = require('express')
const { Pool } = require('pg')
const crypto = require('crypto')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const morgan = require('morgan')
// -------------------------------------------------------------------------------

// Initialize --------------------------------------------------------------------
require('dotenv').config()
const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(session({
    name: 'sessionID',
    secret: 'averyrandommixedrealitybasedarvrgoodbadseesunrisefrommselfwecanridesseeyouthroughmylucideyesftw',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: true,
    saveUninitialized: false
}))
const port = process.env.PORT
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})
// -------------------------------------------------------------------------------

// Helpers -----------------------------------------------------------------------
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pdkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
// -------------------------------------------------------------------------------

//Code Starts here ---------------------------------------------------------------
app.get('/', (req, res) => {
    res.send({message: "Team 13, FTW!"})
})

app.get('/db', (req, res) => {
    pool.query('SELECT now()', (err, result) => {
        if(err) {
            console.log("Error querying DB: ", err)
            res.status(500).send({message: "Error querying database"})
        }
        else {
            res.send(result.rows[0])
        }
    })
})

app.use('/api', require('./api'))

// -------------------------------------------------------------------------------

app.listen(port, () => console.log(`Listening at port ${port}`))