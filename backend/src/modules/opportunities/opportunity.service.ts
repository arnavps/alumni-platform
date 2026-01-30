import { query } from '../../config/database';

export type OpportunityFilters = {
    type?: string;
    domain?: string;
    company?: string;
};

export const listOpportunitiesDb = async (filters: OpportunityFilters) => {
    const conditions: string[] = ['is_active = TRUE'];
    const params: any[] = [];

    if (filters.type) {
        params.push(filters.type);
        conditions.push(`type = $${params.length}`);
    }
    if (filters.domain) {
        params.push(filters.domain);
        conditions.push(`domain = $${params.length}`);
    }
    if (filters.company) {
        params.push(filters.company);
        conditions.push(`company ILIKE '%' || $${params.length} || '%'`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const result = await query(
        `SELECT id, title, company, domain, type, location, remote, is_active, created_at
     FROM opportunities
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT 50`,
        params,
    );

    return result.rows;
};

export const createOpportunityDb = async (data: {
    createdBy: string;
    type: 'JOB' | 'INTERNSHIP' | 'MENTORSHIP' | 'EVENT';
    title: string;
    company?: string | undefined;
    location?: string | undefined;
    remote?: boolean | undefined;
    domain?: string | undefined;
    role?: string | undefined;
    description?: string | undefined;
    applyUrl?: string | undefined;
}) => {
    const result = await query(
        `INSERT INTO opportunities (created_by, type, title, company, location, remote, domain, role, description, apply_url)
     VALUES ($1, $2, $3, $4, $5, COALESCE($6, FALSE), $7, $8, $9, $10)
     RETURNING id, title, type, company, domain, location, remote, created_at`,
        [
            data.createdBy,
            data.type,
            data.title,
            data.company ?? null,
            data.location ?? null,
            data.remote ?? false,
            data.domain ?? null,
            data.role ?? null,
            data.description ?? null,
            data.applyUrl ?? null,
        ],
    );

    return result.rows[0];
};
