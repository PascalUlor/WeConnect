import models from '../models';

const {
 User, Business, Reviews,
} = models;

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
    // const {
    //   businessName,
    //   email,
    //   address,
    //   category,
    //   location,
    //   aboutUs,
    //   businessImage
    // } = req.body;

      Business.create({
        businessName: req.body.businessName,
        email: req.body.email,
        address: req.body.address,
        category: req.body.category,
        location: req.body.location,
        aboutUs: req.body.aboutUs,
        businessImage: req.body.businessImage,
        userId: req.decoded.id
      }).then(business => res.status(201).send(business))
        .catch(error => res.status(400).send(error));
  }
}