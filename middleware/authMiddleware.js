const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const verifyToken = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
    const userData = await User.findOne({email: verifyToken.email}).select({password: 0})
  
    req.user = userData
    req.token = token
    req.userId = userData._id
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token not found" });
  }
};

module.exports = authMiddleware;
