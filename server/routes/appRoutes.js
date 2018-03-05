import express from 'express';
import appControll from '../controller/appController';

const router = express.Router();

router.route('/businesses')
    .post(appControll.regBusiness)
    .get(appControll.getBusiness);

router.route('/businesses/:id')
    .put(appControll.updateBusiness)
    .delete(appControll.deleteBusiness);

export default router;