const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
 return [
  body('email').isEmail().withMessage('bukan email'),
  body('phone_number').isMobilePhone().withMessage('bukan phone number'),
  body('password').isLength({ min: 5 }).withMessage('password kurang dari 5')
 ];
};

const validate = (req, res, next) => {
 const errors = validationResult(req);
 if (errors.isEmpty()) {
  return next();
 }
 const extractedErrors = [];
 errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

 return res.status(422).json({
  errors: extractedErrors
 });
};

module.exports = { validate, userValidationRules };
