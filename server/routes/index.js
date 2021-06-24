import express from 'express';

import loginRouter from './login';
import crudRouter from './crud';
import handlerVerifyUser from '../middleware/auth';

const router = express.Router();

router.use('/auth', loginRouter);
router.use('/', handlerVerifyUser, crudRouter);

export default router;
//abcd
