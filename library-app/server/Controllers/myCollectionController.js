const {getUserCartModel, addToCartModel} = require('../Models/myCollectionModel');

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
        console.log(intCart);
        const userId = req.userId;

        for (const bookId of intCart) {
            await addToCartModel(bookId,userId);
        };

        return res.status(201).json('added to cart');

    } catch (err) {
        console.log(err);
        return res.status(500);
    }
}

module.exports = {
    getUserCartController,
    addToCartController
}