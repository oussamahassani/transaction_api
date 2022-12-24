
// We are not using an ORM so we define our own logic to handle  data





/* Get parent transaction By Id */
/**
 * search for parent
 * @param { array } Jsondata - transaction graphs
 * @param { string } Id - transaction ID
 * @returns parent object with nested children if any {}
 */
export function findParent(Jsondata: any[], Id: string) {
    let result: any;
    function GetParent(records: any, id: string): boolean {
        return records.some((transaction: any) => {
            if (transaction.id === Id) {
                result = transaction;
                return true;
            } else if (transaction.children) {
                return GetParent(transaction.children, id);
            }
        });
    }

    const transFound = GetParent(Jsondata, Id);
    if (transFound) {
        // remove connection info property
        const { connectionInfo, ...newResult } = result;
        return newResult;
    }
    return {};
}

/**
* filter children based on  'confidenceLevel' from prant
* @param { Array } transactions - parent's children transations
* @param { any } parentTrans - parent transaction
* @param { number } confidenceLevel - confidence level
* @returns array of transactions
*/
export function filterChildrenData(transactions: any[], parentTrans: any, confidenceLevel: number) {
    transactions.forEach((transaction: any) => {
        if (transaction && transaction.children) {
            transaction.children = filterChildrenData(
                transaction.children,
                transaction,
                confidenceLevel,
            );
        }
    });
    return transactions
        .filter((trans: any) => +trans.connectionInfo.confidence >= +confidenceLevel)
        .map((child: any) => {
            // construct the new properties
            child.combinedConnectionInfo = {
                confidence:
                    ((parentTrans.connectionInfo && parentTrans.connectionInfo.confidence) || 1) *
                    child.connectionInfo.confidence,
                types: [],
            };

            if (parentTrans.combinedConnectionInfo) {
                child.combinedConnectionInfo.types = [
                    ...parentTrans.combinedConnectionInfo.types,
                    child.connectionInfo.type,
                ];
            } else {
                child.combinedConnectionInfo.types = [child.connectionInfo.type];
            }
            return child;
        });
}


