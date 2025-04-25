// Middleware to check if the authenticated user is an admin
const admin = (req, res, next) => {
  // If the user's role is not 'admin', deny access
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  // Otherwise, proceed to the next middleware or route handler
  next();
};

module.exports = admin;