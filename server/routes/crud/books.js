const express = require('express');
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const mongoose = require('mongoose');

const { MESSAGES, COVER_PATH } = require('../../../constant');
const BookModel = require('../../../models/book.model');
const { getSort, getLimit } = require('../../../helper')
const handlerCheckPermission = require('../../middleware/handlerCheckPermission');

const upload = multer({ dest: COVER_PATH })
/* GET books listing. */
router.post('/search', handlerCheckPermission, async function (req, res) {
  try {
    debugger
    var condition = req.body.payload || {};
    var page = condition.page || 1;
    var limit = getLimit(condition);
    //  var sort = getSort(condition);

    //var categories = ({ path: 'category', match: { _id: mongoose.Types.ObjectId(req.body.condition.category) } });
    var options = {
      page: page, limit: limit,
      populate: [{
        path: 'category',
      }],
    };



    const query = {}
    if (condition.categoryId && condition.categoryId !== 'all') {
      query.category = condition.categoryId
    }

    const books = await BookModel.paginate(query, options);
    return res.json({ code: 200, books });

    // const totalDocs = await CategoryModel.countDocuments();
    // const books = await CategoryModel.find().sort(sort).skip((page - 1) * limit).limit(limit).exec();
    // return res.json({ data: books, totalDocs, page, limit });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST books create. */
router.post("/", handlerCheckPermission, upload.array("cover", 4), async function (req, res) {
  try {
    // if (!req.files) {
    //   return res.json({ code: 400, errorMess: err, data: null });
    // }
    const coverArr = []
    req.files.forEach(item => {
      let filePath = `${COVER_PATH}/${new Date().getTime()}_${item.originalname}`;
      fs.rename(`${COVER_PATH}/${item.filename}`, filePath, async (err) => {
        if (err) {
          return res.json({ code: 400, errorMess: err, data: null });
        }
      }
      );
      coverArr.push(filePath);
    });
    const { title, description, author, owner, category } = req.body;
    const bookModel = new BookModel({
      title,
      description,
      author,
      owner: req._user._id,
      cover: coverArr,
      category,
    });
    const book = await bookModel.save();
    return res.json({ code: 200, errorMess: "", data: { book } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* PUT books edit. */
router.put("/:_id", handlerCheckPermission, upload.array("cover", 4), async (req, res) => {
  try {
    const _id = req.params._id;
    const { title, description, author, category } = req.body;
    const book = await BookModel.findById(_id);
    const coverArr = []
    let bookModel = {};
    // kiem tra xem co file truyen len server hay ko
    // neu co thi update
    // neu ko co thi dung lai file cu
    debugger
    if (req.files.length != 0) {
      book.cover.forEach(item => {
        fs.unlinkSync(item)
      });
      req.files.forEach(item => {
        let filePath = `${COVER_PATH}/${new Date().getTime()}_${item.originalname}`;
        fs.rename(`${COVER_PATH}/${item.filename}`, filePath, async (err) => {
          if (err) {
            return res.json({ code: 400, errorMess: err, data: null });
          }
        }
        );
        coverArr.push(filePath);
      });
      bookModel.title = title
      bookModel.description = description
      bookModel.author = author
      bookModel.owner = req._user._id
      bookModel.cover = coverArr
      bookModel.category = category

    } else {
      bookModel.title = title
      bookModel.description = description
      bookModel.author = author
      bookModel.owner = req._user._id
      bookModel.category = category
    }
    const bookUpdate = await BookModel.updateOne({ _id: _id }, bookModel).then(
      () => {
        return BookModel.findById(_id);
      }
    );
    return res.json({ code: 200, errorMess: "", data: { bookUpdate } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* DELETE books delete... */
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
