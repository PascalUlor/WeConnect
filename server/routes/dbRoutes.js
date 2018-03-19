import express from 'express';
import businessController from '../controller/businessControll';
import userController from '../controller/usersControll';
import authToken from '../middleware/jwtVerify';

const router = express.Router();

router.route('/businesses')
    .post(authToken, businessController.regBusiness);
//     .get(searchClass.getSearch, appControll.getAllBusiness);

// router.route('/businesses/:id')
//     .put(appControll.updateBusiness)
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