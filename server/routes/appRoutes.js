import express from 'express';
import appControll from '../controller/appController';
import searchClass from '../middleware/search';
import validation from '../middleware/validation';

const router = express.Router();

router.route('/businesses')
    .post(validation.regBusinessValidation, appControll.regBusiness)
    .get(searchClass.getSearch, appControll.getAllBusiness);

router.route('/businesses/:id')
    .put(appControll.updateBusiness)
    .delete(appControll.deleteBusiness)
    .get(appControll.getSingleBusiness);

router.route('/businesses/:id/reviews')
    .post(appControll.postReview)
    .get(appControll.getReviews);

export default router;