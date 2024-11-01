import { body, check, query, param } from 'express-validator';
import { ALLOWED_ROLES, POSITIONS, STATUSES } from '../constants';

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

export const bodyStatusRule = body('status')
  .isIn(STATUSES)
  .withMessage(`status must have one of the values: [${STATUSES}]`);

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

// team-member rules
export const bodyUserIdRule = body('userId')
  .isMongoId()
  .withMessage('userId must have mongoId format');

export const queryUserIdRule = query('userId')
  .isMongoId()
  .withMessage('userId must have mongoId format');

export const bodyNameRule = body('name')
  .trim()
  .notEmpty()
  .withMessage('name is required');

export const bodyPositionRule = body('position')
  .isIn(POSITIONS)
  .withMessage(`position must have one of the values: [${POSITIONS}]`);

export const uploadFileRule = check('upload').custom((value, { req }) => {
  if (!req.file) {
    throw new Error('file is required');
  }
  return true;
});

export const bodySloganRule = body('slogan')
  .trim()
  .notEmpty()
  .withMessage('slogan is required');

// event rules
export const bodyDateRule = body('date')
  .trim()
  .isDate()
  .withMessage('date must be in yyyy-mm-dd format');

export const bodyTitleRule = body('title')
  .trim()
  .isLength({ min: 3 })
  .withMessage('the title must contain min 3 characters');

export const bodyDescriptionRule = body('description')
  .trim()
  .isLength({ min: 20 })
  .withMessage('the description must contain min 20 characters');

export const bodyLocationRule = body('location')
  .trim()
  .isLength({ min: 3 })
  .withMessage('the location must contain min 3 characters');

export const uploadFilesRule = check('upload').custom((value, { req }) => {
  if (!req.files?.length) {
    throw new Error('files to upload are required');
  }
  return true;
});

export const teamPlaceRule = body('teamPlace').optional();
// .isNumeric()
// .isByteLength({ gt: 0 })
// .withMessage('the teamPlace must be a number more then 0');
