const pool = require('../db');


const getBooksCheckedOut = async  () => {
    const {rows} = await pool.query(`
        SELECT 
        c.id,
        b.id AS book_id,
        u.username AS username,
        b.title AS book_title,
        a.name AS author_name,
        c.check_out_at,
        c.due_date,
        c.returned_at
        FROM checked_out c
        JOIN users u ON c.user_id = u.id
        JOIN books b ON c.book_id = b.id
        JOIN authors a ON b.author_id = a.id
        ORDER BY u.username
        `);
    
    return rows;
}

const updateCheckedOut = async (date,cartId) => {
    await pool.query(`
        UPDATE checked_out
        SET returned_at = $1
        WHERE id = $2
        `,[date,cartId]);
}

// const removeBookFromUser = async (userId, cartId) => {
//     await pool.query(`
//         DELETE FROM checked_out
//         WHERE id = $1
//         AND user_id = $2
//         `,[cartId, userId])
// }

module.exports = {
    getBooksCheckedOut,
    updateCheckedOut,
    
}