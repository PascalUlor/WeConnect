import db from '../../dataModel/testData';

/**
 * Class for /api/ routes
 * @class appControll
 */
export default class businessController {
    /**
     * API method to (POST) register a business
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     */
    static regBusiness(req, res) {
        db.businessData.push({
            id: db.businessData.length + 1,
            businessName: req.body.businessName,
            email: req.body.email,
            category: req.body.category,
            location: req.body.location,
            Address: req.body.Address,
            Details: req.body.Details
        });
        res.status(201);
        res.json({
            status: 'Success',
            message: 'Business created successfully',
            data: db.businessData
        });
}// Method to Register Business ends
/**
 * API method to (PUT) update a Business Profile
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} with success or error message
 */
static updateBusiness(req, res) {
    const {
businessName, email, category, Address, location, Details
} = req.body;
const index = parseInt(req.params.id, 10);
  const edit = {
  id: index,
  businessName,
  email,
  category,
  Address,
  location,
  Details
  };
    const found = db.businessData.find(business => business.id === index);
      if (found) {
        db.businessData[index - 1] = edit;
         return res.status(200).json({
          status: 'Successfull',
          message: 'Business with id successfully update',
          data: db.businessData
          });
      }
        return res.status(400).json({
          status: 'Failed',
          message: 'Business with id does not exist'
          });

} // Method to Update business ends
/**
 * API method DELETE a particular business from businessData
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} insert success message
 */
static deleteBusiness(req, res) {
  for (let i = 0; i < db.businessData.length; i += 1) {
    if (db.businessData[i].id === parseInt(req.params.id, 10)) {
    db.businessData.splice(i, 1);
        return res.status(200).json({
            status: 'Successfull',
            message: 'Business successfully deleted'
        });
   }
  }
        res.status(400);
        res.json({
            status: 'Failed',
            message: 'Business with id does not exist'
        });
}// Method to delete business ends
/**
 * API method GET all businesses from businessData
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
static getAllBusiness(req, res) {
    if (db.businessData.length !== 0) {
        if (!req.query.sort) {
            res.status(200);
            res.json({
            status: 'Successfull',
            message: 'Successfully Retrieved all businesses',
            data: db.businessData
        });
        }
    } else {
        res.status(404);
        res.json({
            status: 'Failed',
            message: 'No business available'
        });
    }
}
/**
     * API method to GET a particular businesses
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static getSingleBusiness(req, res) {
        for (let i = 0; i < db.businessData.length; i += 1) {
            if (db.businessData[i].id === parseInt(req.params.id, 10)) {
                return res.status(200).json({
                    status: 'Successfull',
                    message: 'Successfully Retrieved Business',
                    data: db.businessData[i]
                });
            }
          }
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Business does not exist'
                });
    }// getSingleBusiness ends
}