import {
  bodyIdRule,
  bodyNameRule,
  bodyPositionRule,
  bodySloganRule,
  bodyStatusRule,
  bodyUserIdRule,
  limitRule,
  paramIdRule,
  queryUserIdRule,
  sortRule,
  uploadFileRule,
} from '.';

export const teamMembersValidators = {
  'GET /api/team-members/': [limitRule, sortRule],
  'GET /api/team-members/:id': [paramIdRule],
  'GET /api/team-members/search': [queryUserIdRule],
  'PATCH /api/team-members/:id': [bodyIdRule, bodyStatusRule],
  'POST /api/team-members/': [
    bodyUserIdRule,
    bodyNameRule,
    bodyPositionRule,
    uploadFileRule,
    bodySloganRule,
  ],
  'PUT /api/team-members/': [bodyIdRule],
  'DELETE /api/team-members/:id': [paramIdRule],
};
