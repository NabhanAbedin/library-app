const express = require('express');
const app = express();
const pool = require('./db');
const addBooksRoute = require('./Routes/addBooksRoute');

app.arguments('/books', addBooksRoute)

app.listen(5001, ()=> {
    console.log('server started');
});