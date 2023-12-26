const jwt = require("jsonwebtoken");
const CheckUser = (req, res, next) => {
  let header = req.header("auth-token");
  const dotenv = require('dotenv');
  dotenv.config();
  let privateKey = process.env.YOUR_PRIVATE_KEY;
  jwt.verify(header, privateKey, function (err, decoded) {
    if (err) {
      req.checker = 0;
      return;
    }
    req.user_id = decoded;
    req.checker = 1;
    return;
  });
  next();
};
module.exports = CheckUser;
