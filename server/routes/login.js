const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');
const { MESSAGES, KEY } = require('../../constant/index');
import handlerVerifyUser from '../middleware/auth';

const UserModel = require('../../models/user.model.js');

router.post('/register', async function (req, res) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user === null) {
      const { username, password, firstName, lastName } = req.body;
      const hash = await bcryptjs.hash(password, 8);
      const User = new UserModel({ username, password: hash, firstName, lastName });
      const userCreate = await User.save();
      return res.json({ code: 200, message: null, data: { userCreate } });
    } else {
      return res.json({ code: 200, message: MESSAGES.USERNAME_EXISTED, data: null })
    }
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
});

router.post('/login', async function (req, res) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user === null) { return res.json({ code: 401, message: MESSAGES.USERNAME_WRONG, data: null }) };
    const result = await bcryptjs.compare(req.body.password, user.password);
    if (result) {
      var token = jwt.sign({ _id: user._id, lastLogout: user.lastLogout, lastChangedPassword: user.lastChangedPassword }, KEY);

      return res.json({
        code: 200,
        message: MESSAGES.LOGIN_SUCCESS,
        data: { user },
        token
      });
    } else {
      return res.json({ code: 400, message: MESSAGES.PASSWORD_WRONG, data: null });
    }
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
})

router.post('/logout', handlerVerifyUser, async function (req, res) {
  try {
    await UserModel.findByIdAndUpdate(req._user._id, { lastLogout: new Date() })

    return res.json({
      code: 200,
      message: MESSAGES.LOGOUT_SUCCESS
    });
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
})

router.post('/changePassword', async function (req, res) {
  try {
    const { username, password, newPassword } = req.body;
    const hashNewPassword = await bcryptjs.hash(newPassword, 8);
    const date = new Date();

    const user = await UserModel.findOne({ username });
    const result = await bcryptjs.compare(user.password, password);

    if (!user) {
      return res.json({ code: 400, message: MESSAGES.USERNAME_WRONG, data: null });
    }

    if (!result) {
      return res.json({ code: 400, message: MESSAGES.PASSWORD_WRONG, data: null });
    }

    await UserModel.findByIdAndUpdate(user._id, { lastChangedPassword: date, password: hashNewPassword });
    var token = jwt.sign({ _id: user._id, lastLogout: user.lastLogout, lastChangedPassword: date }, KEY);

    return res.json({
      code: 200,
      message: MESSAGES.CHANGED_PASSWORD_SUCCESS,
      token
    });
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
})

export default router;