import validator from 'validator';

/**
 * Validate users on signup and login
 * @class Validation
 */
export default class userValidation {
  /**
   *  @description validate user details on signup operations
   * @memberof userValidation
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} get error message
   */
    static userSignUp(req, res, next) {
      const {
 fullName, userName, email, password
} = req.body,
             errors = {};
      if (!fullName || !userName ||
      typeof email === 'undefined' || typeof password === 'undefined') {
        return res.status(422).send({ message: 'Some or all fileds are undefined' });
      }

      if (!validator.isEmpty(fullName)) {
        if (fullName.search(/[^A-Za-z\s]/) !== -1) {
          errors.fullName = 'Full name can only be alphabetical';
        }
      } else { errors.fullName = 'Full name is requred'; }

      if (!validator.isEmpty(userName)) {
        if (!validator.toInt(userName)) {
          if (!validator.isLength(userName, { min: 3, max: 25 })) {
            errors.userName = 'Username must be between 3 and 25 characters';
          }
        } else { errors.userName = 'Username must not start with numbers'; }
      } else { errors.userName = 'userName is required'; }

      if (!validator.isEmpty(email)) {
        if (!validator.isEmail(email)) {
          errors.email = 'Invalid email';
        }
      } else { errors.email = 'Email is required'; }

      if (!validator.isEmpty(password)) {
        if (!validator.isLength(password, { min: 8, max: 30 })) {
          errors.password = 'password must be between 8 and 30 characters';
        }
      } else { errors.password = 'password is required'; }

      if (Object.keys(errors).length !== 0) {
        return res.status(400).json(errors);
      } next();
    }
}