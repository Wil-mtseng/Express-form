const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const { Pool } = require('pg');
const pool = new Pool();

pool.connect();


// Middleware to recognize the incoming Request Object 
app.use(express.json());

// Middleware to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }));


//Pug engine setup
app.set('view engine', 'pug')
app.set('./views', path.join(__dirname, './views'));

app.get('/new-visitor', (req, res) => {
    // html is in root directory
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.post("/thank-you", (req, res, next) => {

    // addNewVisitor(req.body.visitorName, req.body.assistant, req.body.age, req.body.dateofvisit, req.body.timeofvisit, req.body.comments)

    if (!req.body)
        throw new Error('request body cannot be empty')

    res.render("index", {
        name: req.body.name

    })
});

const addNewVisitor = async(visitorname, assistant, age, dateofvisit, timeofvisit, comments) => {

    let insert, values, query;

    insert = `INSERT INTO visitors(visitorname, assistant, age, dateofvisit, timeofvisit, comments) VALUES($1, $2, $3, $4, $5,) RETURNING*`
    values = [visitor_name, ass_name, visitor_age, dateof_visit, timeof_visit, comments]

    try {

        query = await pool.query(insert, values)
        console.log(query.rows)

        return query.rows;

    } catch (e) {
        console.log(e);

    }
};

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000...');
});