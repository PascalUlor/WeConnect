import express from 'express';
import appControll from '../controller/appController';

const router = express.Router();

router.route('/businesses')
    .post(appControll.regBusiness)
    .get(appControll.getAllBusiness);

router.route('/businesses/:id')
    .put(appControll.updateBusiness)
    .delete(appControll.deleteBusiness)
    .get(appControll.getSingleBusiness);

router.route('/businesses/:id/reviews')
    .post(appControll.postReview)
    .get(appControll.getReviews);

export default router;