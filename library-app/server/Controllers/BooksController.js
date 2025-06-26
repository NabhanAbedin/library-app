const { findAuthorId, addAuthor } = require('../Models/authorsModel');
const { addBook, viewBooksModel, joinTablesForBooks, findBySearch } = require('../Models/BooksModel');
const {findGenreId, addGenre} = require('../Models/genreModel');


const addBookToCatalog = async (req,res) => {
    const {title, release, authorName, genreName} = req.body;

    try {
        let authorId = await findAuthorId(authorName);
        if (!authorId) {
            authorId = await addAuthor(authorName);
        };
        let genreId = await findGenreId(genreName);
        if (!genreId) {
            genreId = await addGenre(genreName);
        };
        const result = await addBook(title, authorId, release, genreId);

        if (!result) {
            return res.status(500).json('could not add book to database');
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


}

module.exports = {
    addBookToCatalog,
    viewBooks,
    viewAllBooksData,
    viewBooksBySearch
}