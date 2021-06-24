import { ValidationError } from 'express-validation';

function handleValidateError(err, req, res, next) {
  if(err && err instanceof ValidationError) {
    const { details } = err;
    const dataErrorMessages = Object.values(details);
    let message = dataErrorMessages[0][0].message;
    message = message.replace(/\"/g, '');

    return res.status(422).jsonp({
      ok: false,
      errors: [message]
    });
  }
  
  next(err);
}

function handleNotFoundError(req, res) {
  console.log('404', req.url);
  global.logger.info('HandleNotFound', 'API not found');

  return res.status(404).jsonp({
    ok: false,
    errors: ['API not found!']
  });
}

export {
  handleValidateError,
  handleNotFoundError
};
