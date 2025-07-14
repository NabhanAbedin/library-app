const {getBooksCheckedOut, updateCheckedOut} = require('../Models/adminModel');
const {addAvailable} = require('../Models/BooksModel');

const getBooksCheckedOutController = async (req,res) => {
    try {
        if (req.role !== 'admin') {
            return res.status(403).json('not admin');
        }
        const result = await getBooksCheckedOut();


        return res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
}

const updateCheckedOutController = async (req,res) => {
        try {
            if (req.role !== 'admin') {
                return res.status(403).send('not admin');
            }
            const {date, cartId, bookId} = req.body;
            await updateCheckedOut(date, cartId);
            const result = await addAvailable(bookId);
            console.log(result);

            return res.status(201).json('updated information successfully');

        } catch (err) {
            console.log(err);
        }
}


module.exports = {
    getBooksCheckedOutController,
    updateCheckedOutController,
    
}