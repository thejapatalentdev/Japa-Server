"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.async_runner = void 0;
//log error here............
const async_runner = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    };
};
exports.async_runner = async_runner;
//# sourceMappingURL=async_runner.js.map