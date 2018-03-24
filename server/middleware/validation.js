import validator from 'validator';

/**
 * Validates all routes
 * @class Validator
 */
export default class Validation {
    /**
     * Validates all business details
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.body
     */
    static regBusinessValidation(req, res, next) {
        const {
 businessName, email, category, location, Details
} = req.body,
        errors = {};
        // check for undefined inputs
        if (businessName === undefined || email === undefined || category === undefined || location === undefined || Details === undefined) {
            res.status(400);
            res.json({
                status: 'Failed',
                message: 'Some or all fields are undefined'
            });
        } else {
            // validate businessName
        if (!(validator.isEmpty(businessName))) {
           if (!(validator.isLength(businessName, { min: 3, max: 50 }))) {
               errors.businessName = 'Business name must be between 3 to 50 characters';
           }
        } else {
            errors.businessName = 'Business name is required';
        }

        // validate business Details
        if (!(validator.isEmpty(Details))) {
            if (!(validator.isLength(Details, { min: 20, max: 1000 }))) {
                errors.Details = 'Business Details must be between 20 to 1000 characters';
            }
         } else {
             errors.Details = 'Business Details is required';
         }

        // Validate email
        if (!(validator.isEmail(email))) {
            errors.email = 'email is required';
        }

        // validate category
        if (validator.isEmpty(category)) {
            errors.category = 'category is required';
        }

        // validate location
        if (validator.isEmpty(location)) {
            errors.location = 'location is required';
        }

        if (Object.keys(errors).length !== 0) {
            return res.status(400).json(errors);
        } next();
        }
    } // business validation end
}// end of class