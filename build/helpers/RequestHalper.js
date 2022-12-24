"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsetransactionId = (req, res, next) => {
    if (req && req.query && req.query.transactionId) {
        req.query.transactionId = req.query.transactionId;
        next();
    }
    else {
        res.status(400).json({ error: 'transactionId is required' });
    }
};
exports.parseconfidenceLevel = (req, res, next) => {
    if (req && req.query && req.query.confidenceLevel) {
        req.query.confidenceLevel = parseInt(req.query.confidenceLevel);
        next();
    }
    else {
        res.status(400).json({ error: 'confidenceLevel is required' });
    }
};
