import express from 'express';
import businessController from '../controller/businessController';
import userController from '../controller/usersController';
import authToken from '../middleware/jwtVerify';

const router = express.Router();

router.route('/businesses')
    .post(authToken, businessController.regBusiness);
//     .get(searchClass.getSearch, appControll.getAllBusiness);

router.route('/businesses/:businessId')
    .put(authToken, businessController.updateBusiness);
//     .delete(appControll.deleteBusiness)
//     .get(appControll.getSingleBusiness);

// router.route('/businesses/:id/reviews')
//     .post(appControll.postReview)
//     .get(appControll.getReviews);

router.route('/auth/signup')
    .post(userController.userSignUp);
router.route('/auth/login')
    .post(userController.userLogin);

export default router;