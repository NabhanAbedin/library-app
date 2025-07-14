const {addAuthorRequest, addBookRequest, booksRequests, authorsRequests, deleteRequest, findBookRequest } = require('../Models/requestsModel');

const getAllRequestsController = async (req,res) => {
    try {
        if (req.role !== 'admin') {
            return res.status(403).send('not admin');
        }
        const bookResult = await booksRequests();
        const authorsResult = await authorsRequests();
        return res.status(200).json({bookResult, authorsResult});
    } catch (err) {
        console.log(err);
        res.status(404).json('could not find books and authors');
    }
}

const deleteRequestController = async (req,res) => {
    try {
        if (req.role !== 'admin') {
            return res.status(403).send('not admin');
        }
        const {cart} = req.body;
        for (const requestId of cart) {
            await deleteRequest(parseInt(requestId));
        }
        return res.status(200).json('deleted request');
    } catch (err) {
        console.log(err);
        res.status(404).json('could not find books and authors');
    }
}

const addBookRequestController = async (req,res) => {
    try {
        const {title,author,release,genre} = req.body;
        await addBookRequest('book',title,author,release,genre);
        return res.status(200).json('added book request');
    } catch (err) {
        console.log(err);
        res.status(404).json('could not request book');
    }
}

const addAuthorRequestController = async (req,res) => {
    try {
        const {name,bio,age} = req.body;
        await addAuthorRequest('author',name,bio,parseInt(age));
        return res.status(200).json('added author request');
    } catch (err) {
        console.log(err);
        res.status(404).json('could not request author');
    }
}

module.exports = {
    getAllRequestsController,
    deleteRequestController,
    addBookRequestController,
    addAuthorRequestController
}