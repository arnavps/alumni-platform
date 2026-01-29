import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
    'SUPABASE_DB_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'MAX_REFERRAL_REQUESTS_PER_MONTH',
    'MAX_MENTORSHIP_REQUESTS_PER_MONTH',
    'RATE_LIMIT_WINDOW_SECONDS',
    'RATE_LIMIT_MAX_REQUESTS',
] as const;

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export const env = {
    supabaseDbUrl: process.env.SUPABASE_DB_URL as string,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
    maxReferralRequestsPerMonth: Number(process.env.MAX_REFERRAL_REQUESTS_PER_MONTH),
    maxMentorshipRequestsPerMonth: Number(process.env.MAX_MENTORSHIP_REQUESTS_PER_MONTH),
    rateLimitWindowSeconds: Number(process.env.RATE_LIMIT_WINDOW_SECONDS),
    rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
};
