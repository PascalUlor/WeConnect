import express from 'express';
import businessController from '../controller/businessController';
import userController from '../controller/usersController';
import reviewsController from '../controller/reviewsController';
import userValidation from '../middleware/validations/user';
import authToken from '../middleware/jwtVerify';

const router = express.Router();

router.route('/businesses')
    .post(authToken, businessController.regBusiness)
    .get(businessController.getAllBusiness);

router.route('/businesses/:businessId')
    .put(authToken, businessController.updateBusiness)
    .delete(authToken, businessController.deleteBusiness)
    .get(businessController.getSingleBusiness);

router.route('/businesses/:businessId/reviews')
    .post(authToken, reviewsController.postReview)
    .get(reviewsController.getReviews);

router.route('/auth/signup')
    .post(userValidation.userSignUp, userController.userSignUp);
router.route('/auth/login')
    .post(userController.userLogin);

export default router;