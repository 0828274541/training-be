const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const { MESSAGES } = require('../../../constant/index');
const UserModel = require('../../../models/user.model.js');
const handlerCheckPermission = require('../../middleware/handlerCheckPermission');

/* GET users listing. */
router.get('/', handlerCheckPermission, async function (req, res) {
  try {
    const users = await UserModel.find();
    return res.json({ users });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST users create. */
router.post('/', handlerCheckPermission, async function (req, res) {
  try {
    const { username, password, firstName, lastName, role } = req.body;
    const hash = await bcryptjs.hash(password, 8);
    const UserClass = new UserModel({ username, password: hash, firstName, lastName, role });
    const user = await UserClass.save();

    return res.json({ code: 200, errorMess: '', data: { user } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* PUT users edit. */
router.put('/:_id', handlerCheckPermission, async (req, res) => {
  try {
    const _id = req.params._id
    const { username, password, firstName, lastName } = req.body;
    const payload = { username, firstName, lastName }

    if (password) {
      const hash = await bcryptjs.hash(password, 8);
      payload.password = hash
    }


    const userUpdate = await UserModel.updateOne({ _id: _id }, payload).then(() => {
      return UserModel.findById(_id);
    });
    return res.json({ code: 200, errorMess: '', data: { userUpdate } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

/* DELETE users delete. */
router.delete('/:_id', handlerCheckPermission, async (req, res) => {
  try {
    const _id = req.params._id;
    const user = await UserModel.findById(_id)
    if (user) {
      await UserModel.deleteOne({ _id: _id });
      return res.json({ code: 200, errorMess: '', data: true });
    }
    return res.json({ code: 400, errorMess: MESSAGES.USERNAME_NOT_EXISTED, data: false });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: false });
  }
})

export default router;
