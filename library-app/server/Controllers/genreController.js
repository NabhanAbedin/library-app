const {catalogGenreModel, searchCatalogGenreModel} = require('../Models/genreModel');

const catalogGenreController = async (req,res) => {
    try {
        const {orderBy} = req.query;
        const result = await catalogGenreModel(orderBy);
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(404).json('could not retrieve genres');
    };
};

const searchCatalogGenreController = async (req,res) => {
    try {
        const {query} = req.query;
        const result = await searchCatalogGenreModel(query);
        return res.json(result);
    } catch (err) {
        console.log(err);
    };
};

module.exports = {
    catalogGenreController,
    searchCatalogGenreController
}