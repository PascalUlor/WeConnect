import express from 'express';
import authToken from '../middleware/jwtVerify';
import businessController from '../controllers/businessController';
import userController from '../controllers/usersController';
import reviewsController from '../controllers/reviewsController';
import userValidation from '../middleware/validations/user';
import businessValidation from '../middleware/validations/business';


const router = express.Router();

router.route('/businesses')
    .post(authToken, businessValidation.createBusinessValidation, businessController.createBusiness)
    .get(businessController.getAllBusiness);

router.route('/businesses/:businessId')
    .put(authToken, businessValidation.updateBusinessValidation, businessController.updateBusiness)
    .delete(authToken, businessController.deleteBusiness)
    .get(businessController.getSingleBusiness);

router.route('/businesses/:businessId/reviews')
    .post(authToken, reviewsController.postReview)
    .get(reviewsController.getReviews);

// User Sign up and login
router.route('/auth/signup')
    .post(userValidation.userSignUp, userController.userSignUp);
router.route('/auth/login')
    .post(userController.userLogin);

// User profile routes
router.route('/user/profile')
    .get(authToken, userController.getUser);

export default router;