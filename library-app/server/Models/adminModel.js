const prisma = require('../db');


const getBooksCheckedOut = async () => {
  const result = await prisma.checked_out.findMany({
    select: {
      id: true,
      check_out_at: true,
      due_date: true,
      returned_at: true,
      books: {
        select: {
          id: true,
          title: true,
          authors: { select: { name: true } }
        }
      },
      users: { select: { username: true } }
    },
    orderBy: {
      users: { username: 'asc' }
    }
  });

  return result.map(r => ({
    id:            r.id,
    book_id:       r.books.id,
    username:      r.users.username,
    book_title:    r.books.title,
    author_name:   r.books.authors.name,
    check_out_at:  r.check_out_at,
    due_date:      r.due_date,
    returned_at:   r.returned_at
  }));
}

const updateCheckedOut = async (date,checkedOutId) => {
    await prisma.checked_out.update({
        data: {
            returned_at: new Date(date),
        },
        where: {
            id: Number(checkedOutId)
        }
    })
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