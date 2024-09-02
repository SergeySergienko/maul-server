import { body, check, query, param } from 'express-validator';
import { ALLOWED_ROLES } from '../constants';

export const limitRule = query('limit')
  .optional()
  .default(1_000_000_000)
  .isNumeric()
  .withMessage('limit must be a number');

export const sortRule = query('sort')
  .optional()
  .default('asc')
  .isIn(['asc', 'desc'])
  .withMessage('sort must be asc or desc');

export const paramIdRule = param('id')
  .isMongoId()
  .withMessage('id must have mongoId format');

export const bodyIdRule = body('id')
  .isMongoId()
  .withMessage('id must have mongoId format');

export const bodyRoleRule = body('role')
  .isIn(ALLOWED_ROLES)
  .withMessage(`role must have one of the values: [${ALLOWED_ROLES}]`);

export const bodyEmailRule = body(
  'email',
  'email must have email format'
).isEmail();

export const bodyPasswordRule = body(
  'password',
  'the password must contain from 4 to 10 characters'
)
  .trim()
  .isLength({ min: 4, max: 10 });

export const bodyNameRule = body('name')
  .trim()
  .notEmpty()
  .withMessage('name is required');

export const bodyPositionRule = body('position')
  .trim()
  .notEmpty()
  .withMessage('position is required');

export const uploadRule = check('upload').custom((value, { req }) => {
  if (!req.file) {
    throw new Error('file is required');
  }
  return true;
});
