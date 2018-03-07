import { signupData, loginData, businessData, reviewsData } from '../dataModel/testData';

/**
 * Class for /api/ routes
 * @class appControll
 */
export default class appControll {
    /**
     * API method to (POST) register a business
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     */
    static regBusiness(req, res) {
        let newBusId;

        if (businessData.length === 0) {
            newBusId = 1;
        } else {
            newBusId = (businessData[businessData.length - 1].id) + 1;
        }

        try {
            businessData.push({
                id: newBusId,
                businessName: req.body.businessName,
                email: req.body.email,
                category: req.body.category,
                Address: req.body.Address,
                state: req.body.state,
                city: req.body.city
            });
            res.status(201);
            res.json({
                status: 'Success',
                message: 'Business created successfully',
                businessData
            });
        } catch (e) {
            res.status(500);
            res.json({
                status: 'Failed',
                message: 'Error. Could not created'
            });
        }
    }// Method to Register Business ends
    /**
     * API method to (PUT) update a Business Profile
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} with success or error message
     */
    static updateBusiness(req, res) {
        const {
 businessName, email, category, Address, state, city
} = req.body;
        for (let i = 0; i < businessData.length; i += 1) {
            if (businessData[i].id === parseInt(req.params.id, 10)) {
                if (businessName || email || category || Address || state || city) {
                    businessData[i].businessName = (businessName) || businessData[i].businessName;
                    businessData[i].email = (email) || businessData[i].email;
                    businessData[i].category = (category) || businessData[i].category;
                    businessData[i].Address = (Address) || businessData[i].Address;
                    businessData[i].state = (state) || businessData[i].state;
                    businessData[i].city = (city) || businessData[i].city;
                    res.status(200);
                    res.json({
                        status: 'Successfull',
                        message: `Business with id ${i + 1} successfully update`,
                        businessData
                    });
                } else {
                    res.status(400);
                    res.json({
                        status: 'Failed',
                        message: 'Data to update not specified',
                        businessData
                    });
                }
            }
        }
        res.status(400);
        res.json({
            status: 'Failed',
            message: 'Business with id does not exist'
        });
    } // Method to Updat business ends
    /**
     * API method DELETE a particular business from businessData
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insert success message
     */
    static deleteBusiness(req, res) {
        if (parseInt(req.params.id, 10) in businessData.map(business => business.id)) {
            const newBusinessList = businessData.filter(business => business.id !== parseInt(req.params.id, 10));
            res.status(200);
            res.json({
                status: 'successful',
                message: 'business successfully deleted',
                newBusinessList
            });
        } else {
            res.status(400);
            res.json({
                status: 'Failed',
                message: 'Business with id does not exist'
            });
        }
    }// Method to delete business ends
    /**
     * API method GET all businesses from businessData
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static getAllBusiness(req, res) {
        if (businessData.length !== 0) {
            if (!req.query.sort) {
                res.status(200);
                res.json({
                status: 'succesful',
                message: 'successfully all businesses',
                businessData
            });
            }
        } else {
            res.status(400);
            res.json({
                status: 'failed',
                message: 'No business availabel'
            });
        }
    }
    /**
     * API method POST reviews for businesses
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static postReview(req, res) {
        let newReviewId;

        if (businessData.length === 0) {
            newReviewId = 1;
        } else {
            newReviewId = (reviewsData[reviewsData.length - 1].id) + 1;
        }
        try {
            if (parseInt(req.params.id, 10) in businessData.map(business => business.id)) {
                reviewsData.push({
                    id: newReviewId,
                    reviewDetail: req.body.reviewDetail,
                    userId: 3,
                    businessId: req.body.businessId
                });
                res.status(201);
                res.json({
                    status: 'sucessful',
                    meassage: 'succesful',
                    reviewsData
                });
            } else {
                res.status(400);
                res.json({
                    status: 'failed',
                    message: 'No reviews available'
                });
            }
        } catch (e) {
            res.status(500);
            res.json({
                status: 'Failed',
                meassage: 'error adding reviews'
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
        for (let i = 0; i < businessData.length; i += 1) {
            if (businessData[i].id === parseInt(req.params.id, 10)) {
                res.status(200);
                res.json({
                    status: 'successful',
                    message: 'Retrieve Business',
                    data: businessData[i]
                });
            } else {
                res.status(400);
                res.json({
                    status: 'Failed',
                    message: 'Business does not exist'
                });
            }
        }
    }// getSingleBusiness ends
    /**
     * API method to GET reviews for a particular business
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static getReviews(req, res) {
      if (parseInt(req.params.id, 10) in reviewsData.map(reviews => reviews.businessId)) {
        const businessReview = reviewsData.filter(reviews => reviews.businessId === parseInt(req.params.id, 10));
          res.status(200);
          res.json({
              status: 'succesfull',
              message: 'retrieved reviews',
              businessReview
});
              } else {
            res.json({
              status: 'failed',
              message: 'failed to retrieved reviews'
});
         }
  }
}// class End