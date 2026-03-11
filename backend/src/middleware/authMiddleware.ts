import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../../shared/types';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // JtwPayload in interface let you choose what s gonna be hold by .user ! Modify if needed
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        (req as any).user = decoded;
        next(); // ← "all good, continue to controller!"
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};