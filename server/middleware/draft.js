Business.findOne({ where: { businessName } }).then((found) => {
    if (found && found.businessName === businessName) {
      return res.status(409).send({ message: `Business with business name: ${businessName}, already exist in your catatlog` });
    }
}).catch(error => res.status(400).send(error));



import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import models from '../models';

import config from '../config/config.json';

const saltRounds = 10;
let password = '';
const { User } = models;

/**
 * @class User
 */
export default class userController {
    /**
     * @returns {Object} userSignUp
     * @param {param} req
     * @param {param} res
     */
    static userSignUp(req, res) {
       User.findOne({
          where: {
            email: req.body.email
          }
        }).then((user) => {
          if (user) {
            return res.status(404).send({
              message: 'Email Already Exists',
            });
          }
        User.create({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            location: req.body.location,
            profileImage: req.body.profileImage,
            aboutMe: req.body.aboutUs,
            hashPassword: bcrypt.hashSync(req.body.password, saltRounds),
          })
            .then(res.status(201).send({
              message: 'Registration Successful',
            }))
            .catch(error => res.status(400).send(error));
        });
      }
      /**
       * @returns {Object} signIn
       * @param {param} req
       * @param {param} res
       */
      static userLogin(req, res) {
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          password = bcrypt.compareSync(req.body.password, user.hashPassword);
          if (password) {
            res.json({
              jwt: jwt.sign(
                {
                  id: user.id,
                  fullName: user.fullName,
                  userName: user.userName,
                  email: user.email,
                  location: user.location,
                  profileImage: user.profileImage,
                  aboutMe: user.aboutUs,
                }, config.JWT_SECRET,
                { expiresIn: 60 * 60 }
              ),
              email: user.email,
              id: user.id,
            });
          } else {
            res.status(401).send({
              message: 'Invalid Password',
            });
          }
        })
          .catch(error => res.status(401).send(error));
      }
    }