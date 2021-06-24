import express from 'express';

import usersRouter from './users';
import categoriesRouter from './categories';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);

export default router;
