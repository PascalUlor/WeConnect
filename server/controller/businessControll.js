import models from '../models';
import reqHelper from '../helpers/reqHelper';

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
      address,
      category,
      location,
      businessImage,
      aboutUs
    } = req.body, { userId } = req.decoded;
  Business.findOne({ where: { businessName, userId } }).then((found) => {
    if (found && found.businessName === businessName) {
      return reqHelper.error(
        res, 409,
        `Business with name:${businessName}, already exist in your catalog`
      );
    }

    return Business.create({
      businessName,
      email,
      address,
      category,
      location,
      businessImage,
      aboutUs,
      userId
    }).then(business => reqHelper.success(
      res, 201,
      'Successfully registered new business', { business }
    ))
      .catch(error => reqHelper.error(res, 500, error.message));
  }).catch(error => reqHelper.error(res, 500, error.message));
  }
}