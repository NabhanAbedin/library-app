const pool = require('../db');


const addBook = async (title, authorId, release, genreId) => {
     const result = await pool.query('INSERT INTO books (title, author_id, genre_id, release) VALUES ($1, $2, $3, $4)',[title,authorId,genreId, release]);

     return result.rowCount === 1;
};

const viewBooksModel = async () => {
    const {rows} = await pool.query('SELECT * FROM books');

    return rows;
};

const joinTablesForBooks = async () => {
    const {rows} = await pool.query(
        `SELECT
         b.id,
         b.title AS book_title,
         a.name AS author_name,
         g.type AS genre_type, 
         b.release FROM books b 
         JOIN authors a ON b.author_id = a.id 
         JOIN genre g ON b.genre_id = g.id 
         ORDER BY b.title DESC
          `
    );

    return rows;
}

const findBySearch = async (query) => {
    const queryPattern = `%${query}%`
    const {rows} = await pool.query(
        `SELECT
         b.id,
         b.title AS book_title,
         a.name AS author_name,
         g.type AS genre_type, 
         b.release FROM books b 
         JOIN authors a ON b.author_id = a.id 
         JOIN genre g ON b.genre_id = g.id 
         WHERE b.title ILIKE $1 
         ORDER BY b.title DESC
          `,[queryPattern]
    );

    return rows;
};

const filterByBookModel = async (orderBy) => {
    
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC'
    const {rows} = await pool.query(
        `SELECT 
         b.id,
         b.title AS book_title,
         a.name AS author_name,
         g.type AS genre_type,
         b.release 
         FROM books b
         JOIN authors a ON b.author_id = a.id
         JOIN genre g ON b.genre_id = g.id
         ORDER BY b.title ${direction}
        `
    );
    return rows;
};

module.exports = {
    addBook,
    viewBooksModel,
    joinTablesForBooks,
    findBySearch,
    filterByBookModel
};