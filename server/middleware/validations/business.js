import validator from 'validator';

/**
 * Validate Business POST and GET req
 * @class Validation
 */
export default class businessValidation {
    /**
     *  @description validate business details on create and get business operations
     * @memberof businessValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
    static createBusinessValidation(req, res, next) {
        if (req.body.businessName === undefined || req.body.email === undefined || req.body.category === undefined || req.body.location === undefined || req.body.address === undefined || req.body.aboutUs === undefined) {
            return res.status(422).json({ success: false, message: 'Some or all fileds are undefined' });
        }
        const businessName = req.body.businessName.trim(),
              email = req.body.email.trim(),
              category = req.body.category.trim(),
              location = req.body.location.trim(),
              address = req.body.address.trim(),
              aboutUs = req.body.aboutUs.trim(),
              errors = {};

        if (!validator.isEmpty(businessName)) {
            if (businessName.search(/[^A-Za-z\s]/) !== -1) {
                errors.businessName = 'Business name must be alphabetical';
            }
        } else { errors.businessName = 'Business name is required' }

           // validate businessName
           if (!(validator.isEmpty(businessName))) {
            if (!(validator.isLength(businessName, { min: 3, max: 50 }))) {
                errors.businessName = 'Business name must be between 3 to 50 characters';
            }
         } else {
             errors.businessName = 'Business name is required';
         }

         // validate business aboutUs
         if (!(validator.isEmpty(aboutUs))) {
             if (!(validator.isLength(aboutUs, { min: 20, max: 1000 }))) {
                 errors.aboutUs = 'About us field must be between 20 to 1000 characters';
             }
          } else {
              errors.aboutUs = 'The About us field is required';
          }

         // Validate email
         if (!(validator.isEmail(email))) {
             errors.email = 'valid email is required';
         }

         // validate category
         if (validator.isEmpty(category)) {
             errors.category = 'category is required';
         }

         // validate location
         if (validator.isEmpty(location)) {
             errors.location = 'location is required';
         }

         // validate address
         if (validator.isEmpty(address)) {
            errors.address = 'Address is required';
        }

         if (Object.keys(errors).length !== 0) {
             return res.status(400).json(errors);
         } next();
         }

     /**
     *  @description validate business details on create and get business operations
     * @memberof businessValidation
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} get error message
     */
    static updateBusinessValidation(req, res, next) {
        const {
 businessName, email, category, location, address, businessImage, aboutUs
} = req.body,
        businessID = parseInt(req.params.businessId, 10),
        errors = {};

        if (!Number.isNaN(businessID)) {
            if (!(businessName || email || category || location || address || aboutUs || businessImage)) {
                return res.status(422).json({ success: false, message: 'Enter a valid update' });
            }
            if (businessName) {
                if (businessName.search(/[^A-Za-z\s]/) !== -1) {
                    errors.businessName = 'Business name must be alphabetical';
                } else if (!(validator.isLength(businessName, { min: 3, max: 50 }))) {
                    errors.businessName = 'Business name must be between 3 to 50 characters';
                }
            }
             // validate business aboutUs
             if (aboutUs) {
              if (!(validator.isLength(aboutUs, { min: 20, max: 1000 }))) {
                errors.aboutUs = 'About us field must be between 20 to 1000 characters';
                }
              }

             // Validate email
             if (email) {
              if (!(validator.isEmail(email))) {
                errors.email = 'valid email is required';
              }
             }
             if (Object.keys(errors).length !== 0) {
                 return res.status(400).json(errors);
             } next();
        }
    }
    }