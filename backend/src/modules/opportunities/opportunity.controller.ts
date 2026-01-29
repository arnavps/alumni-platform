import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../../middleware/auth';
import { createOpportunityDb, listOpportunitiesDb } from './opportunity.service';

const createOpportunitySchema = z.object({
    type: z.enum(['JOB', 'INTERNSHIP', 'MENTORSHIP', 'EVENT']),
    title: z.string().min(1),
    company: z.string().optional(),
    location: z.string().optional(),
    remote: z.boolean().optional(),
    domain: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    applyUrl: z.string().url().optional(),
});

export const listOpportunities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, domain, company } = req.query;
        const opportunities = await listOpportunitiesDb({
            type: typeof type === 'string' ? type : undefined,
            domain: typeof domain === 'string' ? domain : undefined,
            company: typeof company === 'string' ? company : undefined,
        });
        res.json({ opportunities });
    } catch (err) {
        next(err);
    }
};

export const createOpportunity = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = createOpportunitySchema.parse(req.body);
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthenticated' });
        }

        const opportunity = await createOpportunityDb({
            ...data,
            createdBy: req.user.id,
        });

        res.status(201).json({ opportunity });
    } catch (err) {
        next(err);
    }
};
