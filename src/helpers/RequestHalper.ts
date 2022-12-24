import { NextFunction, Request, Response } from 'express';
export const parsetransactionId = (req: Request, res: Response, next: NextFunction) => {
    if (req && req.query && req.query.transactionId) {
        req.query.transactionId = req.query.transactionId
        next()
    }


    else {
        res.status(400).json({ error: 'transactionId is required' })
    }
}
export const parseconfidenceLevel = (req: Request, res: Response, next: NextFunction) => {
    if (req && req.query && req.query.confidenceLevel) {
        req.query.confidenceLevel = parseInt(req.query.confidenceLevel)
        next()
    }
    else {
        res.status(400).json({ error: 'confidenceLevel is required' })
    }

}
