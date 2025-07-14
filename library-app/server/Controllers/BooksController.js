const { findAuthorId, addAuthor } = require('../Models/authorsModel');
const { addBook, viewBooksModel, joinTablesForBooks, findBySearch, filterByBookModel, filterBooksByYear, sortBooksByAuthor, filterAuthorsByAplha, sortBooksByGenre } = require('../Models/BooksModel');
const {findGenreId, addGenre} = require('../Models/genreModel');


const addBookToCatalog = async (req,res) => {
    const {bookRequests} = req.body;
    if (bookRequests.length === 0) {
        return res.status(404).json('no cart found');
    }
    console.log(bookRequests);
    
    try {
        for (const request of bookRequests) {
            const {title, author, genre, release, available} = request;

            let authorId = await findAuthorId(author);
            if (!authorId) {
                authorId = await addAuthor(author);
            };
            let genreId = await findGenreId(genre);
            if (!genreId) {
                genreId = await addGenre(genre);
            };
            const result = await addBook(title, authorId, release, genreId, parseInt(available));

            if (!result) {
                return res.status(500).json('could not add book to database');
            } 
        }

        return res.status(201).json('added book successfully');
    } catch (err) {
        console.log(err);
        return res.status(500).json('could not add book to database');
    };


};

const viewBooks = async (req,res) => {
    try {
        const books = await viewBooksModel();
        res.json(books);
    } catch (err) {
        console.log(err);
        return res.status(500).json('could not retrieve books');
    };
};

const viewAllBooksData = async (req,res) => {
    try {
        const data = await joinTablesForBooks();
        res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json('could not retreive books data')
    };
};

const viewBooksBySearch = async (req,res) => {
    const {query} = req.query;
    
    try {
        const books = await findBySearch(query);
        res.json(books);
    } catch (err) {
        console.log(err);
        return res.status(500).json('could not use query to find books');
    }
};

const catalogBooksController = async (req,res) => {
    //get the value from the filterBy variable from the url
    const {sortBy, orderBy, from, to} = req.query;

    if (sortBy === 'books') {
        if (from === 'null' && to==='null') {
            const result = await filterByBookModel(orderBy);
            return res.json(result);
        };
        const result = await filterBooksByYear(orderBy,from,to);
        return res.json(result);
    } else if (sortBy === 'authors') {
        if (from === 'null' && to==='null') {
            const result = await sortBooksByAuthor(orderBy);
            return res.json(result);
        };
        const result = await filterAuthorsByAplha(orderBy,from,to);
        return res.json(result);
    } else {
        const result = await sortBooksByGenre(orderBy);
        return res.json(result);
    }
}


module.exports = {
    addBookToCatalog,
    viewBooks,
    viewAllBooksData,
    viewBooksBySearch,
    catalogBooksController
}