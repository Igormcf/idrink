const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

const JWT_SECRET = async () => fs.readFile('./jwt.evaluation.key', 'utf-8');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' }); 
  }

  try {
    const secret = await JWT_SECRET();

    const decodeToken = jwt.verify(token, secret);
    
    req.user = decodeToken;
    const { role } = decodeToken;

    if (role !== 'administrator') {
      return res.status(401).json({ message: 'Access denied!' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};