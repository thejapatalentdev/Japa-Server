"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_reset_auth = exports.user_check = exports.admin_check = exports.check_user_auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../Config/config"));
const key = config_1.default.key;
const check_user_auth = async (req, res, next) => {
    const auth_user_token = req.header("Authorization");
    try {
        if (auth_user_token) {
            const user_token = auth_user_token.split(" ")[1];
            const analyse_token = jsonwebtoken_1.default.verify(user_token, key);
            const my_id = analyse_token["_id"];
            const exp = analyse_token["exp"];
            if (Date.now() >= exp * 1000) {
                return res.status(401).json({
                    message: "Token expired",
                });
            }
            else {
                res.locals.id = my_id;
                req.params.id = my_id;
                return next();
            }
        }
        else {
            return res.status(401).json({
                message: "you have to be logged in",
            });
        }
    }
    catch (ex) {
        return res.status(400).json({
            message: ex,
        });
    }
};
exports.check_user_auth = check_user_auth;
const admin_check = async (req, res, next) => {
    const auth_admin_token = req.header("Authorization");
    try {
        if (auth_admin_token) {
            const user_token = auth_admin_token.split(" ")[1];
            const analyse_token = jsonwebtoken_1.default.verify(user_token, key);
            const my_id = analyse_token["right"];
            const exp = analyse_token["exp"];
            if (Date.now() >= exp * 1000) {
                return res.status(401).json({
                    message: "Token expired",
                });
            }
            else {
                res.locals.role = my_id;
                req.params.role = my_id;
                // console.log(analyse_token);
                return next();
            }
        }
        else {
            return res.status(401).json({
                message: "You need to login",
            });
        }
    }
    catch (ex) {
        return res.status(400).json({
            message: ex,
        });
    }
};
exports.admin_check = admin_check;
const user_check = async (req, res, next) => {
    const auth_admin_token = req.header("Authorization");
    try {
        if (auth_admin_token) {
            const user_token = auth_admin_token.split(" ")[1];
            const analyse_token = jsonwebtoken_1.default.verify(user_token, key);
            const my_id = analyse_token["_id"];
            const exp = analyse_token["exp"];
            if (Date.now() >= exp * 1000) {
                return res.status(401).json({
                    message: "Token expired",
                });
            }
            else {
                res.locals.role = my_id;
                req.params.role = my_id;
                // console.log(analyse_token);
                return next();
            }
        }
        else {
            return res.status(401).json({
                message: "You need to login",
            });
        }
    }
    catch (ex) {
        return res.status(400).json({
            message: ex,
        });
    }
};
exports.user_check = user_check;
const check_reset_auth = async (req, res, next) => {
    const auth_user_token = req.header("Authorization");
    try {
        if (auth_user_token) {
            const user_token = auth_user_token.split(" ")[1];
            const analyse_token = jsonwebtoken_1.default.verify(user_token, key);
            const my_id = analyse_token["email"];
            const exp = analyse_token["exp"];
            if (Date.now() >= exp * 1000) {
                return res.status(401).json({
                    message: "Token expired",
                });
            }
            else {
                res.locals.email = my_id;
                req.params.email = my_id;
                return next();
            }
        }
        else {
            return res.status(401).json({
                message: "invalid auth",
            });
        }
    }
    catch (ex) {
        return res.status(400).json({
            message: ex,
        });
    }
};
exports.check_reset_auth = check_reset_auth;
//# sourceMappingURL=auth_checker.js.map