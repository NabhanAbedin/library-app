const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const addBooksRoute = require('./Routes/BooksRoute');
const authorRoutes = require('./Routes/authorRoute');
const genreRoutes = require('./Routes/genreRoute');

app.use(cors());
app.use(express.json());


app.use('/books', addBooksRoute);

app.use('/authors', authorRoutes );

app.use('/genre', genreRoutes);

app.listen(5001, ()=> {
    console.log('server started');
});