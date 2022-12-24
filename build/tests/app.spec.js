"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
// import * as api from '../routes/app-routes';
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
describe('App Works', () => {
    it('takes user to the route of the API', (done) => {
        chai_1.default.request(app_1.apiApp)
            .get('/')
            .end((err, res) => {
            chai_1.expect(res).to.have.status(200);
            chai_1.expect(res.body.status).to.equals('success');
            done();
        });
    });
});
describe('GET request to the API', () => {
    it('should return all transaction with no params', (done) => {
        chai_1.default.request(app_1.apiApp)
            .get('/api/transactions')
            .end((err, res) => {
            chai_1.expect(res.text).not.to.equal({});
            done();
        });
    });
    it('should return all transaction with params', (done) => {
        chai_1.default.request(app_1.apiApp)
            .get('/api/transactions?transactionId=5c868b227167edc396fc3754&confidenceLevel=0.3')
            .end((err, res) => {
            chai_1.expect(res.body).not.to.equal({});
            done();
        });
    });
});
