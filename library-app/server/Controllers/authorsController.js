const {findAuthorId, addAuthor, updateAuthor, catalogAuthorsModel, filterAuthorByAplha, searchAuthorsModel} = require('../Models/authorsModel');

const addAuthorController = async (req, res) => {
    const {authorRequests} = req.body;
    if (authorRequests.length === 0) {
        return res.status(404).json('no cart found');
    }
    try {
        for (const request of authorRequests) {
            console.log()
            let {author_name, author_bio, author_age } = request;

            let authorId = await findAuthorId(author_name);
            if (!authorId) {
                authorId = await addAuthor(author_name);
            };
            if (author_age === '') {
                author_age = null;
            }
            const result = await updateAuthor(authorId, author_bio, author_age);

            if (!result) {
                res.status(500).json('could not add author');
            };
        }

        return res.status(201).json('added author successfully');



    } catch (err) {
        console.log(err);
        res.status(500).json('could not add author');
    };
};

// const AuthorsController = async (req,res) => {
//     try {
//         const result = await findAllAuthors();

//         res.json(result);
//     } catch (err) {
//         return res.status(404).json('authors not found');
//     }
// };

const searchAuthorsController = async (req,res) => {
    console.log('/get search authors called');
    try {
        const {query} = req.query;
        const result = await searchAuthorsModel(query);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err);
    };
};

const catalogAuthorsController = async (req,res) => {
    try {
        const {orderBy, from, to} = req.query;
        if (from === 'null' && to === 'null') {
            const result = await catalogAuthorsModel(orderBy);
            return res.json(result);
        }
        const result = await filterAuthorByAplha(orderBy, from, to);
        return res.json(result);    
    } catch (err) {
        console.log(err);
        res.status(404).json('could not find authors')
    }
}


module.exports = {
    addAuthorController,
    catalogAuthorsController,
    searchAuthorsController
}