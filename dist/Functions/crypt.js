"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDigitOTP = exports.hash_pass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../Config/config"));
const hash_pass = async (pass) => {
    const key = Number(config_1.default.salt);
    const salt_now = await bcrypt_1.default.genSalt(key);
    const hased = await bcrypt_1.default.hash(pass, salt_now);
    return hased;
};
exports.hash_pass = hash_pass;
//OTP
const generateDigitOTP = (length) => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    return otp;
};
exports.generateDigitOTP = generateDigitOTP;
//# sourceMappingURL=crypt.js.map