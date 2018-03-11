import db from '../dataModel/testData';

/**
 * Class for search by category
 * @class search
 */
export default class searchClass {
    /**
     * query db by criteria
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} insertion error messages or success messages
     */
    static getSearch(req, res, next) {
        const { location, category } = req.query;
        const businessLocation = [];
        const businessCategory = [];
        if (location) {
            for (let i = 0; i < db.businessData.length; i += 1) {
                if (location.toLowerCase() === db.businessData[i].location.toLowerCase()) {
                    businessLocation.push(db.businessData[i]);
                }
            }
            return res.status(200).json(businessLocation);
        }
        if (category) {
            for (let i = 0; i < db.businessData.length; i += 1) {
                if (category.toLowerCase() === db.businessData[i].category.toLowerCase()) {
                    businessCategory.push(db.businessData[i]);
                }
            }
            return res.status(200).json(businessCategory);
        } else if (!location || !category) {
            next();
        }
    }
}