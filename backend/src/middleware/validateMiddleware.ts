import { Request, Response, NextFunction } from 'express';

// stub — does nothing for now, add zod later!
export const validate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    }
}