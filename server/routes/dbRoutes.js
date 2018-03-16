import express from 'express';
import business from '../controller/businessControll';

const router = express.Router();

router.route('/businesses')
    .post(business.regBusiness)
//     .get(searchClass.getSearch, appControll.getAllBusiness);

// router.route('/businesses/:id')
//     .put(appControll.updateBusiness)
//     .delete(appControll.deleteBusiness)
//     .get(appControll.getSingleBusiness);

// router.route('/businesses/:id/reviews')
//     .post(appControll.postReview)
//     .get(appControll.getReviews);

// router.route('/auth/signup')
//     .post(appControll.userSignup);
// router.route('/auth/login')
//     .post(appControll.userLogin);

export default router;