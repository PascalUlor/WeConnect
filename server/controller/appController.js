import bcrypt from 'bcrypt';
import db from '../dataModel/testData';

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

        if (db.businessData.length === 0) {
            newBusId = 1;
        } else {
            newBusId = (db.businessData[db.businessData.length - 1].id) + 1;
        }

        try {
            db.businessData.push({
                id: newBusId,
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
 businessName, email, category, Address, location, Details
} = req.body;
        for (let i = 0; i < db.businessData.length; i += 1) {
            if (db.businessData[i].id === parseInt(req.params.id, 10)) {
                if (businessName || email || category || Address || location || Details) {
                    db.businessData[i].businessName = (businessName) || db.businessData[i].businessName;
                    db.businessData[i].email = (email) || db.businessData[i].email;
                    db.businessData[i].category = (category) || db.businessData[i].category;
                    db.businessData[i].Address = (Address) || db.businessData[i].Address;
                    db.businessData[i].location = (location) || db.businessData[i].location;
                    db.businessData[i].Details = (Details) || db.businessData[i].Details;
                    return res.status(200).json({
                        status: 'Successfull',
                        message: 'Business with id successfully update',
                        data: db.businessData
                    });
                }
                    return res.status(400).json({
                        status: 'Failed',
                        message: 'Data to update not specified'
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
            res.status(400);
            res.json({
                status: 'Failed',
                message: 'No business available'
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

        if (db.businessData.length === 0) {
            newReviewId = 1;
        } else {
            newReviewId = (db.reviewsData[db.reviewsData.length - 1].id) + 1;
        }
        try {
            if (parseInt(req.params.id, 10) in db.businessData.map(business => business.id)) {
                db.reviewsData.push({
                    id: newReviewId,
                    reviewDetail: req.body.reviewDetail,
                    userId: parseInt(req.body.userId, 10),
                    businessId: parseInt(req.body.businessId, 10)
                });
                return res.status(201).json({
                    status: 'Successfull',
                    message: 'Successfull',
                    data: db.reviewsData
                });
            }
                return res.status(400).json({
                    status: 'Failed',
                    message: 'No reviews available'
                });
        } catch (e) {
            res.status(500).json({
                status: 'Failed',
                message: 'Error adding reviews'
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
    /**
     * API method to GET reviews for a particular business
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static getReviews(req, res) {
      if (parseInt(req.params.id, 10) in db.reviewsData.map(reviews => reviews.businessId)) {
        const businessReview = db.reviewsData.filter(reviews => reviews.businessId === parseInt(req.params.id, 10));
          res.status(200);
          res.json({
              status: 'succesfull',
              message: 'retrieved reviews',
              businessReview
});
              } else {
            return res.status(404).json({
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
        const { fullname, userName, email } = req.body;
        const password = hash;
      if (!userName || !password || !fullname || !email) {
      return res.status(400).json({
          status: 'failed',
          message: 'Some or all fields have not been filled',
          error: true
        });
      }
      for (let i = 0; i < db.userDb.length; i += 1) {
      if (userName === db.userDb[i].userName) {
        return res.status(400).json({
          status: 'failed',
          message: 'Username already exist',
          error: true
        });
      }
      }
      db.userDb.push(req.body);
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
      for (let i = 0; i < db.userDb.length; i += 1) {
      if (userName === db.userDb[i].userName && password === db.userDb[i].password) {
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