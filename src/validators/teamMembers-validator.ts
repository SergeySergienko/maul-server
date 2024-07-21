import { body, check, query, param } from 'express-validator';

export const validators = {
  'GET /api/team-members/': [
    query('limit')
      .optional()
      .default(1_000_000_000)
      .isNumeric()
      .withMessage('limit must be a number'),
    query('sort')
      .optional()
      .default('asc')
      .isIn(['asc', 'desc'])
      .withMessage('sort must be asc or desc'),
  ],
  'GET /api/team-members/:id': [
    param('id').isMongoId().withMessage('id must have mongoId format'),
  ],
  'POST /api/team-members/': [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('position').trim().notEmpty().withMessage('position is required'),
    check('upload').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('file is required');
      }
      return true;
    }),
  ],
};
