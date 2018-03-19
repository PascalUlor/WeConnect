import models from '../models';

const { User, Business } = models;

/**
 * Class implementation for /api/v1/business routes
 * @class BusinessController
 */
export default class BusinessController {
    /**
     * Register a business to the business catalog
     * @memberof BusinessController
     * @static
     *
     * @param   {object} req   the server/http(s) request object
     * @param   {object} res  the server/http(s) response object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
  static regBusiness(req, res) {
    const {
      businessName,
      email,
      Address,
      category,
      location,
      businessImage,
      aboutUs
    } = req.body, { userId } = req.decoded;
  Business.findOne({ where: { businessName, userId } }).then((found) => {
    if (found && found.businessName === businessName) {
      return res.status(409).send({ message: `Business with business name: ${businessName}, already exist in your catatlog` });
    }

    return Business.create({
      businessName,
      email,
      Address,
      category,
      location,
      businessImage,
      aboutUs,
      userId
    }).then(business => res.status(201).json(Object.assign({
      status: 'Success',
      message: 'Successfully Registered Business'
    }), { business }))
      .catch(error => res.status(500).json({ status: 'Failed', message: error.message }));
  }).catch(error => res.status(500).json({ status: 'Server error', message: error.message }));
  }
}