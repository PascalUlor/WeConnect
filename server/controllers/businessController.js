import models from '../models';

const { User, Business, Reviews } = models;

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
     * @param   {object} req   the server/http(s) req object
     * @param   {object} res  the server/http(s) res object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
  static createBusiness(req, res) {
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
      return res.status(409).send({ message: `Business with business name: ${businessName}, already exist in your catatlog` });
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
    }).then(business => res.status(201).json(Object.assign({
      success: true,
      message: 'Business created successfully'
    }, { business })))
      .catch(error => res.status(500).json({ success: 'False', message: error.message }));
  }).catch(error => res.status(500).json({ success: 'False', message: error.message }));
  }
  /**
     * Update a registered business to the business catalog
     * @memberof BusinessController
     * @static
     *
     * @param   {object} req   the server/http(s) req object
     * @param   {object} res  the server/http(s) res object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
    static updateBusiness(req, res) {
      console.log(parseInt(req.params.businessId, 10));
      console.log(req.params.businessId);
      const {
        businessName,
        email,
        address,
        category,
        location,
        businessImage,
        aboutUs
      } = req.body, { userId } = req.decoded;
      Business.findOne({
        where: {
          id: parseInt(req.params.businessId, 10)
        }
      }).then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Business with id does not exist'
          });
        } if (userId !== business.userId) {
          return res.status(401).send({
            message: 'Access Denied. You are not authorized to update this business',
          });
        }
        business.updateAttributes({
          businessName: (businessName) || business.businessName,
          email: (email) || business.email,
          address: (address) || business.address,
          category: (category) || business.category,
          location: (location) || business.location,
          businessImage: (businessImage) || business.businessImage,
          aboutUs: (aboutUs) || business.aboutUs
        })
        .then(() => res.status(200).send(business))
        .catch(error => res.status(400).send(error.toString()));
      })
      .catch(error => res.status(400).send(error.toString()));
    }
    /**
     * User can delete a registered business to the business catalog
     * @memberof BusinessController
     * @static
     *
     * @param   {object} req   the server/http(s) req object
     * @param   {object} res  the server/http(s) res object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
    static deleteBusiness(req, res) {
      const { userId } = req.decoded,
      businessID = parseInt(req.params.businessId, 10);

      Business.findById(businessID).then((business) => {
        if (business.userId === userId) {
          return Business.destroy({
            where: {
              id: businessID
            },
          }).then(() => res.status(200).json(Object.assign({
            success: true,
            message: 'Business successfully deleted'
          }, { business })));
        }
        return res.status(401).json({
          success: false,
          message: 'You are not authorised to delete this business'
        });
      }).catch(() => res.status(404).json({
        success: false,
        message: `Business with id ${businessID} does not exist`
      }));
    }
    /**
     * User can get a registered business on the business catalog
     * @memberof BusinessController
     * @static
     *
     * @param   {object} req   the server/http(s) req object
     * @param   {object} res  the server/http(s) res object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
    static getSingleBusiness(req, res) {
      const businessID = parseInt(req.params.businessId, 10);
      Business.findOne({
        where: {
          id: businessID
        }
      }).then((business) => {
        if (!business) {
          return res.status(404).send({ message: 'Business does not exist' });
        }
        return res.status(200).send(business);
      })
      .catch(error => res.status(404).send(error.toString()));
    }
    /**
     * User can get all registered business sorted and unsorted the business catalog
     * @memberof BusinessController
     * @static
     *
     * @param   {object} req   the server/http(s) req object
     * @param   {object} res  the server/http(s) res object
     *
     * @returns {object} insertion error messages object or
     * success message object
     */
    static getAllBusiness(req, res) {
      const { location, category } = req.query;
      if (location) {
        const businessLocation = location.replace(/ /g, '');
        return Business.findAll({
          where: {
            location: {
              $ilike: `%${businessLocation}%`
            }
          }
        }).then((business) => {
          if (business.length > 0) {
            return res.status(200).json(Object.assign({
              success: true,
              message: 'Search by location Successfull'
            }, { business }));
          }
          res.status(404).json({
              success: false,
              message: 'Search by location Failed'
          });
        }).catch(error => res.status(500).json(error.toString()));
      }
      if (category) {
        const businessCategory = category.replace(/ /g, '');
        return Business.findAll({
          where: {
            category: {
              $ilike: `%${businessCategory}%`
            }
          }
        }).then((business) => {
          if (business.length > 0) {
            return res.status(200).json(Object.assign({
              success: true,
              message: 'Search by category Successfull'
            }, { business }));
          }
          res.status(404).json({
            success: false,
            message: 'Search by category Failed'
          });
        }).catch(error => res.status(500).json(error.toString()));
      }
      if (location && category) {
        const businessLocation = location.replace(/ /g, '');
        const businessCategory = category.replace(/ /g, '');
        return Business.findAll({
          where: {
            location: {
              $ilike: `%${businessLocation}%`
            },
            category: {
              $ilike: `%${businessCategory}%`
            }
          }
        }).then((business) => {
          if (business.length > 0) {
            return res.status(200).json(Object.assign({
              success: true,
              message: 'Search Successfull'
            }, { business }));
          }
          res.status(404).json({
            success: false,
              message: 'Search Failed'
          });
        }).catch(error => res.status(500).json(error.toString()));
      }
      if (!location && !category) {
        return Business.findAll({
          include: [{
            model: Reviews,
            }],
        }).then((business) => {
          if (business.length > 0) {
            return res.status(200).json(Object.assign({
              success: true,
              message: 'Successfully Retrieved All Businesses'
            }, { business }));
          }
          res.status(404).json({
            success: false,
              message: 'Business does not exist'
          });
        }).catch(error => res.status(500).json(error.toString()));
      }
    }
}