"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_admin = exports.set_new_pass = exports.verify_otp = exports.create_otp_for_password_reset = exports.register_user = void 0;
const async_runner_1 = require("../middlewares/async_runner");
const express_validator_1 = require("express-validator");
const user_1 = require("../Models/user");
const crypt_1 = require("../Functions/crypt");
const randomtext_1 = require("../Functions/randomtext");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../Config/config"));
const mailer_1 = require("../Functions/mailer");
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../Models/admin");
const key = config_1.default.key;
const delete_existing_otp = async (email) => user_1.Otp.findOneAndDelete({ email });
exports.register_user = (0, async_runner_1.async_runner)(async (req, res) => {
    const { first_name, last_name, pass_word, bio, country, email, gender, phone_number, profile_image_url, academic_details, auth_o_id, job_status, additional_certification, } = (0, express_validator_1.matchedData)(req);
    const existing_user = await user_1.Users.findOne({ email });
    if (existing_user) {
        return res.json({
            message: "Email already taken",
        });
    }
    const encrypted = await (0, crypt_1.hash_pass)(pass_word);
    const new_user = new user_1.Users({
        first_name,
        last_name,
        pass_word: encrypted,
        bio,
        country,
        email,
        gender,
        phone_number,
        profile_image_url,
        academic_details,
        auth_o_id,
        job_status,
        additional_certification,
        registration_date: Date.now(),
    });
    const save_details = await new_user.save();
    await (0, mailer_1.welcome_email)(email, first_name);
    return res.json({
        message: save_details ? "Account created" : "Please check your network",
    });
});
exports.create_otp_for_password_reset = (0, async_runner_1.async_runner)(async (req, res) => {
    const { email } = (0, express_validator_1.matchedData)(req);
    delete_existing_otp(email);
    const check_account = await user_1.Users.findOne({ email: email });
    if (check_account) {
        const code = (0, crypt_1.generateDigitOTP)(6);
        const set_otp = new user_1.Otp({
            otp: code,
            email: email,
        });
        const save_code = await set_otp.save();
        //Add otp email here...
        await (0, mailer_1.reset_otp)(email, code);
        return res.json({
            message: save_code ? `Please check your mail for OTP` : "please retry",
        });
    }
    return res.json({
        message: "invalid details",
    });
});
exports.verify_otp = (0, async_runner_1.async_runner)(async (req, res) => {
    const { otp, email } = (0, express_validator_1.matchedData)(req);
    const confirm_check = await user_1.Otp.findOne({ otp });
    if (confirm_check && confirm_check.email === email) {
        const combined = (0, randomtext_1.generateRandomParagraph)();
        const reset_token = jsonwebtoken_1.default.sign({
            email,
            text: combined,
            otp,
        }, key, { expiresIn: "10days" });
        return res.json({
            message: `reset_token ${reset_token}`,
        });
    }
    return res.json({
        message: "invalid details",
    });
});
exports.set_new_pass = (0, async_runner_1.async_runner)(async (req, res) => {
    const { new_pass } = (0, express_validator_1.matchedData)(req);
    const email = req.params.email;
    const salt = await bcrypt_1.default.genSalt(10);
    const hashed = await bcrypt_1.default.hash(new_pass, salt);
    const update_user_pass = await user_1.Users.updateOne({ email: email }, { $set: { pass_word: hashed } }, { new: true });
    return res.json({
        message: update_user_pass
            ? "Password updated"
            : "please retry after some mins",
    });
});
//Register admin.........
exports.create_admin = (0, async_runner_1.async_runner)(async (req, res) => {
    const { first_name, last_name, pass_word, email, gender, phone_number, profile_image_url, rights, } = (0, express_validator_1.matchedData)(req);
    const existing_user = await admin_1.Admin.findOne({
        $or: [{ email }, { phone_number: phone_number }],
    });
    if (existing_user) {
        return res.json({
            message: "Email and Phone number already taken",
        });
    }
    const encrypted = await (0, crypt_1.hash_pass)(pass_word);
    const new_user = new admin_1.Admin({
        first_name,
        last_name,
        pass_word: encrypted,
        email,
        gender,
        phone_number,
        profile_image_url,
        rights: "super_admin",
        registration_date: Date.now(),
    });
    const save_details = await new_user.save();
    // await welcome_email(email);
    return res.json({
        message: save_details ? "Account created" : "Please check your network",
    });
});
//# sourceMappingURL=registrations.js.map