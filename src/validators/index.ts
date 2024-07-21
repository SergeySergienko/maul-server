import { Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { UniversalRequest, PostTeamMemberDto, GetQueryDto } from '../types';
export * from './teamMembers-validator';

const validateRequest =
  (validators: { [key: string]: ValidationChain[] }) =>
  async (
    req: UniversalRequest<{}, PostTeamMemberDto, GetQueryDto>,
    res: Response,
    next: NextFunction
  ) => {
    const methodUrl = `${req.method} ${req.baseUrl}${req.route.path}`;
    const rules = validators[methodUrl];

    if (!rules) {
      return next(); // No validation rules for this route
    }

    for (const validation of rules) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };

export default validateRequest;
