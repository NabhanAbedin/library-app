const pool = require('../db');

const findAuthorId = async (authorName) => {
    const result = await pool.query('SELECT id FROM authors WHERE name = $1',[authorName]);

    if (result.rows.length === 0) return null;
    return result.rows[0].id;
};

const addAuthor = async (authorName) => {
    const result = await pool.query('INSERT INTO authors (name) VALUES ($1) RETURNING id', [authorName]);

    return result.rows[0].id;

};

const updateAuthor = async (id,bio = null, age= null) => {
    const {rowCount} = await pool.query('UPDATE authors SET bio = $1, age = $2 WHERE id = $3', [bio,age,id]);

    return rowCount === 1;
};


module.exports = {
    findAuthorId,
    addAuthor,
    updateAuthor
};