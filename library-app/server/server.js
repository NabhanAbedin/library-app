const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const addBooksRoute = require('./Routes/BooksRoute');
const authorRoutes = require('./Routes/authorRoute');
const genreRoutes = require('./Routes/genreRoute');
const authRoutes = require('./Routes/authRoute');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5175',
    credentials: true
}));
app.use(express.json());


app.use('/books', addBooksRoute);

app.use('/authors', authorRoutes );

app.use('/genre', genreRoutes);

app.use('/auth', authRoutes);

app.listen(5001, ()=> {
    console.log('server started');
});