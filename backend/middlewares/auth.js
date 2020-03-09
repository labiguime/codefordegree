const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json("Access denied. No token Provided");
  try {
    const decoded_payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user_id = decoded_payload;
    next();
  } catch (exception) {
    return res.status(400).json({error: "Invalid token"});
  }
};
