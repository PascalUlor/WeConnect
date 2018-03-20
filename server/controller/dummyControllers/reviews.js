import db from '../../dataModel/testData';
/**
 * Class for /api/ routes
 * @class appControll
 */
export default class reviewController {
    /**
     * API method POST reviews for businesses
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static postReview(req, res) {
        const bId = parseInt(req.params.id, 10);
        const found = db.businessData.find(bItem => bItem.id === bId);
        if (found) {
          db.reviewsData.push({
              id: db.reviewsData.length + 1,
              reviewDetail: req.body.reviewDetail,
              userId: parseInt(req.body.userId, 10),
              businessId: bId
              });
              return res.status(201).json({
              status: 'Successfull',
              message: 'Successfull',
              data: db.reviewsData
              });
            }
              return res.status(400).json({
              status: 'Failed',
              message: 'Business with id does not exist'
            });
    }

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
}