"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const japa_1 = __importDefault(require("./japa"));
const registration_1 = __importDefault(require("./registration"));
const users_1 = __importDefault(require("./users"));
const admin_1 = __importDefault(require("./admin"));
const router = express_1.default.Router();
exports.default = () => {
    (0, japa_1.default)(router);
    (0, registration_1.default)(router);
    (0, users_1.default)(router);
    (0, admin_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map