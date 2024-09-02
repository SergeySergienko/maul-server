import {
  bodyNameRule,
  bodyPositionRule,
  limitRule,
  paramIdRule,
  sortRule,
  uploadRule,
} from '.';

export const teamMembersValidators = {
  'GET /api/team-members/': [limitRule, sortRule],
  'GET /api/team-members/:id': [paramIdRule],
  'POST /api/team-members/': [bodyNameRule, bodyPositionRule, uploadRule],
};
