"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import routes
const app_routes_1 = require("./routes/app.routes");
const app = express_1.default();
app.use(express_1.default.json());
// app routes
app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'hello  API' });
});
app.use('/api', app_routes_1.appRoutes);
// invalid route
app.use((req, res, next) => {
    const error = new Error('Route Not found');
    next(error);
});
// error response
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
        status: 'error',
    });
    next();
});
// application port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
exports.apiApp = app;
