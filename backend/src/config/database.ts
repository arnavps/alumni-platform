import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
    connectionString: env.supabaseDbUrl,
    ssl: { rejectUnauthorized: false },
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
