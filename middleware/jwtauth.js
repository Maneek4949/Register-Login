import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; 

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};



export default jwtAuth;