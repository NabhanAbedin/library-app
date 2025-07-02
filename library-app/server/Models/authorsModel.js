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

const catalogAuthorsModel = async (orderBy) => {
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC';
    const {rows} = await pool.query(`
        SELECT *
        FROM authors
        ORDER BY name ${direction}
        `);
    return rows;
};

const filterAuthorByAplha = async (orderBy, from, to) => {
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC';
    const fromLc = from.toLowerCase();
    const toLc = to.toLowerCase();

    const {rows} = await pool.query(`
        SELECT *
        FROM authors
        WHERE LOWER(name) BETWEEN $1 AND $2
        ORDER BY LOWER(name) ${direction}
        `,[fromLc,toLc]);
    return rows;
}

const searchAuthorsModel = async (query) => {
    const searchQuery = `%${query}%`
    const {rows} = await pool.query(`
        SELECT *
        FROM authors 
        WHERE authors.name ILIKE $1
        `,[searchQuery]);
    
    return rows;
};






module.exports = {
    findAuthorId,
    addAuthor,
    updateAuthor,
    catalogAuthorsModel,
    filterAuthorByAplha,
    searchAuthorsModel
};