"use strict"

const { Pool } = require('pg');


const pool = new Pool({
    user: "user",
    host: "localhost",
    database: "db",
    password: "pass",
    port: 5432
});



const createTable = async() => {
    let db = `CREATE TABLE visitors(
        id SERIAL PRIMARY KEY,
        visitorname VARCHAR(50) NOT NULL,
        age INT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        assistant VARCHAR(50) NOT NULL,
        comments VARCHAR(255) NOT NULL)`;
try{
  let create =  await pool.query(db);
	  return create.rows;
        pool.end();
  } catch (e) {
	console.log(e);
 }
};
createTable ();

pool.connect();


// Add vistor to database
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



// View all visitors 
const listAllVisitor = async(id, visitorname) => {
    let query, view, values;

    view = `SELECT visitors FROM visitors ORDER BY $1, $2`
    values = [id, visitorname]

    try {

        query = await pool.query(view, values)
        console.log(query.rows);

        return query.rows;

    } catch (e) {
        console.log(e);
    }

};




// Select and view a single visitor
const viewVisitor = async(id) => {

    let view, values, query;

    view = `SELECT * FROM visitors WHERE $1 = id`
    values = [id]

    try {
        query = await pool.query(view, values);

        console.log(query.rows);
        return query;

    } catch (e) {

        console.log(e)
    };

};




//Delete a single visitor using their ID
const deleteAVisitor = async(id) => {

    let remove, values, query;

    remove = `DELETE FROM visitors WHERE $1 = id `;
    values = [id];

    try {

        query = await pool.query(remove, values);

        console.log(query.rows);
        return query.rows;

    } catch (e) {

        console.log(e);
    }

};



// Select and update a visitor using their ID
const updateVisitor = async(visitorname, assistant, age, dateofvisit, timeofvisit, comments, id) => {

    let update, values, query;

    update = `UPDATE visitors SET visitorname = $1, assistant = $2, age = $3,dateofvisit = $4, timeofvisit = $5, comments = $6 WHERE id = $7 RETURNING*`
    values = [visitorname, assistant, age, dateofvisit, timeofvisit, comments, id]

    try {

        query = await pool.query(update, values);
        console.log(query.rows)

        return query.rows;

    } catch (e) {

        console.log(e);

    }

};



// Remove all visitors from database
const deleteAllVisitors = async() => {

    let remove, query;

    remove = 'DELETE FROM visitors';

    try {

        query = await pool.query(remove);
        console.log(query.rows);

        return query.rows;

    } catch (e) {

        console.log(e);

    }

}




module.exports = {
    addNewVisitor,
    updateVisitor,
    viewVisitor,
    deleteAVisitor,
    listAllVisitor,
    deleteAllVisitors
};
