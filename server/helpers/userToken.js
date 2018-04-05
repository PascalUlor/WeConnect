import jwt from 'jsonwebtoken';
import env from 'dotenv';
import reqHelper from './requestHelper';

env.config();

const createToken = (req, res, statusCode, message, user) => {
    const payload = { userName: user.userName, userId: user.id };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 1440
            });
            const logInfo = {
              user: {
                id: user.id,
                userName: user.userName,
                email: user.email
              },
              token
            };
            reqHelper.success(res, statusCode, message, logInfo);
};

export default createToken;