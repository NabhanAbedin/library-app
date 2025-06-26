const pool = require('../db');

const findGenreId = async (genreName) => {
    const result = await pool.query('SELECT id from genre WHERE type = $1', [genreName]);

    if (result.rows.length === 0) return null;
    return result.rows[0].id;
};

const addGenre = async (genreName) => {
    const result = await pool.query('INSERT INTO genre (type) VALUES ($1) RETURNING id', [genreName]);

    return result.rows[0].id;
};

module.exports = {
    findGenreId,
    addGenre
};