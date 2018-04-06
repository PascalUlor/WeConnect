import bcrypt from 'bcrypt';
import reqHelper from '../helpers/requestHelper';
import createToken from '../helpers/userToken';
import { User } from '../models';

/**
 * @class userController
 */
export default class userController {
 /**
   * @description Users details are entered into the database to create account
   * @memberof userController
   * @static
   *
   * @param   {object} req the server/http(s) request object
   * @param   {object} res the server/http(s) response object
   *
   * @returns {object} failure or success message
   * object with the persisted database data
   */
  static userSignUp(req, res) {
    const {
 fullName, userName, email, profileImage, location, aboutMe
} = req.body;
    return User.findOne({
      where: {
        $or: [
          { userName: { $iLike: userName } },
          { email: { $iLike: email } }
        ]
      }
    }).then((found) => {
      const errors = {};
      if (found) {
        if (found.userName === userName) {
          errors.userName = 'Username already exist';
        }
        if (found.email === email) {
          errors.email = 'Email already exist';
        }
        return res.status(409).json({
          success: false,
          errors
        });
      }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          User.create({
            fullName,
            userName,
            email,
            profileImage,
            location,
            aboutMe,
            password: hash
          }).then(user => (createToken(
             req, res, 201,
            'Signup successfull. You may proceed', user
          )));
        });// bcrypt end
    }).catch(error => reqHelper.error(res, 500, error.message));
  }

/**
   * @description Users can log into the database
   * @memberof userController
   * @static
   *
   * @param   {object} req the server/http(s) request object
   * @param   {object} res the server/http(s) response object
   *
   * @returns {object} failure or success message
   * object with the persisted database data
   */
  static userLogin(req, res) {
    const { userName, password } = req.body,
      errors = { form: 'Invalid username or password' };

    return User.findOne({
      where: {
        userName: {
          $iLike: userName
        }
      }
    }).then((user) => {
      if (user && user.userName.toLowerCase === userName.toLowerCase) {
        const check = bcrypt.compareSync(password, user.password);
        if (check) {
          return createToken(req, res, 200, 'You are Succesfully Logged in', user);
          }
        return res.status(401).json({
          succes: false,
          errors
        });
      }
      return res.status(401).json({
        success: false,
        errors
      });
    }).catch(error => reqHelper.error(res, 500, error.message));
  }
  /**
   * @description get Users from the database
   * @memberof userController
   * @static
   *
   * @param   {object} req the server/http(s) request object
   * @param   {object} res the server/http(s) response object
   *
   * @returns {object} failure or success message
   * object with the persisted database data
   */
  static getUser(req, res) {
    const { userId } = req.decoded;

    User.findOne({
      where: { id: userId },
      attributes: [
        'id', 'fullName', 'userName', 'email', 'profileImage', 'location', 'aboutMe'
      ]
    }).then(user => (reqHelper
      .success(res, 200, 'Found User', { user })))
      .catch(() => reqHelper.error(res, 500, 'Internal server error'));
  }
}