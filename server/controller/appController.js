import clientData from '../dataModel/data';

export default class appControll {
    static regBusiness(req, res) {
        let newUserId;

        if (clientData.length === 0) {
            newUserId = 1;
        } else {
            newUserId = (clientData[clientData.length - 1].id) + 1;
        }

        try {
            clientData.push({
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
                clientData
            });
        } catch (e) {
            res.status(500);
            res.json({
                status: 'failed',
                message: 'Error. Could not created'
            });
        }
    }
}