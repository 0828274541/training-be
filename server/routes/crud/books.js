const express = require('express');
const router = express.Router();

const { MESSAGES } = require('../../../constant');
const BookModel = require('../../../models/book.model');
const { getSort, getLimit } = require('../../../helper')
const handlerCheckPermission = require('../../middleware/handlerCheckPermission');

/* GET books listing. */
router.get('/', handlerCheckPermission, async function (req, res) {
  try {
    var condition = req.body.condition || {};
    var page = condition.page || 1;
    var limit = getLimit(condition);
    var sort = getSort(condition);

    var options = {
      page: page, limit: limit, sort: sort
    };

    const query = {}
    if (condition.keyword) {
      query.title = new RegExp(condition.keyword)
    }

    const books = await CategoryModel.paginate(query, options);
    return res.json({ books });

    // const totalDocs = await CategoryModel.countDocuments();
    // const books = await CategoryModel.find().sort(sort).skip((page - 1) * limit).limit(limit).exec();
    // return res.json({ data: books, totalDocs, page, limit });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST books create. */
router.post('/', handlerCheckPermission, async function (req, res) {
  try {
    const { title } = req.body;
    const bookModel = new BookModel({ title });
    const book = await bookModel.save();

    return res.json({ code: 200, errorMess: '', data: { book } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* PUT books edit. */
router.put('/:_id', handlerCheckPermission, async (req, res) => {
  try {
    const _id = req.params._id
    const { title } = req.body;

    const bookUpdate = await BookModel.updateOne({ _id: _id }, { title }).then(() => {
      return BookModel.findById(_id);
    });
    return res.json({ code: 200, errorMess: '', data: { bookUpdate } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

/* DELETE books delete. */
router.delete('/:_id', handlerCheckPermission, async (req, res) => {
  try {
    const _id = req.params._id;
    const book = await BookUpdate.findById(_id)
    if (book) {
      await BookUpdate.deleteOne({ _id: _id });
      return res.json({ code: 200, errorMess: '', data: true });
    }
    return res.json({ code: 400, errorMess: MESSAGES.USERNAME_NOT_EXISTED, data: false });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: false });
  }
})

export default router;
