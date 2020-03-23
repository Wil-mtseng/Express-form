'use static'

const express = require('express');

const path = require('path');

// Databse config
require('dotenv').config();

const app = express();

const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'db',
    password: 'pass',
    port: 5432
});

pool.connect((err, res) => {
    if (err) {
        console.log('Cannot connect to server!', err);
    }
});

// Error Handler 
pool.on('error', (err) => {
    console.error('An idle client has experienced an error', err.stack)
})

app.use('/', express.static('.'))

// Middleware to recognize the incoming Request Object 
app.use(express.json());


// Middleware to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }));


//Pug and view engine setup
app.set('view engine', 'pug')
app.set('./views', path.join(__dirname, './views'));

app.get('/new-visitor', (req, res) => {

    res.sendFile(path.join(__dirname + '/public/index.html'))
});

const addNewVisitor = async(visitorname, assistant, age, dateofvisit, timeofvisit, comments) => {

    let insert, values, query;

    insert = `INSERT INTO visitors(visitorname, assistant, age, dateofvisit, timeofvisit, comments) VALUES($1, $2, $3, $4, $5, $6) RETURNING*`
    values = [visitorname, assistant, age, dateofvisit, timeofvisit, comments]

    try {

        query = await pool.query(insert, values)
        console.log(query.rows)

        return query.rows;
        pool.end();

    } catch (e) {
        console.log(e);

    }
};

app.post("/thank-you", (req, res, next) => {

    addNewVisitor(req.body.name, req.body.assistant, req.body.age, req.body.date, req.body.time, req.body.comments)


    if (!req.body)

        throw new Error('request body cannot be empty')

    res.render("index", {

        name: req.body.name

    })
});


const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000...');
});
