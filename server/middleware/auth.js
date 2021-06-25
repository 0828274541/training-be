const jwt = require("jsonwebtoken");
const { MESSAGES, KEY } = require('../../constant/index');

const UserModel = require('../../models/user.model.js');

module.exports = async function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.json({
      code: 401,
      message: MESSAGES.TOKEN_INVALID,
      data: null
    })
  } else {
    try {
      const verified = jwt.verify(token, KEY);
      if (!verified) {
        return res.json({
          code: 401,
          message: MESSAGES.TOKEN_INVALID,
          data: null
        })
      }

      const user = await UserModel.findById(verified._id);

      if (!user) {
        return res.json({
          code: 401,
          message: MESSAGES.TOKEN_INVALID,
          data: null
        })
      }

      if (user.lastLogout > new Date(verified.lastLogout)) {
        
        return res.json({
          code: 401,
          message: MESSAGES.TOKEN_EXPIRED,
          data: null
        })
      }

      if (user.lastChangedPassword > new Date(verified.lastChangedPassword)) {
        return res.json({
          code: 401,
          message: MESSAGES.TOKEN_EXPIRED,
          data: null
        })
      }

      req._user = user;
      return next();
    } catch (err) {
      return res.json({
        code: 401,
        message: MESSAGES.TOKEN_INVALID,
        data: null
      })
    }
  }
}