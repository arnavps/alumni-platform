import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../../middleware/auth';
import { createOpportunityDb, listOpportunitiesDb, OpportunityFilters } from './opportunity.service';

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
        console.log("Received opportunities request with query:", req.query);
        const { type, domain, company } = req.query;
        const filters: OpportunityFilters = {};
        if (typeof type === 'string') filters.type = type;
        if (typeof domain === 'string') filters.domain = domain;
        if (typeof company === 'string') filters.company = company;

        const opportunities = await listOpportunitiesDb(filters);
        console.log("Returning", opportunities.length, "opportunities");
        res.json({ opportunities });
    } catch (err) {
        console.error("Error in listOpportunities:", err);
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
