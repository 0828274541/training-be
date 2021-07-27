const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const { MESSAGES } = require('../../../constant/index');
const UserModel = require('../../../models/user.model.js');
const BookModel = require('../../../models/book.model');
const { getSort, getLimit } = require('../../../helper')
const handlerCheckPermission = require('../../middleware/handlerCheckPermission');

/* GET users listing. */
router.post('/paging', handlerCheckPermission, async function (req, res) {
  try {
    var condition = req.body || {};
    var page = condition.page || 1;
    var limit = getLimit(condition);
    var sort = getSort(condition);

    var options = {
      page: page, limit: limit, sort: sort
    };
    const query = {}
    if (condition.search) {
      query.$or = [
        { username: { $regex: condition.search, $options: 'i' } },
        { firstName: { $regex: condition.search, $options: 'i' } },
        { lastName: { $regex: condition.search, $options: 'i' } },
      ]
    };
    const users = await UserModel.paginate(query, options);
    return res.json({ code: 200, message: "SUCCESS", users });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST users create. */
router.post('/', handlerCheckPermission, async function (req, res) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user === null) {
      const { username, password, firstName, lastName, roleCreate } = req.body;
      const hash = await bcryptjs.hash(password, 8);
      const role = []
      role.push(roleCreate)
      const User = new UserModel({ username, password: hash, firstName, lastName, role });
      const userCreate = await User.save();
      return res.json({ code: 200, message: "Create Success", data: { userCreate } });
    } else {
      return res.json({ code: 400, message: MESSAGES.USERNAME_EXISTED, data: null })
    }
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
});

/* PUT users edit. */
router.put('/:_id', handlerCheckPermission, async (req, res) => {
  try {
    const { username, password, firstName, lastName, roleUpdate } = req.body;
    const _id = req.params._id;
    const role = []
    role.push(roleUpdate)
    const payload = { username, firstName, lastName, role }

    if (password.trim()) {
      const hash = await bcryptjs.hash(password, 8);
      payload.password = hash
    }

    const userUpdate = await UserModel.updateOne({ _id: _id }, payload).then(() => {
      return UserModel.findById(_id);
    });
    return res.json({ code: 200, message: 'Update Success', data: { userUpdate } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

/* DELETE users delete. */
router.post('/delete', handlerCheckPermission, async (req, res) => {
  try {
    const userIds = req.body.userIds
    //Tim xem user co ton tai hay ko
    const users = await BookModel.find(
      { _id: { $in: userIds } }
    );
    if (users) {
      //Tim tat ca cac loai sach duoc tao boi cac user
      // const books = await BookModel.find(
      //   { owner: { $in: userIds } }
      // );

      //  Update user = null theo tung book
      // for (let i = 0; i < books.length; i++) {
      //   const rs = await BookModel.update({ _id: books[i] }, { owner: null })
      // }

      // Thong hop 2 cach tren
      await BookModel.updateMany({ owner: { $in: userIds } }, { owner: null })

      //Delete danh sach users sau khi da set null cho nhung book co owner  bi delelte
      await UserModel.deleteMany({ _id: { $in: userIds } });

      return res.json({ code: 200, message: "Delete Success" });
    }
    return res.json({ code: 400, errorMess: MESSAGES.USERNAME_NOT_EXISTED, data: false });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: false });
  }
})

/* GET users edit. */
router.get('/:_id', handlerCheckPermission, async (req, res) => {
  try {
    const _id = req.params._id || {};
    const users = await UserModel.findById(_id);
    return res.json({ code: 200, message: "SUCCESS", users });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

export default router;
