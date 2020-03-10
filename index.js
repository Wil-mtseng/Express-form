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
        console.log('Something went wrong :(', err);
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
app.post('/addNewVisitor', (req, res) => {
    addNewVisitor("Wilfred", "Mr Ratala", "73", "11/11/11", "00:01", "I am Wil");
    res.status(200).json({
        message: "Visitor added to the database"
    });
});

// delete a single Visitor from the database by ID
app.delete('/deleteAVisitor', (req, res) => {
    deleteAVisitor(9);
    res.status(200).json({
        message: `Visitor deleted`
    });
});


// delete all Visitors
app.delete('/deleteAllVisitors', (req, res) => {
    deleteAllVisitors();
    res.status(200).json({
        message: "All visitors deleted!"
    });

});


//view all Visitors 
app.get('/listAllVisitor', async(req, res) => {

    // let visitors = listAllVisitor();
    let view = await pool.query(`SELECT * FROM visitors`)
    res.status(200).send(view.rows);
    res.end();
});


// view a single Visitor
app.get('/viewVisitor:id', async(req, res) => {
    view = await pool.query(`SELECT * FROM visitors WHERE id =${req.params.id}`)
        // sends jason object to postman
    res.status(200).send(view.rows);
    res.end();

});

// Update a single Visitor(fix column doesn't exist)
app.patch('/updateVisitor:id', async(req, res) => {
    update = await updateVisitor();

    res.send(update)
});



const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000... Yeah Baby');
});