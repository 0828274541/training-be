import express from 'express';

import usersRouter from './users';
import categoriesRouter from './categories';
import booksRouter from './books';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);
router.use('/books', booksRouter);

export default router;
