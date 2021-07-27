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
    var condition = req.body.payload || {};
    var page = condition.page || 1;
    var limit = getLimit(condition);
    //  var sort = getSort(condition);

    var options = {
      page: page, limit: limit,
      populate: {
        path: 'category',
      },
    };

    const query = {}

    if (condition.keyword) {
      query.title = { $regex: new RegExp(condition.keyword), $options: 'i' }
    };

    if (condition.categoryId && condition.categoryId !== 'all') {
      query.category = condition.categoryId
    }

    const books = await BookModel.paginate(query, options);
    return res.json({ code: 200, message: "SUCCESS", books });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

router.post('/paging', handlerCheckPermission, async function (req, res) {
  try {
    var condition = req.body || {};
    var page = condition.page || 1;
    var limit = getLimit(condition);
    var sort = getSort(condition);

    var options = {
      page: page, limit: limit, sort: sort,
      populate: {
        path: 'category owner',
      },
    };

    const query = {}

    //search trong page home
    if (condition.keyword) {
      query.title = { $regex: new RegExp(condition.keyword), $options: 'i' }
    };

    //search title trong page admin
    if (condition.search) {
      query.$or = [
        { title: { $regex: condition.search, $options: 'i' } },
        { description: { $regex: condition.search, $options: 'i' } },
        { author: { $regex: condition.search, $options: 'i' } },
      ]
    };
    //filter category
    if (condition.categoryId && condition.categoryId !== 'all') {
      query.category = condition.categoryId
    }
    //
    if (req._user.role[0] === 'contributor') {
      query.owner = req._user._id
    }

    const books = await BookModel.paginate(query, options);
    return res.json({ code: 200, message: "SUCCESS", books });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});
/* POST books create. */
router.post("/", handlerCheckPermission, upload.array("cover", 4), async function (req, res) {
  try {
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
    const { title, description, author, category } = req.body;
    let data = {};
    if (category != '0') {
      data = {
        title,
        description,
        author,
        owner: req._user._id,
        cover: coverArr,
        category
      };
    } else {
      data = {
        title,
        description,
        author,
        owner: req._user._id,
        cover: coverArr
      };
    }
    const bookModel = new BookModel(data);
    const book = await bookModel.save();
    return res.json({ code: 200, message: "ADD BOOK SUCCESS", data: { book } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});
/* POST books find by id. */
router.post("/findById", handlerCheckPermission, async function (req, res) {
  try {
    debugger
    const bookId = req.body.bookId
    var options = {
      populate: {
        path: 'category owner',
      },
    };
    const book = await BookModel.find({ _id: bookId }).populate("category owner");
    return res.json({ code: 200, message: "FIND ONE BOOK SUCCESS", book });
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
    } else {
      bookModel.title = title
      bookModel.description = description
      bookModel.author = author
      bookModel.owner = req._user._id
    }
    if(category !== '0') {
      bookModel.category = category
    }
    const bookUpdate = await BookModel.updateOne({ _id: _id }, bookModel).then(
      () => {
        return BookModel.findById(_id);
      }
    );
    return res.json({ code: 200, message: "UPDATE SUCCESS", data: { bookUpdate } });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* DELETE books delete... */
router.post('/delete', handlerCheckPermission, async (req, res) => {
  try {
    const bookIds = req.body.bookIds
    //Tim xem danh sach book co ton tai hay ko
    const books = await BookModel.find(
      { _id: { $in: bookIds } }
    );
    // xóa ảnh tập thể
    for (let book of books) {
      book.cover.forEach(item => {
        fs.unlinkSync(item)
      });
    }

    if (books) {
      await BookModel.deleteMany({ _id: { $in: bookIds } });
      return res.json({ code: 200, message: "Delete Success" });
    }
    return res.json({ code: 400, errorMess: MESSAGES.USERNAME_NOT_EXISTED, data: false });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: false });
  }
})

export default router;
