"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//json file date
const dataTransaction = __importStar(require("../data/Transaction.json"));
const flat_1 = require("flat");
const arrayHelper_1 = require("../helpers/arrayHelper");
exports.getTransactions = (req, res) => {
    // return all records if there are no filter params
    return res.json({
        AllTransaction: dataTransaction
    });
};
exports.getOneTransaction = (req, res) => {
    let transactionId = req.query.transactionId;
    let confidenceLevel = req.query.confidenceLevel;
    const allRecords = dataTransaction;
    if (req.query.flat) {
        return res.send(flat_1.flatten(GetResponse(allRecords.default, transactionId, confidenceLevel)));
    }
    return res.send(GetResponse(allRecords.default, transactionId, confidenceLevel));
};
/**
 * construct response data
 * @param { array } Jsondata - transaction graphs
 * @param {any} transactionId - transactionId query params
 * @param {any} confidenceLevel - confidenceLevel query params
 */
function GetResponse(Jsondata, transactionId, confidenceLevel) {
    const parentObject = arrayHelper_1.findParent(Jsondata, transactionId);
    if (Boolean(parentObject && parentObject.children)) {
        parentObject.children = arrayHelper_1.filterChildrenData(parentObject.children, parentObject, confidenceLevel);
    }
    return parentObject;
}
