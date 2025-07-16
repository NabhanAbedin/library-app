const prisma = require('../db');

const mapData = (results) => {
    return results.map(b => ({
        id: b.id,
        book_title: b.title,
        author_name: b.authors.name,
        genre_type: b.genre.type,
        release: b.release,
        available: b.available
    }))
}

const addBook = async (title, authorId, release, genreId, available) => {
     const result = await prisma.books.create({
        data: {
            title: title,
            author_id: authorId,
            genre_id: genreId,
            release: release,
            available: parseInt(available)
        }
     })

     return result;
    
};

const viewBooksModel = async () => {
    const rows = await prisma.books.findMany();
    return rows;
};

const joinTablesForBooks = async () => {
    const results = await prisma.books.findMany({
        select: {
            id: true,
            title: true,
            release: true,
            available: true,
            authors: {
                select: {name: true}
            },
            genre: {
                select: {type: true}
            }   
        },
        orderBy: {
            title: 'desc'
        }
    })
    
    const rows = mapData(results);

    return rows;
}

const findBySearch = async (query) => {
    
    const results = await prisma.books.findMany({
        select: {
            id: true,
            title: true,
            release: true,
            available: true,
            authors: {
                select: {name: true}
            },
            genre: {
                select: {type: true}
            }   
        },
        where: {
            title: {
                contains: query,
                mode: 'insensitive'
            }
        },
        orderBy: {
            title: 'desc'
        }
    })

    const rows = mapData(results);


    return rows;
};

const filterByBookModel = async (orderBy) => {
    
    const direction = orderBy === 'ascending' ? 'asc' : 'desc'
    const results = await prisma.books.findMany({
        select: {
            id: true,
            title: true,
            release: true,
            available: true,
            authors: {
                select: {name: true}
            },
            genre: {
                select: {type: true}
            }   
        },
        orderBy: {
            title: direction
        }
    })

    const rows = mapData(results);

    return rows;
};

const filterBooksByYear = async (orderBy,from,to) => {
    const direction = orderBy === 'ascending' ? 'asc' : 'desc';
    const fromDate = `${from}-01-01`;
    const toDate = `${to}-12-31`;

    const results = await prisma.books.findMany({
        select: {
            id: true,
            title: true,
            release: true,
            available: true,
            authors: {
                select: {name: true}
            },
            genre: {
                select: {type: true}
            }   
        },
        orderBy: {
            title: direction
        },
        where: {
            release: {
                gte: new Date(fromDate),
                lte: new Date(toDate)
            }
        }
    })

    const rows = mapData(results);
    
    return rows;
};

const sortBooksByAuthor = async (orderBy) => {
    const direction = orderBy === 'ascending' ? 'asc' : 'desc';
    const results = await prisma.books.findMany({
        select: {
            id: true,
            title: true,
            release: true,
            available: true,
            authors: {
                select: {name: true}
            },
            genre: {
                select: {type: true}
            }   
        },
        orderBy: {
            authors: {
                name: direction
            }
        },
    })

    const rows = mapData(results);

    return rows;
};

const filterAuthorsByAplha = async (orderBy, from, to) => {
    const direction = orderBy === 'ascending' ? 'asc' : 'desc';
    const fromLc = from.toLowerCase();
    const toLc = to.toLowerCase();

    const results = await prisma.books.findMany({
        select: {
            id: true,
            title: true,
            release: true,
            available: true,
            authors: {
                select: {name: true}
            },
            genre: {
                select: {type: true}
            }   
        },
        orderBy: {
            authors: {
                name: direction
            },
        },
        where: {
            authors: {
                name: {
                    gte: fromLc,
                    lte: toLc,
                    mode: 'insensitive'
                }
            }
        }
    })

    const rows = mapData(results);

    return rows;
};

const sortBooksByGenre = async (orderBy) => {
    const direction = orderBy === 'ascending' ? 'asc' : 'desc';
    const results = await prisma.books.findMany({
        select: {
            id: true,
            title: true,
            release: true,
            available: true,
            authors: {
                select: {name: true}
            },
            genre: {
                select: {type: true}
            }   
        },
        orderBy: {
            genre: {
                type: direction
            },
        },
    })

    const rows = mapData(results);

    return rows;
}

const subtractAvailable = async (intCart) => {
  const update = await prisma.books.updateMany({
        where: {
            id: {in: intCart}
        },
        data: {
            available: {decrement: 1}
        }
  })
  return update;
}

const addAvailable = async (bookId) => {
    const update = await prisma.books.update({
        where: {id: parseInt(bookId)},
        data: {
            available: {increment: 1}
        }
    })
    return update;
}

module.exports = {
    addBook,
    viewBooksModel,
    joinTablesForBooks,
    findBySearch,
    filterByBookModel,
    filterBooksByYear,
    sortBooksByAuthor,
    filterAuthorsByAplha,
    sortBooksByGenre,
    subtractAvailable,
    addAvailable
};