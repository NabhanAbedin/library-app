const pool = require('../db');


const getUserCartModel = async (userId) => {
    const {rows} = await pool.query(`
        SELECT 
            c.id,
            c.book_id,
            u.username AS username,
            b.title AS book_title,
            a.name AS author_name,
            g.type AS genre_type
        FROM cart c
        JOIN users u ON c.user_id = u.id
        JOIN books b ON c.book_id = b.id
        JOIN authors a ON b.author_id = a.id
        JOIN genre g ON b.genre_id = g.id
        WHERE c.user_id = $1
        `,[userId])
    
    return rows;
};

const addToCartModel = async (bookId,userId) => {
    await pool.query(`
        INSERT INTO cart (user_id,book_id)
        VALUES ($1, $2)
        `, [userId, bookId])
};

const removeFromCartModel = async (bookId,userId) => {
    await pool.query(`
        DELETE FROM cart
        WHERE book_id = $1
        AND user_id = $2
        `,[bookId,userId]);
};

const addToCheckedOutModel = async  (bookId,userId,dueDate) => {
    await pool.query(`
        INSERT INTO checked_out (user_id,book_id,due_date)
        VALUES ($1,$2,$3)
        `,[userId,bookId,dueDate])
};

const getCheckedOutModel = async (userId) => {
    const {rows} = await pool.query(`
        SELECT 
        c.id,
        c.book_id,
        b.title AS book_title,
        a.name AS author_name,
        c.check_out_at,
        c.due_date
        FROM checked_out c
        JOIN users u ON c.user_id = u.id
        JOIN books b ON c.book_id = b.id
        JOIN authors a ON b.author_id = a.id
        WHERE c.user_id = $1
        `,[userId]);

    return rows;
}

const getCheckedOutCount = async (userId) => {
    const { rows } = await pool.query(`
      SELECT COUNT(*) AS count
      FROM checked_out
      WHERE user_id = $1
    `, [userId]);

    return parseInt(rows[0].count, 10);
}

module.exports = {
    getUserCartModel,
    addToCartModel,
    removeFromCartModel,
    addToCheckedOutModel,
    getCheckedOutModel,
    getCheckedOutCount  
}

