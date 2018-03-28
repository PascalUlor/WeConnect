import models from '../models';

const { User, Business, Reviews } = models;

/**
 * Class implementation for /api/v1/business routes
 * @class BusinessController
 */
export default class ReviewsController {
    /**
     * Post a review about a business to the business catalog
     * @memberof ReviewsController
     * @static
     *
     * @param   {object} req   the server/http(s) req object
     * @param   {object} res  the server/http(s) res object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
    static postReview(req, res) {
        const { reviewDetail } = req.body, { userId } = req.decoded, businessID = parseInt(req.params.businessId, 10);

        User.findById(userId).then((foundUser) => {
            Business.findById(businessID).then((foundBusiness) => {
                if (!foundBusiness) {
                    return res.status(404).send({ message: 'Business does not exist' });
                }
                Reviews.create({
                    reviewDetail,
                    userName: foundUser.userName,
                    profileImage: foundUser.profileImage,
                    userId,
                    businessId: businessID
                }).then((newReview) => {
                    if (newReview.userId === foundBusiness.userId) {
                       res.status(200).send({ message: 'Your review has been posted' });
                    }
                    return res.status(201).json(Object.assign({
                        status: 'Successfull',
                        message: 'Successfully posted new review'
                    }, { newReview }));
                }).catch(error => res.status(500).json({ status: 'Failed', message: error.message }));
            });
        });
    }

    /**
     * Retrieave all reviews for a business to the business catalog
     * @memberof ReviewsController
     * @static
     *
     * @param   {object} req   the server/http(s) req object
     * @param   {object} res  the server/http(s) res object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
    static getReviews(req, res) {
        const businessID = parseInt(req.params.businessId, 10);
        Business.findById(businessID).then((foundBusiness) => {
          if (!foundBusiness) {
            return res.status(404).send({ message: 'Business does not exist' });
          }
          return Reviews.findAll({
              where: {
                  id: businessID,
              },
          }).then((reviews) => {
            if (reviews.length > 0) {
              return res.status(200).json(Object.assign({
                status: 'Successfull',
                message: 'Successfully Retrieved All Reviews For This Business'
              }, { reviews }));
            }
            res.status(404).json({
              status: 'Failed',
                message: 'No Reviews for this business yet'
            });
          }).catch(error => res.status(500).json(error.toString()));
        });
      }
}