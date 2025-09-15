"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./Routers/index"));
const connection_1 = require("./Config/connection");
const config_1 = __importDefault(require("./Config/config"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// import rateLimit from "express-rate-limit";
const app = (0, express_1.default)();
(0, connection_1.connect_now)(config_1.default.conn);
// Middleware
app.use(express_1.default.json());
app.disable("x-powered-by");
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, express_mongo_sanitize_1.default)());
// Apply your routes
app.use("/japa/v1", (0, index_1.default)());
// Start the server
const port = config_1.default.port || 2500;
app.listen(port, () => console.log("The application is running on port", port));
//# sourceMappingURL=index.js.map