import validator from 'validator';

/**
 * Validates all routes
 * @class Validator
 */
export default class userValidation {
    /**
     * Validates all business details
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.body
     */
    static checkUser(req, res, next) {
        const {
 userName, email, fullname, password
} = req.body,
        errors = {};
        // check for undefined inputs
        if (userName === undefined || email === undefined || fullname === undefined) {
            res.status(400);
            res.json({
                status: 'Failed',
                message: 'Some or all fields are undefined'
            });
        } else {
            // validate userName
        if (validator.isEmpty(userName)) {
            errors.userName = 'userName is required';
        }

        // validate fullname
        if (validator.isEmpty(fullname)) {
             errors.fullname = 'fullname is required';
         }

        // Validate email
        if (!(validator.isEmail(email))) {
            errors.email = 'email is required';
        }
        // Validate password
        if (validator.isEmpty(password)) {
            errors.email = 'email is required';
        }


        if (Object.keys(errors).length !== 0) {
            return res.status(400).json(errors);
        } next();
        }
    }
}// end of classimport validator from 'validator';