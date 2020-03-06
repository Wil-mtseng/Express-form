const { addNewVisitor, listAllVisitor, viewVisitor, deleteAVisitor, updateVisitor, deleteAllVisitors } = require("./server")
const express = require('express');
const { Pool } = require('pg');
const path = require('path');


const app = express();

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'db',
    password: 'pass',
    port: 5432
});

pool.connect((err, res) => {
    if (err) {
        console.log('Portia wa spita', err);
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

// create a new Visitor in the database
app.get('/addNewVisitor', (req, res) => {
    addNewVisitor("Wilfred", "Mr Ratala", "73", "11/11/11", "00:01", "I am Wil");
    res.json({
        message: "Visitor added to the database"
    });
});

// delete a single Visitor from the database by ID
app.get('/deleteAVisitor', (req, res) => {
    deleteAVisitor(9);
    res.json({
        message: "Visitor deleted"
    });
});


// delete all Visitors(Fix "cannot get /" bug)
app.delete('/deleteAllVisitors', (req, res) => {
    deleteAllVisitors();

});


//view all Visitors (Fix "2 params but none supp" bug)
app.get('/listAllVisitor', (req, res) => {
    let id, visitorname;
    listAllVisitor("id", "visitorname");

});


// view a single Visitor
app.get('/viewVisitor', (req, res) => {
    viewVisitor(12);
});

// Update a single Visitor
app.get('/updateVisitor:id', () => {
    updateVisitor("Wilfred", "Mr Ratala", "73", "11/11/11", );
});



const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000... Yeah Baby');
});