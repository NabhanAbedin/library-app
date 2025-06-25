const { findAuthorId, addAuthor } = require('../Models/authorsModel');
const { addBook } = require('../Models/addBooksModel');


const addBookToCatalog = async (req,res) => {
    const {title, release, authorName} = req.body;

    let authorId = await findAuthorId(authorName);

    if (!authorId) {
        authorId = await addAuthor(authorName);
    };

    const result = await addBook(title, authorId, release, genreId);

    if (!result) {
        return res.status(500).json('could not add book to database');
    } 

    return res.status(201).json('added book successfully');


};


module.exports = {
    addBookToCatalog
}