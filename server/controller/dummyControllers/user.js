import bcrypt from 'bcrypt';
import db from '../../dataModel/testData';
/**
 * Class for /api/ routes
 * @class appControll
 */
export default class userController {
    /**
     * API method to signup user
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
    static userSignup(req, res) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          const { fullname, userName, email } = req.body;
          const password = hash;
        if (!userName || !password || !fullname || !email) {
        return res.status(400).json({
            status: 'failed',
            message: 'Some or all fields have not been filled',
            error: true
          });
        }
        const target = userName;
        const found = db.userDb.find(user => user.userName === target);
        if (found) {
          return res.status(400).json({
                status: 'failed',
                message: 'Username already exist',
                error: true
              });
        }
        db.userDb.push(req.body);
        return res.status(200).json({
          status: 'successfull',
          message: 'Signup successfull. You may proceed',
          error: false,
        });
        });
      }// signup end
      /**
       * API method for user login
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} success message
       */
      static userLogin(req, res) {
        const { userName, password } = req.body;
        const target = userName;
        const token = password;
        const found = db.userDb.find(user => user.userName === target);
        const pass = db.userDb.find(user => user.password === token);
        if (found && pass) {
          return res.status(200).json({
                  status: 'succesfull',
                  message: 'Login Successfull, You may proceed',
                  error: false
                });
        }
       res.status(401).json({
          status: 'Failed',
          message: 'Access Denied',
          error: true
        });
      }
}