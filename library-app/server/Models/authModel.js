const pool = require('../db');


const createUser = async (username, password_hash) => {
    const {rows} = await pool.query(`
        INSERT INTO users (username, password_hash)
        VALUES ($1,$2)
        RETURNING id, username
    `,[username,password_hash]);

    return rows[0];
};


const findUserByusername = async (username) => {
    const {rows} = await pool.query(`
        SELECT * 
        FROM users
        WHERE username = $1
        `,[username]);

    return rows[0];
};


module.exports = {
    createUser,
    findUserByusername
}