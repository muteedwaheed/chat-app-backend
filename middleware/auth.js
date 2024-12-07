const jsonToken = require("jsonwebtoken");

const middleWare = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(400).json({ success: false, msg: "token not found" });
    }
    const decrypt = jsonToken.verify(token, "chatApp-secure-key");
    req.user = decrypt;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "error message" });
  }
  return next();
};

module.exports = middleWare;
