const { create } = require('framer-motion/client');
const prisma = require('../db');

const findAuthorId = async (authorName) => {

    const row = await prisma.authors.findFirst({
        select: {
            id: true
        },
        where: {
            name: authorName
        }
    })

    return row ? row.id : false;
};

const addAuthor = async (authorName) => {
    const row = await prisma.authors.create({
        data: {
            name: authorName
        },
        select: {
            id: true
        }
    })

    return row.id;

};

const updateAuthor = async (id,bio = null, age= null) => {
    const updated = await prisma.authors.update({
        where: {
            id: parseInt(id)
        },
        data: {
            bio: bio ? bio : null,
            age: age? parseInt(age,10) : null
        }
    })

    return updated;
};

const catalogAuthorsModel = async (orderBy) => {
    const direction = orderBy === 'ascending' ? 'asc' : 'desc';
    const rows = await prisma.authors.findMany({
        orderBy: {
            name: direction
        }
    })
    return rows;
};

const filterAuthorByAplha = async (orderBy, from, to) => {
    const direction = orderBy === 'ascending' ? 'asc' : 'desc';
    const fromLc = from.toLowerCase();
    const toLc = to.toLowerCase();
    
    const rows = await prisma.authors.findMany({
        orderBy: {
            name: direction
        },
        where: {
            name: {
                gte: fromLc,
                lte: toLc,
                mode: 'insensitive'
            }
        }
    })
    return rows;
}

const searchAuthorsModel = async (query) => {
    const rows = await prisma.authors.findMany({
       where: {
        name: {
            contains: query,
            mode: 'insensitive'
        }
       } 
    })

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