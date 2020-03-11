const { addNewVisitor, listAllVisitor, viewVisitor, deleteAVisitor, updateVisitor, deleteAllVisitors } = require("./server")
const express = require('express');
const path = require('path');


const app = express();

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
app.post('/addNewVisitor', async(req, res) => {
    add = await addNewVisitor(req.body.visitorname, req.body.assistant, req.body.age, req.body.dateofvisit, req.body.timeofvisit, req.body.comments);
    res.status(200).send(add);
});

// delete a single Visitor from the database by ID
app.delete('/deleteVisitor:id', async(req, res) => {
    removeOne = await deleteAVisitor(req.params.id);
    res.status(200).send(removeOne.rows);
});


// delete all Visitors
app.delete('/deleteAllVisitors', async(req, res) => {

    removeAll = await deleteAllVisitors();
    res.status(200).send(removeAll.rows);

});


//view all Visitors 
app.get('/listAllVisitor', async(req, res) => {

    let view = await listAllVisitor();
    res.status(200).send(view);
    res.end();
});


// view a single Visitor
app.get('/viewVisitor:id', async(req, res) => {

    view = await viewVisitor(req.params.id);
    // sends jason object to postman
    res.status(200).send(view.rows);
    res.end();

});

// Update a single Visitor(fix column doesn't exist)
app.patch('/updateVisitor:id', async(req, res) => {
    update = await updateVisitor(req.body.visitorname, req.body.assistant, req.body.age, req.body.dateofvisit, req.body.timeofvisit, req.body.comments, req.params.id);
    res.send(update);
    res.end();
});


// Check if server is running
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000... Yeah Baby');
});