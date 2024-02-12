// middleware/authMiddleware.js

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      } else {
        // Check if the decoded user is an admin
        if (decoded.user === 'admin') {
          req.user = decoded;
          next();
        } else {
          return res.status(403).json({ message: 'Forbidden: Not an admin' });
        }
      }
    });
  };

  module.exports = {
    verifyToken
  };
