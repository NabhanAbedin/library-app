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

const filterBooksByYear = async (orderBy,from,to) => {
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC';
    const fromDate = `${from}-01-01`;
    const toDate = `${to}-12-31`;

    const {rows} = await pool.query(`
        SELECT 
        b.id,
        b.title AS book_title,
        a.name AS author_name,
        g.type AS genre_type,
        b.release
        FROM books b
        JOIN authors a ON b.author_id = a.id
        JOIN genre g ON b.genre_id = g.id
        WHERE b.release >= $1
            AND b.release <= $2
        ORDER BY b.release ${direction}
        `,[fromDate,toDate])
    
    return rows;
};

const sortBooksByAuthor = async (orderBy) => {
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC';
    const {rows} = await pool.query(`
        SELECT 
        b.id,
        b.title AS book_title,
        a.name AS author_name,
        g.type AS genre_type,
        b.release
        FROM books b
        JOIN authors a ON b.author_id = a.id
        JOIN genre g ON b.genre_id = g.id
        ORDER BY LOWER(a.name) ${direction}
        `);

    return rows;
};

const filterAuthorsByAplha = async (orderBy, from, to) => {
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC';
    const fromLc = from.toLowerCase();
    const toLc = to.toLowerCase();
    const {rows} = await pool.query(`
        SELECT 
        b.id,
        b.title AS book_title,
        a.name AS author_name,
        g.type AS genre_type,
        b.release
        FROM books b
        JOIN authors a ON b.author_id = a.id
        JOIN genre g ON b.genre_id = g.id
        WHERE LOWER(a.name) BETWEEN $1 AND $2
        ORDER BY LOWER(a.name) ${direction}
        `, [fromLc,toLc]);

    return rows;
};

const sortBooksByGenre = async (orderBy) => {
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC';
    const {rows} = await pool.query(`
        SELECT 
        b.id,
        b.title AS book_title,
        a.name AS author_name,
        g.type AS genre_type,
        b.release
        FROM books b 
        JOIN authors a ON b.author_id = a.id
        JOIN genre g ON b.genre_id = g.id
        ORDER BY LOWER(g.type) ${direction}
        `);
    
    console.log(rows);
    return rows;
}


module.exports = {
    addBook,
    viewBooksModel,
    joinTablesForBooks,
    findBySearch,
    filterByBookModel,
    filterBooksByYear,
    sortBooksByAuthor,
    filterAuthorsByAplha,
    sortBooksByGenre
};