"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registration_val_1 = require("../middlewares/validation/registration_val");
const registrations_1 = require("../Controllers/registrations");
const auth_checker_1 = require("../middlewares/auth_checker");
exports.default = (router) => {
    router.post("/registration/createaccount", registration_val_1.validate_user_details, registration_val_1.handle_validation_errors, registrations_1.register_user);
    router.post("/registration/requestforotp", registration_val_1.validate_mail, registration_val_1.handle_validation_errors, registrations_1.create_otp_for_password_reset);
    router.post("/registration/verifyotp", registration_val_1.validate_otp, registration_val_1.handle_validation_errors, registrations_1.verify_otp);
    router.put("/registration/setnewpass", registration_val_1.validate_pass, registration_val_1.handle_validation_errors, auth_checker_1.check_reset_auth, registrations_1.set_new_pass);
    router.post("/registration/createadmin", registration_val_1.validate_admin, registration_val_1.handle_validation_errors, registrations_1.create_admin);
};
//# sourceMappingURL=registration.js.map