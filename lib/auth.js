import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return generateToken(user._id, user.role);
  }
  return null;
};

module.exports = { generateToken, verifyToken, authenticateUser };