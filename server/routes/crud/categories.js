const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const { MESSAGES } = require('../../../constant');
const CategoryModel = require('../../../models/category.model');
const BookModel = require('../../../models/book.model');
const { getSort, getLimit } = require('../../../helper')
const handlerCheckPermission = require('../../middleware/handlerCheckPermission');

/* GET categories listing. */
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

    const categories = await CategoryModel.paginate(query, options);
    return res.json({ code: 200, categories });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST categories create. */
router.post('/', handlerCheckPermission, async function (req, res) {
  try {
    const { title } = req.body.payload;
    const categoryModel = new CategoryModel({ title });
    const category = await categoryModel.save();

    return res.json({ code: 200, message: 'Add Success', data: { category } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* PUT categories edit. */
router.put('/', handlerCheckPermission, async (req, res) => {
  try {
    const { title, _id } = req.body.payload;
    const categoryUpdate = await CategoryModel.updateOne({ _id: _id }, { title })
    return res.json({ code: 200, message: 'Update Success' });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
})

/* DELETE categories delete. */
router.post('/delete', handlerCheckPermission, async (req, res) => {
  try {

    const categoryIds = req.body.categoryIds
    //Tim tat ca cac loai sach theo danh sach category
    // const books = await BookModel.find(
    //   { category: { $in: categoryIds } }
    // );

    // Update category theo tung book
    // for (let i = 0; i < books.length; i++) {
    //   const rs = await BookModel.update({ _id: books[i] }, { category: null })
    // }

    // Thong hop 2 cach tren
    await BookModel.updateMany({ category: { $in: categoryIds } }, { category: null })

    //Delete danh sach cac category sau khi da set null cho nhung book co category bi delelte
    await CategoryModel.deleteMany({ _id: { $in: categoryIds } });

    return res.json({ code: 200, message: "Delete Success" });
    // const category = await CategoryModel.findById(_id)
    // if (category) {
    //   await CategoryModel.deleteOne({ _id: _id });
    //   return res.json({ code: 200, errorMess: '', data: true });
    // }
    // return res.json({ code: 400, errorMess: MESSAGES.USERNAME_NOT_EXISTED, data: false });

  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: false });
  }
})

export default router;
