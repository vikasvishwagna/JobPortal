// import jwt from "jsonwebtoken";

// const isAunthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
//     console.log('isToken', token)
//     if (!token) {
//       return res.status(401).json({
//         message: "User not authenticated",
//         success: false,
//       });
//     }

//     const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log('decode', decode)
//     if (!decode) {
//       return res.status(401).json({
//         message: "Invalid token",
//         success: false,
//       });
//     }

//     req.id = decode.userId;
//     next();

//   } catch (error) {

//   }
// };

// export default isAunthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log('Token from cookie:', token);

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Decoded token:', decoded);

    req.id = decoded.userId;
    next();

  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
