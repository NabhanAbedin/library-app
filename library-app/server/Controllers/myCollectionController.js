const {getUserCartModel, addToCartModel, removeFromCartModel, addToCheckedOutModel} = require('../Models/myCollectionModel');

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
        const intCart = cart.map(s => parseInt(s,10));

        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        for (const bookId of intCart) {
            await addToCheckedOutModel(bookId,userId,nextWeek);
        }

        return res.status(201).json('added to checkedout')



    } catch (err) {
        console.log(err);
        return res.status(500).json('could not add to checked out');
    }
}


module.exports = {
    getUserCartController,
    addToCartController,
    removeFromCartController,
    addToCheckedOutController
}