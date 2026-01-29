import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireRole } from '../../middleware/rbac';
import { createOpportunity, listOpportunities } from './opportunity.controller';

export const opportunityRouter = Router();

opportunityRouter.get('/', listOpportunities);

opportunityRouter.post('/', authenticate, requireRole('ALUMNI', 'FACULTY'), createOpportunity);
