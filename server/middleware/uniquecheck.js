const User = require("../models/Users");
const checker = async (req, res, next) => {
  const { email,username } = req.body;
  try {
    let user_mail = await User.findOne({ email: email });
    let usernamer = await User.findOne({ username: username });
    if (user_mail || usernamer) {
      req.checker = 1;
    } else {
      req.checker = 0;
    }
  } catch (error) {
    req.checker = 1;
  }
  next();
};
module.exports = checker;
