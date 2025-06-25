const pool = require('../db');


const addBook = async (title, authorId, release, genreId) => {
     const result = await pool.query('INSERT INTO books (title, author_id, genre_id, date) VALUES ($1, $2, $3, $4)',[title,authorId,release,genreId]);

     return result.rowCount === 1;
};



module.exports = {
    addBook,

}