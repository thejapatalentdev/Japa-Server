"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_details_schema = new mongoose_1.Schema({
    first_name: { type: String },
    last_name: { type: String },
    pass_word: { type: String },
    phone_number: { type: String },
    email: { type: String },
    rights: { type: String },
    gender: { type: String },
    registration_date: { type: String },
});
const Admin = (0, mongoose_1.model)("Admins", admin_details_schema);
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map