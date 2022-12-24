import { Router } from 'express';
import { getOneTransaction, getTransactions } from '../Controller/Transaction'

import { parsetransactionId, parseconfidenceLevel } from '../helpers/RequestHalper'

const router = Router();

// Define routes


// Get All Transactions 
router.get('/alldata', getTransactions)

// Get All Transactions with query params
router.get('/transactions', parsetransactionId, parseconfidenceLevel, getOneTransaction);



export const appRoutes = router;
