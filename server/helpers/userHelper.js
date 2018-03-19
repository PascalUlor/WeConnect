import jwt from 'jsonwebtoken';
import env from 'dotenv';
import reqHelper from './reqHelper';

env.config();

const createToken =
  (req, res, statusCode, message, user) => {
    const payload = { userName: user.userName, userId: user.id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 60 * 60
    });
    req.token = token;
    const feedback = {
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email
      },
      token
    };
    reqHelper.success(res, statusCode, message, feedback);
  };

export default createToken;
