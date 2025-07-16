const prisma = require('../db');


const createUser = async (username, password_hash) => {

    const row = await prisma.users.create({
        data: {
            username: username,
            password_hash: password_hash
        },
        select: {
            id: true,
            username: true
        }
    })

    return row;
};


const findUserByusername = async (username) => {
   
    const row = await prisma.users.findFirst({
        where: {
            username: username
        }
    })

    return row;
};

const findUserById = async (userId) => {
   
    const row = await prisma.users.findFirst({
        where: {
            id: Number(userId)
        }
    })
    
    
    return row;
};


module.exports = {
    createUser,
    findUserByusername,
    findUserById
}