import bcrypt from 'bcrypt';
import { User } from '../models';
import reqHelper from '../helpers/reqHelper';
import createToken from '../helpers/userHelper';


/**
 * @class userController
 */
export default class userController {
 /**
   * @description Users details entered into the database
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
          status: 'Failed',
          errors
        });
      }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
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
            'Successfully created account', user
          )));
        });
    }).catch(error => reqHelper.error(res, 500, error.message));
  }
}