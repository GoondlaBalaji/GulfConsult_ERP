const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No authorization token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gc_erp_super_secret_jwt_key_2026_balaji');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }
    if (!roles.includes(req.user.role_vc) && req.user.role_vc !== 'System Administrator') {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden: Requires one of [${roles.join(', ')}] role.` 
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole,
};
