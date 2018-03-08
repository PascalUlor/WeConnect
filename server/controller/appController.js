import bcrypt from 'bcrypt';
import { userDb, businessData, reviewsData } from '../dataModel/testData';

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
                location: req.body.location,
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
 businessName, email, category, Address, location, city
} = req.body;
        for (let i = 0; i < businessData.length; i += 1) {
            if (businessData[i].id === parseInt(req.params.id, 10)) {
                if (businessName || email || category || Address || location || city) {
                    businessData[i].businessName = (businessName) || businessData[i].businessName;
                    businessData[i].email = (email) || businessData[i].email;
                    businessData[i].category = (category) || businessData[i].category;
                    businessData[i].Address = (Address) || businessData[i].Address;
                    businessData[i].location = (location) || businessData[i].location;
                    businessData[i].city = (city) || businessData[i].city;
                    return res.status(200).json({
                        status: 'Successfull',
                        message: `Business with id ${i + 1} successfully update`,
                        businessData
                    });
                }
                    res.status(400);
                    res.json({
                        status: 'Failed',
                        message: 'Data to update not specified',
                        businessData
                    });
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
      for (let i = 0; i < businessData.length; i += 1) {
        if (businessData[i].id === parseInt(req.params.id, 10)) {
        businessData.splice(i, 1);
            return res.status(200).json({
                status: 'successful',
                message: 'business successfully deleted'
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
                message: 'error adding reviews'
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
            }
          }
                res.status(400);
                res.json({
                    status: 'Failed',
                    message: 'Business does not exist'
                });
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
  }// getReviews end
    /**
     * API method to signup user
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static userSignup(req, res) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }
        const { userName } = req.body;
        const password = hash;
      if (!userName || !password) {
      return res.status(400).json({
          status: 'failed',
          message: 'Some or all fields have not been filled',
          error: true
        });
      }
      for (let i = 0; i < userDb.length; i += 1) {
      if (userName === userDb[i].userName) {
        return res.status(400).json({
          status: 'failed',
          message: 'Username already exist',
          error: true
        });
      }
      }
      userDb.push(req.body);
      return res.status(200).json({
        status: 'successfull',
        message: 'Signup successfull. You may proceed',
        error: false,
      });
      });
    }// signup end
    /**
     * API method for user login
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static userLogin(req, res) {
    const { userName, password } = req.body;
      for (let i = 0; i < userDb.length; i += 1) {
      if (userName === userDb[i].userName && password === userDb[i].password) {
          return res.status(200).json({
          status: 'succesfull',
          message: 'Login Successfull, You may proceed',
          error: false
        });
      }
    }
      res.status(401).json({
        status: 'Failed',
        message: 'Access Denied',
        error: true
      });
    }
}// class End