"use strict";
// We are not using an ORM so we define our own logic to handle  data
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Get parent transaction By Id */
/**
 * search for parent
 * @param { array } Jsondata - transaction graphs
 * @param { string } Id - transaction ID
 * @returns parent object with nested children if any {}
 */
function findParent(Jsondata, Id) {
    let result;
    function GetParent(records, id) {
        return records.some((transaction) => {
            if (transaction.id === Id) {
                result = transaction;
                return true;
            }
            else if (transaction.children) {
                return GetParent(transaction.children, id);
            }
        });
    }
    const transFound = GetParent(Jsondata, Id);
    if (transFound) {
        // remove connection info property
        const { connectionInfo } = result, newResult = __rest(result, ["connectionInfo"]);
        return newResult;
    }
    return {};
}
exports.findParent = findParent;
/**
* filter children based on  'confidenceLevel' from prant
* @param { Array } transactions - parent's children transations
* @param { any } parentTrans - parent transaction
* @param { number } confidenceLevel - confidence level
* @returns array of transactions
*/
function filterChildrenData(transactions, parentTrans, confidenceLevel) {
    transactions.forEach((transaction) => {
        if (transaction && transaction.children) {
            transaction.children = filterChildrenData(transaction.children, transaction, confidenceLevel);
        }
    });
    return transactions
        .filter((trans) => +trans.connectionInfo.confidence >= +confidenceLevel)
        .map((child) => {
        // construct the new properties
        child.combinedConnectionInfo = {
            confidence: ((parentTrans.connectionInfo && parentTrans.connectionInfo.confidence) || 1) *
                child.connectionInfo.confidence,
            types: [],
        };
        if (parentTrans.combinedConnectionInfo) {
            child.combinedConnectionInfo.types = [
                ...parentTrans.combinedConnectionInfo.types,
                child.connectionInfo.type,
            ];
        }
        else {
            child.combinedConnectionInfo.types = [child.connectionInfo.type];
        }
        return child;
    });
}
exports.filterChildrenData = filterChildrenData;
