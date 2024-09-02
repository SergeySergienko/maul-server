import {
  bodyEmailRule,
  bodyIdRule,
  bodyPasswordRule,
  bodyRoleRule,
  limitRule,
  paramIdRule,
  sortRule,
} from '.';

export const usersValidators = {
  'GET /api/users/': [limitRule, sortRule],
  'POST /api/users/': [bodyEmailRule, bodyPasswordRule],
  'PUT /api/users/': [bodyIdRule, bodyRoleRule],
  'DELETE /api/users/:id': [paramIdRule],
};
