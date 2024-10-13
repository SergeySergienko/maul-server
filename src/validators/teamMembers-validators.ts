import {
  bodyIdRule,
  bodyNameRule,
  bodyPositionRule,
  bodySloganRule,
  bodyUserIdRule,
  limitRule,
  paramIdRule,
  sortRule,
  uploadFileRule,
} from '.';

export const teamMembersValidators = {
  'GET /api/team-members/': [limitRule, sortRule],
  'GET /api/team-members/:id': [paramIdRule],
  'POST /api/team-members/': [
    bodyUserIdRule,
    bodyNameRule,
    bodyPositionRule,
    uploadFileRule,
    bodySloganRule,
  ],
  'PUT /api/team-members/': [
    bodyIdRule,
    bodyNameRule,
    bodyPositionRule,
    bodySloganRule,
  ],
  'DELETE /api/team-members/:id': [paramIdRule],
};
