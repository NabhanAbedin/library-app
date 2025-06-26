const {findAuthorId, addAuthor, updateAuthor} = require('../Models/authorsModel');

const addAuthorController = async (req, res) => {
    let {name, bio, age } = req.body;

    try {
        let authorId = await findAuthorId(name);
        if (!authorId) {
            authorId = await addAuthor(name);
        };
        if (age === '') {
            age = null;
        }
        const result = await updateAuthor(authorId, bio, age);

        if (!result) {
            res.status(500).json('could not add author');
        };

        return res.status(201).json('added author successfully');



    } catch (err) {
        console.log(err);
        res.status(500).json('could not add author');
    };
};


module.exports = {
    addAuthorController
}