import {
  bodyDateRule,
  bodyDescriptionRule,
  bodyIdRule,
  bodyLocationRule,
  bodyTitleRule,
  limitRule,
  paramIdRule,
  sortRule,
  teamPlaceRule,
  uploadFilesRule,
} from '.';

export const eventsValidators = {
  'GET /api/events/': [limitRule, sortRule],
  'GET /api/events/:id': [paramIdRule],
  'POST /api/events/': [
    bodyDateRule,
    bodyTitleRule,
    bodyDescriptionRule,
    bodyLocationRule,
    teamPlaceRule,
    uploadFilesRule,
  ],
  'PUT /api/events/': [
    bodyIdRule,
    bodyTitleRule,
    bodyDescriptionRule,
    bodyLocationRule,
    teamPlaceRule,
  ],
  'DELETE /api/events/:id': [paramIdRule],
};
