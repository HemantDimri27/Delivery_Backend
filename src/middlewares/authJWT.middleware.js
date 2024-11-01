import { verifyToken } from "../utilities/jwtUtilities.js";

const authJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  
    if (!token) {
        console.log("No toke found in authJWT");
      return res.json({ message: 'No token found in authJwT' });
    }
  
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next(); 
    } catch (error) {
      return res.json({ message: 'Error in verify token' });
    }
  };


  export default authJWT;