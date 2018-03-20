import jwt from 'jsonwebtoken';
import env from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../models';

env.config();

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
          }).then((user) => {
            const payload = { userName: user.userName, userId: user.id };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60
            });
            req.token = token;
            const logInfo = {
              user: {
                id: user.id,
                userName: user.userName,
                email: user.email
              },
              token
            };
            res.status(201)
            .json(Object.assign({
              status: 'Success',
              message: 'succesfully signed up'
}, logInfo));
          });
        });
    }).catch(error => res.status(500).json({ status: 'Failed', message: error.message }));
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
          const payload = { userName: user.userName, userId: user.id };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 3
            });
            req.token = token;
            const logInfo = {
              user: {
                id: user.id,
                userName: user.userName,
                email: user.email
              },
              token
            };
            return res.status(200)
            .json(Object.assign({
              status: 'Success',
              message: 'You are Succesfully Logged in'
}, logInfo));
          }
        return res.status(401).json({
          status: 'Failed',
          errors
        });
      }
      return res.status(401).json({
        status: 'Failed',
        errors
      });
    }).catch(error => res.status(500).json({ status: 'Failed', message: error.message }));
  }
}