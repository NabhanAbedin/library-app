const prisma = require('../db');

const getUserCartModel = async (userId) => {
    
    const rows = await prisma.cart.findMany({
        where: {
            user_id: Number(userId)
        },
        select: {
            id: true,
            book_id: true,
            users: {
                select: {
                    username: true
                }
            },
            books: {
                select: {
                    title: true,
                    authors: {
                        select: {
                            name: true
                        }
                    },
                    genre: {
                        select:{
                            type: true
                        }
                    }
                }
            }
        }
    })
    
    return rows.map(r => ({
        id: r.id,
        book_id: r.book_id,
        username: r.users.username,
        book_title: r.books.title,
        author_name: r.books.authors.name,
        genre_type: r.books.genre.type
    }))
};

const addToCartModel = async (intCart,userId) => {
    await prisma.cart.createMany({
        data: intCart.map((bookId)=> ({
            user_id: Number(userId),
            book_id: Number(bookId),
        }))
    })
};

const removeFromCartModel = async (intCart,userId) => {
    await prisma.cart.deleteMany({
        where: {
            user_id: Number(userId),
            book_id: {in: intCart}
        },

    })
};

const addToCheckedOutModel = async  (intCart,userId,dueDate) => {
    await prisma.checked_out.createMany({
        data: intCart.map((bookId)=> ({
            user_id: Number(userId),
            book_id: Number(bookId),
            due_date: new Date(dueDate)
        }))

    })
};

const getCheckedOutModel = async (userId) => {
    const rows = await prisma.checked_out.findMany({
        select: {
          id:         true,
          book_id:    true,
          books: {
            select: {
              title:   true,
              authors: { select: { name: true } }
            }
          },
          check_out_at: true,
          due_date:     true
        },
        where: {
          user_id:      Number(userId),
          returned_at:  null
        }
      });
      
       return rows.map(r => ({
        id:            r.id,
        book_id:       r.book_id,
        book_title:    r.books.title,
        author_name:   r.books.authors.name,
        check_out_at:  r.check_out_at,
        due_date:      r.due_date
      }));
      
}

const getCheckedOutCount = async (userId) => {
   
    const count = await prisma.checked_out.count({
        where: {
            user_id: Number(userId),
            returned_at: null
        }
    })

    return count;
}

module.exports = {
    getUserCartModel,
    addToCartModel,
    removeFromCartModel,
    addToCheckedOutModel,
    getCheckedOutModel,
    getCheckedOutCount  
}

