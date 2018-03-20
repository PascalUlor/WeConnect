import express from 'express';
// import appControll from '../controller/appController';
import userController from '../controller/dummyControllers/user';
import reviewController from '../controller/dummyControllers/reviews';
import businessController from '../controller/dummyControllers/business';
import searchClass from '../middleware/search';
import validation from '../middleware/validation';

const router = express.Router();

router.route('/businesses')
    .post(validation.regBusinessValidation, businessController.regBusiness)
    .get(searchClass.getSearch, businessController.getAllBusiness);

router.route('/businesses/:id')
    .put(businessController.updateBusiness)
    .delete(businessController.deleteBusiness)
    .get(businessController.getSingleBusiness);

router.route('/businesses/:id/reviews')
    .post(reviewController.postReview)
    .get(reviewController.getReviews);

router.route('/auth/signup')
    .post(userController.userSignup);
router.route('/auth/login')
    .post(userController.userLogin);

export default router;