import JWT from "jsonwebtoken";
import usermodels from "../models/usermodels.js";
// Protected Routes
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // If the token is valid, add the decoded user information to the request object
    req.user = decoded;
    next(); // Call next() to pass control to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Admin Authentication

export const isAdmin = async (req, res, next) => {
  try {
   
    const user = await usermodels.findById(req.user._id);


    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role !== 'admin') {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Admin Middleware',
      error: error.message,
    });
  }
};
