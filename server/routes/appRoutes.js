import express from 'express';
import appControll from '../controller/appController';

const router = express.Router();

router.route('/businesses')
    .post(appControll.regBusiness);

export default router;