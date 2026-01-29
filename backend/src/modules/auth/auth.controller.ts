import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { createUserWithRole, findUserByEmail, verifyUserPassword } from './auth.service';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: z.enum(['ADMIN', 'FACULTY', 'ALUMNI', 'STUDENT']),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = registerSchema.parse(req.body);
        const existing = await findUserByEmail(data.email);
        if (existing) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const user = await createUserWithRole(data);

        return res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = loginSchema.parse(req.body);
        const user = await findUserByEmail(data.email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const valid = await verifyUserPassword(user, data.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const payload = { id: user.id, role: user.role, isVerified: user.is_verified } as const;

        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                path: '/auth',
            })
            .json({ accessToken, user: { id: user.id, email: user.email, role: user.role, isVerified: user.is_verified } });
    } catch (err) {
        next(err);
    }
};
