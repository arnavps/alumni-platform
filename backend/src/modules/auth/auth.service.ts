import { query } from '../../config/database';
import { hashPassword, comparePassword } from '../../utils/password';

export type Role = 'ADMIN' | 'FACULTY' | 'ALUMNI' | 'STUDENT';

export type UserRow = {
    id: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    role: Role;
    is_verified: boolean;
};

export const findUserByEmail = async (email: string): Promise<UserRow | null> => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
};

export const createUserWithRole = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
}) => {
    const passwordHash = await hashPassword(data.password);
    const isVerifiedDefault = data.role === 'ALUMNI' ? false : true;

    const result = await query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, email, role, is_verified`,
        [data.email, passwordHash, data.firstName, data.lastName, data.role, isVerifiedDefault],
    );

    if (data.role === 'ALUMNI') {
        await query(
            `INSERT INTO alumni_verification_requests (user_id, status, submitted_at)
       VALUES ($1, 'PENDING', NOW())`,
            [result.rows[0].id],
        );
    }

    return result.rows[0] as { id: string; email: string; role: Role; is_verified: boolean };
};

export const verifyUserPassword = async (user: UserRow, password: string): Promise<boolean> => {
    return comparePassword(password, user.password_hash);
};
