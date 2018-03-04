import { signupData, loginData, businessData } from '../dataModel/testData';

/*API route class*/

export default class appControll {
    /*Method to register a business*/
    static regBusiness(req, res) {
        let newUserId;

        if (businessData.length === 0) {
            newUserId = 1;
        } else {
            newUserId = (businessData[businessData.length - 1].id) + 1;
        }

        try {
            businessData.push({
                id: newUserId,
                userName: req.body.userName,
                password: req.body.password,
                businessName: req.body.businessName,
                email: req.body.email,
                category: req.body.category,
                Address: req.body.Address,
                state: req.body.state,
                city: req.body.city
            });
            res.status(201);
            res.json({
                status: 'Success',
                message: 'Business created successfully',
                businessData
            });
        } catch (e) {
            res.status(500);
            res.json({
                status: 'Failed',
                message: 'Error. Could not created'
            });
        }
    }
}// End of Class