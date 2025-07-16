const prisma = require('../db');

const findGenreId = async (genreName) => {
    const row = await prisma.genre.findFirst({
        where: {
            type: genreName 
        },
        select: {
            id: true
        }
    })

    return row ? row.id : null;
};

const addGenre = async (genreName) => {
     const row = prisma.genre.create({
        data: {
            type: genreName
        },
        select: {
            id: true
        }
    })

    return row.id;
};

const catalogGenreModel = async (orderBy) =>  {
    const direction = orderBy === 'ascending' ? 'asc' : 'desc';
    
    const rows = await prisma.genre.findMany({
        orderBy: {
            type: direction
        }
    })
    console.log(rows);
    return rows;
};

const searchCatalogGenreModel = async (query) => {
    const rows = await prisma.genre.findMany({
        where: {
            type: {
                contains: query,
                mode: 'insensitive'
            }
        }
    })
    
    return rows;
}

module.exports = {
    findGenreId,
    addGenre,
    catalogGenreModel,
    searchCatalogGenreModel
};