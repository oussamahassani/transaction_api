"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Transaction_1 = require("../Controller/Transaction");
const RequestHalper_1 = require("../helpers/RequestHalper");
const router = express_1.Router();
// Define routes
// Get All Transactions 
router.get('/alldata', Transaction_1.getTransactions);
// Get All Transactions with query params
router.get('/transactions', RequestHalper_1.parsetransactionId, RequestHalper_1.parseconfidenceLevel, Transaction_1.getOneTransaction);
exports.appRoutes = router;
