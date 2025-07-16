const prisma = require('../db');

const addBookRequest = async (type = 'author',title,author,release,genre) => {
    await prisma.requests.create({
        data: {
            type: type,
            title: title,
            author: author,
            release: new Date(release),
            genre: genre
        }
    })
}

const addAuthorRequest = async (type = 'book',name,bio = null,age = null) => {
    await prisma.requests.create({
        data: {
            type: type,
            author_name: name,
            author_bio: bio ? bio : null,
            author_age: age? Number(age) : null
        }
    })
}

const findBookRequest = async (requestId) => {

    const row = await prisma.requests.findFirst({
        select: {
            id: true,
            title: true,
            author: true,
            genre: true,
            release: true,
            genre: true
        },
        where: {
            id: Number(requestId)
        }
    })
    
    
    return row;
}

const booksRequests = async () => {
    const rows = await prisma.requests.findMany({
        where: {
            type: 'book'
        }
    })
    
    return rows;
}

const authorsRequests = async () => {
    const rows = await prisma.requests.findMany({
        where: {
            type: 'author'
        }
    })
    
    return rows;
}

const deleteRequest = async (requestId) => {
    await prisma.requests.delete({
        where: {
            id: Number(requestId)
        }
    })
}

module.exports = {
    addBookRequest,
    addAuthorRequest,
    booksRequests,
    authorsRequests,
    deleteRequest,
    findBookRequest
}