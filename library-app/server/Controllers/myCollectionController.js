const {getUserCartModel, addToCartModel, removeFromCartModel, addToCheckedOutModel, getCheckedOutModel, getCheckedOutCount} = require('../Models/myCollectionModel');
const {subtractAvailable} = require('../Models/BooksModel');

const getUserCartController = async (req,res) => {
    try {
        const userId = req.userId;
        const result = await getUserCartModel(userId);
        if (result) {
            return res.status(200).json(result);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json('could not get users card');
    }
};

const addToCartController = async (req,res) => {
    try {
        const cart = req.body;
        const intCart = cart.map(s => parseInt(s,10));
        const userId = req.userId;

        for (const bookId of intCart) {
            await addToCartModel(bookId,userId);
        };

        return res.status(201).json('added to cart');

    } catch (err) {
        console.log(err);
        return res.status(500);
    };
};

const removeFromCartController = async (req,res) => {
    try {
        const userId = req.userId;
        const cart = req.body;
        const intCart = cart.map(s => parseInt(s,10));

        for (const bookId of intCart) {
            await removeFromCartModel(bookId, userId);
        };

        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.status(500).json('couldnt remove from cart');
    };
};

const addToCheckedOutController = async (req,res) => {
    try {
        const userId = req.userId;
        const cart = req.body;
        const checkedOutCount = await getCheckedOutCount(userId);
        const intCart = cart.map(s => parseInt(s,10));

        if (checkedOutCount + intCart.length > 5) {
            return res.status(409).json('too many books checked out');
        }

        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        for (const bookId of intCart) {
            await addToCheckedOutModel(bookId,userId,nextWeek);
            const result = await subtractAvailable(bookId);
            if (!result) {
                return res.status(422).json('unavailable');
            }
        }

        return res.status(201).json('added to checkedout')



    } catch (err) {
        console.log(err);
        return res.status(500).json('could not add to checked out');
    }
}

const getCheckedOutController = async (req,res) => {
    try {
        const userId = req.userId;
        const result = await getCheckedOutModel(userId);

        return res.status(200).json(result);

    } catch (err) {
        console.log(err);
        return res.status(500).json('could not get to checked out');
    }
}



module.exports = {
    getUserCartController,
    addToCartController,
    removeFromCartController,
    addToCheckedOutController,
    getCheckedOutController
}