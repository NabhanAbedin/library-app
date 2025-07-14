const pool = require('../db');

const addBookRequest = async (type = 'author',title,author,release,genre) => {
    await pool.query(`
        INSERT INTO requests (type,title,author,release,genre)
        VALUES ($1,$2,$3,$4, $5)
        `,[type,title,author,release,genre])
}

const addAuthorRequest = async (type = 'book',name,bio = null,age = null) => {
    await pool.query(`
        INSERT INTO requests (type,author_name,author_bio,author_age)
        VALUES ($1,$2,$3, $4)
        `,[type,name,bio,age])
}

const findBookRequest = async (requestId) => {
    const {rows} = await pool.query(`
        SELECT 
        id,
        title,
        author,
        release,
        genre
        FROM requests
        WHERE id = $1
        `,[requestId])
    
    return rows[0];
}

const booksRequests = async () => {
    const {rows} = await pool.query(`
        SELECT *
        FROM requests
        WHERE type = 'book'
        `);
    
    return rows;
}

const authorsRequests = async () => {
    const {rows} = await pool.query(`
         SELECT *
        FROM requests
        WHERE type = 'author'
        `)
    
    return rows;
}

const deleteRequest = async (requestId) => {
    await pool.query(`
        DELETE FROM requests
        WHERE id = $1
        `,[requestId])
}

module.exports = {
    addBookRequest,
    addAuthorRequest,
    booksRequests,
    authorsRequests,
    deleteRequest,
    findBookRequest
}