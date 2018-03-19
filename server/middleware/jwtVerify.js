import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();


/**
 * Ensures all routes are protected
 * @function
 *
 * @param   {object} req   the server/http(s) request object
 * @param   {object} res  the server/http(s) response object
 * @param   {object} next      the node/express middleware next object
 *
 * @returns {object} failure error message object on denied requestuest or user decoded data object on granted requestuest
 */
const authToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies token and checks if expired or invalid
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed. Token is invalid or expired' });
      }
        // if everything is authentication is valid, save to requestuest for use in other routes
        req.decoded = decoded;
        next();
    });
  } else {
    return res.status(403).json({ message: 'Access denied. You are not logged in'});
  }
};

export default authToken;
