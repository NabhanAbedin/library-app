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

const catalogGenreModel = async (orderBy) =>  {
    const direction = orderBy === 'ascending' ? 'ASC' : 'DESC';
    const {rows} = await pool.query(`
        SELECT *
        FROM genre
        ORDER BY type ${direction}
        `);
    console.log(rows);
    return rows;
};

const searchCatalogGenreModel = async (query) => {
    const search = `%${query}%`;
    const {rows} = await pool.query(`
        SELECT *
        FROM genre
        WHERE type ILIKE $1
        `,[search]);
    
    return rows;
}

module.exports = {
    findGenreId,
    addGenre,
    catalogGenreModel,
    searchCatalogGenreModel
};