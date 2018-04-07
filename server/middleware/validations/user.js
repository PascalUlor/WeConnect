import validator from 'validator';
import reqHelper from '../../helpers/requestHelper';

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
      if (req.body.fullName === undefined || req.body.userName === undefined || req.body.email === undefined || req.body.password === undefined) {
        return reqHelper.error(res, 422, 'Some or all fileds are undefined');
      }
      const fullName = req.body.fullName.trim(),
            userName = req.body.userName.trim(),
            email = req.body.email.trim(),
            password = req.body.password.trim(),
            errors = {};
      if (!validator.isEmpty(fullName)) {
        if (fullName.search(/[^A-Za-z\s]/) !== -1) {
          errors.fullName = 'Full name can only be alphabetical';
        }
      } else { errors.fullName = 'Full name is required'; }

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
        if (!validator.isLength(password, { min: 8 })) {
          errors.password = 'password must be at least 8 characters';
        }
      } else { errors.password = 'password is required'; }

      if (Object.keys(errors).length !== 0) {
        return res.status(400).json(errors);
      } next();
    }

  /**
   * @description validate user login operations
   * @memberof userValidation
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} get error message
   */
  static userLogin(req, res, next) {
    if (req.body.userName === undefined || req.body.password === undefined) {
      return reqHelper.error(res, 422, 'Username or password is undefined');
    }

    const userName = req.body.userName.trim(),
    password = req.body.password.trim(),
    errors = {};

    if (validator.isEmpty(userName)) {
      errors.userName = 'userName is required';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json(errors);
    } next();
  }

  /**
   * @description validate user update operations
   * @memberof userValidation
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} get error message
   */
  static updateUser(req, res, next) {
    if (req.body.fullName === undefined || req.body.userName === undefined || req.body.email === undefined || req.body.location === undefined || req.body.aboutMe === undefined) {
      return reqHelper.error(res, 422, 'Some or all fileds are undefined');
    }
    const fullName = req.body.fullName.trim(),
          userName = req.body.userName.trim(),
          email = req.body.email.trim(),
          location = req.body.location.trim(),
          aboutMe = req.body.aboutMe.trim(),
          errors = {};
    if (!validator.isEmpty(fullName)) {
      if (fullName.search(/[^A-Za-z\s]/) !== -1) {
        errors.fullName = 'Full name can only be alphabetical';
      }
    } else { errors.fullName = 'Full name is required'; }

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

  if (location) {
    if (location.search(/[^A-Za-z\s]/) !== -1) {
      errors.location = 'Location must be alphabetical';
    }
  } else { errors.location = ''; }

  if (aboutMe) {
    if (!validator.isLength(aboutMe, { min: 4 })) {
      errors.aboutMe = 'This field must be more than 4 characters long';
    }
  } else { errors.aboutMe = ''; }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json(errors);
    } next();
  }
}