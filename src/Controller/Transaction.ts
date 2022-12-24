//json file date
import * as dataTransaction from '../data/Transaction.json';
import { flatten } from 'flat';
import { Request, Response } from 'express';
import { findParent, filterChildrenData } from '../helpers/arrayHelper'
export const getTransactions = (req: Request, res: Response) => {
    // return all records if there are no filter params

    return res.json({
        AllTransaction: dataTransaction
    })

}

export const getOneTransaction = (req: Request, res: Response) => {
    let transactionId = req.query.transactionId
    let confidenceLevel = req.query.confidenceLevel
    const allRecords: any = dataTransaction;
    if (req.query.flat) {
        return res.send(flatten(GetResponse(allRecords.default, transactionId, confidenceLevel)));
    }
    return res.send(GetResponse(allRecords.default, transactionId, confidenceLevel));
}

/**
 * construct response data
 * @param { array } Jsondata - transaction graphs
 * @param {any} transactionId - transactionId query params
 * @param {any} confidenceLevel - confidenceLevel query params
 */
function GetResponse(Jsondata: any[], transactionId: any, confidenceLevel: any) {


    const parentObject: any = findParent(Jsondata, transactionId);
    if (Boolean(parentObject && parentObject.children)) {
        parentObject.children = filterChildrenData(
            parentObject.children,
            parentObject,
            confidenceLevel,
        );
    }
    return parentObject;
}



