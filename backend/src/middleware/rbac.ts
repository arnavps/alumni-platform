import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export const requireRole = (...roles: Array<'ADMIN' | 'FACULTY' | 'ALUMNI' | 'STUDENT'>) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

export const requireVerifiedAlumni = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'ALUMNI' || !req.user.isVerified) {
        return res.status(403).json({ error: 'Alumni verification required' });
    }
    next();
};
